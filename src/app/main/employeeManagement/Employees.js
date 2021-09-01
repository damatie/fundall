import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
// import AddNewEmployee from './AddNewEmployee';
import EmployeeTable from './components/EmployeeTable';
import useEmployees from './hooks/useEmployees';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store/reducers/employees.reducer';
import withReducer from 'app/store/withReducer';
import *  as Actions from './store/actions';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router';
// import loactions from './store/reducers/locations.reducer';

const Employees = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.employeeMgt);
  const { push } = useHistory();

  const {
    handleDelete,
    handleSearch,
    handleFilter,
    roles,
    entities,
    employees,
    loading
  } = useEmployees({
    dispatch,
    state
  });

  const createEmployee = () => {
    // window.location.assign('/hr/create-employee');
    window.location.href = "/hr/create-employee";
  }

  return (
    <PageLayout
      header={{
        icon: '',
        title: 'Employee Management',
        handleSearch: ({ target: { value } }) => handleSearch(value),
      }}
      button={{
        showButton: true,
        btnTitle: 'Add New Employee',
        onClick: createEmployee,
        btnComponent: false,
      }}
      content={
        <div className='p-24'>
          {
            loading ? (
              <Skeleton variant="rect" width='100%' height={400} animation="wave" />
            ) : (
                <>
                  <EmployeeTable
                    data={{
                      employees,
                      entities,
                      roles,
                    }}
                    push={push}
                    handleDelete={handleDelete}
                    handleFilter={handleFilter}
                  />
                  {/* <AddNewEmployee
                    open={open}
                    handleClose={handleCloseModal}
                    data={{
                      entities,
                      departments,
                      roles,
                      grades,
                      jobTitles,
                    }}
                    handleGetDept={handleGetDept}
                    form={{
                      handleSubmit,
                      onSubmit,
                      register,
                      control,
                      errors,
                    }}
                  /> */}
                </>
              )
          }
        </div>
      }
    />
  );
};

// withReducer('locations', loactions)(Employees);
export default withReducer('employeeMgt', reducer)(Employees);