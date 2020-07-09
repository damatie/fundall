import React from 'react';
import LeaveManagement from 'app/shared/Leave_management_components/LeaveManagement';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from 'app/store/actions';

const LeaveReview = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getPendingLeaveReq());
    dispatch(Actions.getApprovedLeaveReq());
    dispatch(Actions.getReviewedLeaveReq());
  }, [dispatch]);

  const config = {
    user: 'line_manager'
  }
  return (
    <>
      <LeaveManagement config={config}/>
    </>
  );
};

export default LeaveReview;