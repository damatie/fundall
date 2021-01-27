import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import AddNewEmployee from './components/AddNewEmployee';
import EmployeeTable from './components/EmployeeTable';
import useEmployees from './hooks/useEmployees';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store/reducers/employees.reducer';
import withReducer from 'app/store/withReducer';

const Employees = () => {
  const dispatch = useDispatch();
  const { open } = useSelector(state => state.employeeMgt);
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
  } = useEmployees({
    dispatch
  });

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
            open={open}
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

export default withReducer('employeeMgt', reducer)(Employees);