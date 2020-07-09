import React from 'react';
import EmployeeLeaveDetails from 'app/shared/Leave_management_components/employeeLeaveDetails';

const HrLeaveReiewDetails = () => {
  const config = {
    user: 'hr'
  }
  return (
    <>
      <EmployeeLeaveDetails config={config} />
    </>
  );
};

export default HrLeaveReiewDetails;