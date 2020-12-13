import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from 'app/main/loanApp/salaryAdvance/store/actions';
import { useHistory } from 'react-router';

const handleBtnVisibility = ({ role, status }) => {
  status = status.toLowerCase();
  const ruleOne = role === 'Director of support service' && (status === 'pending');
  const ruleTwo = role === 'Finance manager' && (status === 'approved');
  const ruleThree = role !== "Employee" && status === 'pending';

  const combineRules = ruleOne || ruleTwo || ruleThree;

  return combineRules;
};

const getSalaryAdvanceUrl = ({ type, status, role, id }) => {
  if (type === 'approve') {
    switch (status.toLowerCase()) {
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
    switch (status.toLowerCase()) {
      case 'pending': {
        return `/salary-advance/${role.toLowerCase().split(" ").join("")}/reject/${id}`;
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
        status: loan.salaryAdvanceData.status
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