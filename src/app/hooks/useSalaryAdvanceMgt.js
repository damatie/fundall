import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from 'app/main/loanApp/salaryAdvance/store/actions';
import { useHistory } from 'react-router';

const handleBtnVisibility = ({ role, status }) => {
  status = status.toLowerCase();
  const ruleOne = (role === 'Director of support service' || role === 'Line Manager') && (status === 'pending');
  const ruleTwo = role === 'Hr Manager' && (status === 'reviewed1');
  const ruleThree = role === 'Finance manager' && (status === 'reviewed2');
  const ruleFour = role !== "Employee" && status === 'pending';

  const combineRules = ruleOne || ruleTwo || ruleThree || ruleFour;

  return combineRules;
};

const getSalaryAdvanceUrl = ({ type, status, role, id }) => {
  if (type === 'approve') {
    switch (status.toLowerCase()) {
      case 'pending': {
        return `/salary-advance/approve/linemanager/`;
      }
      case 'reviewed1': {
        return `/salary-advance/approve/hrmanager/`;
      }
      case 'reviewed2': {
        return `/salary-advance/approve/finance/`;
      }
      default: {
        return;
      }
    };
  } else {
    switch (status.toLowerCase()) {
      case 'pending': {
        return `/salary-advance/reject/linemanager/`;
      }
      case 'reviewed1': {
        return `/salary-advance/reject/hrmanager/`;
      }
      case 'reviewed2': {
        return `/salary-advance/reject/finance/`;
      }
      default: {
        return;
      }
    };
  }

};


const useSalaryAdvanceMgt = ({ loan, userRole, id }) => {
  const [showBtn, setShowBtn] = useState(true);
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [approveUrl, setApproveUrl] = useState('');
  const [rejectUrl, setRejectUrl] = useState('');

  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    setShowBtn(handleBtnVisibility(
      {
        role: userRole,
        status: loan.salaryAdvanceData.status
      }
    ));
    setShowCancelBtn(loan.salaryAdvanceData.status === 'open');
    setApproveUrl(getSalaryAdvanceUrl(
      {
        type: 'approve',
        status: loan.salaryAdvanceData.status,
        id: loan.salaryAdvanceData.id
      }
    ))
    setRejectUrl(getSalaryAdvanceUrl(
      {
        type: 'reject',
        status: loan.salaryAdvanceData.status,
        role: userRole,
        id: loan.salaryAdvanceData.id
      }
    ))
  }, [loan, userRole]);

  const handleApprove = () => {
    // dispatch(Actions.approveSalaryAvance({
    //   id,
    //   url: approveUrl,
    // }));
    history.push({
      pathname: "/loan/request/salaryadvance_request/new/" + id,
      state: userRole
    })

  };

  const handleReject = (data) => {
    let payload = {};
    payload.amount = data.amount;
    payload.repaymentDate = data.repaymentDate;

    console.log(rejectUrl)

    dispatch(Actions.rejectSalaryAdvance({
      id,
      url: rejectUrl,
      payload
    }));
  };

  const handleCancel = () => {
    dispatch(Actions.cancelSalaryAdvance(id));
  };

  return {
    showCancelBtn,
    showBtn,
    handleCancel,
    handleApprove,
    handleReject,
  };
};

export default useSalaryAdvanceMgt;