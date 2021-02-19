import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import AddNewEmployee from './components/AddNewEmployee';
import EmployeeTable from './components/EmployeeTable';
import useEmployees from './hooks/useEmployees';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store/reducers/employees.reducer';
import withReducer from 'app/store/withReducer';
import *  as Actions from './store/actions';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router';

const Employees = () => {
  const dispatch = useDispatch();
  const { open, employees, entities, departments, roles, grades, loading, jobTitles } = useSelector(state => state.employeeMgt);
  const { push } = useHistory();

  React.useEffect(() => {
    dispatch(Actions.getEmployees());
    dispatch(Actions.getEntities());
    dispatch(Actions.getRoles());
    dispatch(Actions.getGrades());
    dispatch(Actions.getJobTitle());
  }, []);
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
    handleGetDept
  } = useEmployees({
    dispatch
  });

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
        onClick: handleOpenModal,
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
                  <AddNewEmployee
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
                  />
                </>
              )
          }
        </div>
      }
    />
  );
};

export default withReducer('employeeMgt', reducer)(Employees);