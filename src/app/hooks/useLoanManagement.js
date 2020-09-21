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
  const profile = useSelector(({ profile}) => profile.data);
  const loan = useSelector(({ loan }) => loan.loan.data)
  const role = profile.role.name;

  const { id } = useParams();

  useEffect(() => {
    switch(loan.loanData.status) {
      case 'pending' : {
        setEnpoint('/loan/approve/hod/');
        setRejectEndpoint('/loan/reject/hod/');
        break;
      }
      case 'reviewed' : {
        setEnpoint('/loan/approve/support/');
        setRejectEndpoint('/loan/reject/support/');
        break;
      }
      case 'approved' : {
        setEnpoint('/loan/approve/finance/');
        setRejectEndpoint('/loan/reject/finance/');
        break;
      }
      default: {
        break;
      }
    }
  }, [loan]);

  useEffect(() => {
    const ruleOne = role === 'Line managers' && loan.loanData.status === 'reviewed';
    const ruleTwo = role === 'Director of support service' && loan.loanData.status === 'approved';
    const ruleThree = role === 'Finance manager' && loan.loanData.status === 'open';
    const ruleFour = loan.loanData.status === 'open' || loan.loanData.status === 'corrected' || loan.loanData.status === 'closed';

    const combineRules = ruleOne || ruleTwo || ruleThree || ruleFour;

    if(combineRules) {
      setShowBtn(false);
    }

  }, [loan.loanData.status]);

  const handleApprove = () => {
    if(loan.loanData.status === 'approved') {
      handleOpenModal();
    } else {
      dispatch(Actions.approveLoan({
        id,
        body: {},
        url: endpoint,
      }));
    }
  };

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
    if(value) {
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
		if(loan.loanData.amountApproved) {
			setAmountApproved(loan.loanData.amountApproved)
		}
  }, [loan.loanData.amountApproved]);

  useEffect(() => {
    if(parseInt(amountApproved) > loan.loanData.amountRequested) {
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
    if(amountApproved === '') {
      setDisabled(true);
    }
  }, [amountApproved])

  useEffect(() => {
    if(parseInt(amountApproved) < loan.loanData.amountRequested && !loan.loanData.amountApproved) {
      setApprove(false);
    } else {
      setApprove(true);
    }
  }, [amountApproved, loan.loanData.amountApproved]);
  
  const handleSubmit = e => {
		e.preventDefault();
		const params = {
			amountApproved,
			deductableAmount: `${amountApproved / loan.loanData.duration}`
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
    if(status === 'open') {
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
				if(data.message === 'Created!') {
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
			console.error(e)});
  };

  return {
    statement,
    handleStatement
  }
}

export default useLoanManagement;