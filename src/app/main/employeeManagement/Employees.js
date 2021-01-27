import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import AddNewEmployee from './components/AddNewEmployee';
import EmployeeTable from './components/EmployeeTable';
import useEmployees from './hooks/useEmployees';

const Employees = () => {
  const {
    control,
    errors,
    register,
    handleSubmit,
    onSubmit,
    handleCloseModal,
    handleOpenModal,
    handleDelete,
    handleSearch,
    handleFilter,
  } = useEmployees();

  return (
    <PageLayout
      header={{
        icon: '',
        title: 'Employee Managmenet',
        handleSearch: ({target: { value }}) => handleSearch(value),
      }}
      button={{
        showButton: true,
        btnTitle: 'Add New Employee',
        onClick: handleOpenModal,
        btnComponent: false,
      }}
      content={
        <div className='p-24'>
          <EmployeeTable
            data={[]}
            push={() => null}
            handleDelete={handleDelete}
            handleFilter={handleFilter}
          />
          <AddNewEmployee
            open={true}
            handleClose={handleCloseModal}
            form={{
              handleSubmit,
              onSubmit,
              register,
              control,
              errors,
            }}
          />
        </div>
      }
    />
  );
};

export default Employees;