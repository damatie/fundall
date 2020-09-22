import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from 'app/main/loanApp/salaryAdvance/store/actions';

const handleBtnVisibility = ({role, status}) => {
  const ruleOne = role === 'Director of support service' && (status === 'pending' || status !== 'rejected');
  const ruleTwo = role === 'Finance manager' && (status === 'approved' || status !== 'rejected');
  const ruleThree = status !== 'open' && status !== 'closed' && status !== 'rejected';

  const combineRules = ruleOne || ruleTwo || ruleThree;

  return combineRules;
};

const getSalaryAdvanceUrl = ({ type, status }) => {
  if(type === 'approve') {
    switch(status) {
      case 'pending': {
        return '/salary-advance/approve/support/';
      }
      case 'approved': {
        return '/salary-advance/approve/finance/';
      }
      default: {
        return;
      }
    };
  } else {
    switch(status) {
      case 'pending': {
        return '/salary-advance/support/reject/';
      }
      case 'approved': {
        return '/salary-advance/finance/reject/';
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
        status: loan.salaryAdvanceData.status
      }
    ))
    setRejectUrl(getSalaryAdvanceUrl(
      {
        type: 'reject',
        status: loan.salaryAdvanceData.status
      }
    ))
  }, [loan, userRole]);

  const handleApprove = () => {
    dispatch(Actions.approveSalaryAvance({
      id,
      url: approveUrl,
    }));
  };

  const handleReject = () => {
    dispatch(Actions.rejectSalaryAdvance({
      id,
      url: rejectUrl,
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