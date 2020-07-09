import React from 'react';
import EmployeeLeaveDetails from 'app/shared/Leave_management_components/employeeLeaveDetails';

const LeaveDetails = () => {
  const config = {
    user: 'line_manager'
  }
  
  return (
    <div>
      <EmployeeLeaveDetails config={config} />
    </div>
  );
};

export default LeaveDetails;