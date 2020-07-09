import React from 'react';
import LeaveReview from 'app/main/line_manager/leave_review/leaveReview';

const HrLeaveReview = () => {
  const config = {
    user: 'hr'
  }
  return (
    <>
      <LeaveReview config={config}/>
    </>
  );
};

export default HrLeaveReview;