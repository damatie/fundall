import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import AddNewEmployee from './components/AddNewEmployee';
import EmployeeTable from './components/EmployeeTable';

const Employees = () => {
  return (
    <PageLayout
      header={{
        icon: '',
        title: 'Employee Managmenet',
        handleSearch: ({target: { value }}) => console.log(value),
      }}
      button={{
        showButton: true,
        btnTitle: 'Add New Employee',
        onClick: () => null,
        btnComponent: false,
      }}
      content={
        <div className='p-24'>
          <EmployeeTable />
          <AddNewEmployee />
        </div>
      }
    />
  );
};

export default Employees;