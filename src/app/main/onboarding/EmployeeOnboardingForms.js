import React from 'react';
import reducer from 'app/main/employeeManagement/store/reducers/employees.reducer';
import withReducer from 'app/store/withReducer';
import EmployeeTable from '../employeeManagement/components/EmployeeTable';
import *  as Actions from 'app/main/employeeManagement/store/actions';
import useEmployees from 'app/main/employeeManagement/hooks/useEmployees';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import formList from './formList';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import Skeleton from '@material-ui/lab/Skeleton';

const { useEffect } = React;

const EmployeeOnboardinForms = () => {
  const dispatch = useDispatch();
  const { open, employees, entities, departments, roles, grades, loading, jobTitles } = useSelector(state => state.employeeMgt);

  const { push } = useHistory();

  useEffect(() => {
    dispatch(Actions.getEmployees());
    dispatch(Actions.getEntities());
    dispatch(Actions.getRoles());
    dispatch(Actions.getGrades());
    dispatch(Actions.getJobTitle());
  }, []);
  const {
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
        title: 'Employee Onboarding',
        handleSearch: ({ target: { value } }) => console.log(value),
      }}
      button={{
        showButton: false,
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
                  push={() => null}
                  handleDelete={handleDelete}
                  handleFilter={handleFilter}
                  onboarding={(id) => push(`/employee/onboarding/${formList[0]}/${id}`)}
                />
              </>
            )
          }
        </div>
      }
    />
  );
};

export default withReducer('employeeMgt', reducer)(EmployeeOnboardinForms);