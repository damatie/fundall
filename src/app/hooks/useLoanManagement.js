import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import * as Actions from 'app/main/loanApp/store/actions';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import swal from 'sweetalert2';

const useLoanManagement = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showBtn, setShowBtn] = useState(true);
  const [open, setOpen] = useState(false);
  const [endpoint, setEnpoint] = useState('');
  const [rejectEndpoint, setRejectEndpoint] = useState('');

  // redux state
  const profile = useSelector(({ profile }) => profile.data);
  const loan = useSelector(({ loan }) => loan.loan.data);

  const role = profile.role.name;

  const { id } = useParams();

  console.log(role, loan.data.loanData.status.toLowerCase())
  useEffect(() => {
    switch (loan.data.loanData.status.toLowerCase()) {
      case 'pending': {
        setEnpoint('/loan/approve/hr/');
        setRejectEndpoint('/loan/reject/hr/');
        break;
      }
      case 'reviewed': {
        setEnpoint('/loan/approve/finance/');
        setRejectEndpoint('/loan/reject/finance/');
        break;
      }

      // case 'approved': {
      //   setEnpoint('/loan/approve/support/');
      //   setRejectEndpoint('/loan/reject/support/');
      //   break;
      // }

      default: {
        break;
      }
    }
  }, [loan]);

  useEffect(() => {
    const ruleOne = role === 'Hr Manager' && loan.data.loanData.status.toLowerCase() === 'reviewed';
    const ruleTwo = loan.data.loanData.status.toLowerCase() === 'approved';
    const ruleThree = ((role === 'Finance Manager') && (loan.data.loanData.status.toLowerCase() === 'closed'));
    const ruleFour = loan.data.loanData.status.toLowerCase() === 'open' || loan.data.loanData.status.toLowerCase() === 'corrected' || loan.data.loanData.status.toLowerCase() === 'closed';

    const combineRules = ruleOne || ruleTwo || ruleThree || ruleFour;

    if (combineRules) {
      setShowBtn(false);
    }

  }, [loan.data.loanData.status]);

  const handleApprove = () => {
    if (loan.data.loanData.status.toLowerCase() === 'approved') {
      handleOpenModal();
    }
    else if (loan.data.loanData.status.toLowerCase() === 'disbursed') {
      dispatch(Actions.closeLoan(id, history));
    }
    else {
      history.push({
        pathname: "/loan/request/new/" + id,
        state: {
          amountRequested: loan.data.loanData.amountRequested,
          mobilePhone: loan.data.loanData.mobilePhone,
          annualPay: loan.data.loanData.annualPay,
          workPhone: loan.data.loanData.workPhone,
          homePhone: loan.data.loanData.homePhone,
          duration: loan.data.loanData.duration,
          purpose: loan.data.loanData.purpose,
          email: loan.data.loanData.email,
          loanForm: loan.data.loanData.formUrl,
          fromHR: loan.data.loanData.status.toLowerCase() === "pending" ? true : false,
          fromFM: loan.data.loanData.status.toLowerCase() === "reviewed" ? true : false
        }
      });
    }
    //   else if (loan.data.loanData.amountApproved) {
    // dispatch(Actions.confirmDisbursement({
    //   id,
    //   history: history
    // }));
  }
  // } else {
  // dispatch(Actions.approveLoan({
  //   id,
  //   body: {},
  //   url: endpoint,
  //   history: history
  // }));
  // }
  // };

  const handleCancel = () => {
    dispatch(Actions.cancelLoan(id, history));
  }

  const handleCloseModal = () => setOpen(false);

  const handleOpenModal = () => setOpen(true);

  const handleReject = () => {
    dispatch(Actions.rejectLoan(
      {
        id,
        url: rejectEndpoint
      },
      history
    ));
  };

  const isValue = value => {
    if (value) {
      return value;
    } else {
      return 'Not Yet'
    }
  };

  return {
    showBtn,
    handleApprove,
    handleReject,
    isValue,
    open,
    handleCloseModal,
    handleCancel
  }
};

export const useApproveLoan = () => {
  const loan = useSelector(({ loan }) => loan.loan.data);
  const loans = useSelector(({ loan }) => loan.loan);
  const { id } = useParams();
  const [amountApproved, setAmountApproved] = useState('');
  const [approve, setApprove] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (loan.data.loanData.amountApproved) {
      setAmountApproved(loan.data.loanData.amountApproved)
    }
  }, [loan.data.loanData.amountApproved]);

  useEffect(() => {
    if (parseInt(amountApproved) > loan.data.loanData.amountRequested) {
      setError({
        isError: true,
        message: 'Please you can not approve amount that is greater than the requested amount'
      });
      setDisabled(true);
    } else {
      setError({
        isError: false,
        message: ''
      });
      setDisabled(false);
    }
    if (amountApproved === '') {
      setDisabled(true);
    }
  }, [amountApproved])

  useEffect(() => {
    if (parseInt(amountApproved) < loan.data.loanData.amountRequested && !loan.data.loanData.amountApproved) {
      setApprove(false);
    } else {
      setApprove(true);
    }
  }, [amountApproved, loan.data.loanData.amountApproved]);

  const handleSubmit = e => {
    e.preventDefault();
    const params = {
      amountApproved,
      deductableAmount: `${amountApproved / loan.data.loanData.duration}`
    }
    dispatch(Actions.approveLoan({
      id,
      body: params,
      url: '/loan/approve/finance/',
    }));
  };

  const handleChange = e => {
    setAmountApproved(e.target.value);
  }

  return {
    handleChange,
    error,
    handleSubmit,
    amountApproved,
    approve,
    disabled,
  }
}

export const useLoanStatement = (status) => {

  const [statement, setStatement] = useState(true);
  const header = fetchHeaders();
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(status);
    if (status === 'open') {
      setStatement(true);
    } else {
      setStatement(false);
    }
  }, [status]);

  const handleStatement = () => {
    swal.showLoading();
    fetch(`${getBaseUrl()}/loan/statements/${id}`, {
      ...header.reqHeader(
        'POST',
        {
          // amountApproved: 20000
        }
      ),
    }).then(res => res.json()).then(
      data => {
        if (data.message === 'Created!') {
          swal.fire({
            title: 'Loan Statement',
            text: data.message,
            icon: 'success',
            timer: 3000
          })
          dispatch(Actions.getLoan(id));
        } else {
          swal.fire({
            title: 'Loan Statement',
            text: data.message,
            icon: 'error',
            timer: 3000
          })
        }
      }
    ).catch(e => {
      console.error(e)
    });
  };

  return {
    statement,
    handleStatement
  }
}

export default useLoanManagement;