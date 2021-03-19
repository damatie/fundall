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

const { useEffect, useMemo } = React;

const EmployeeOnboardinForms = () => {
  const dispatch = useDispatch();
  const { open, employees, entities, departments, roles, grades, loading, jobTitles } = useSelector(state => state.employeeMgt);

  const { push } = useHistory();

  const columns = useMemo(
		() => [
			{
				Header: 'NAME',
				accessor: 'name',
				// className: 'font-bold',
				sortable: true,
				Cell: ({ row: { original: { firstName, lastName }} }) => {
					return <>{`${firstName} ${lastName}`}</>
				}
			},
			{
				Header: 'EMAIL',
				accessor: 'email',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'DEPARTMENT',
				accessor: 'department',
				sortable: true,
				Cell: ({ row: { original: { department }} }) => {
					return <>{department.departmentName}</>
				}
			},
			{
				Header: 'ENTITY',
				accessor: 'entity',
				sortable: true,
				Cell: ({ row: { original: { entity }} }) => {
					return <>{entity.entityName}</>
				}
			},
			{
				Header: 'ROLE',
				accessor: 'role',
				sortable: true,
				Cell: ({ row: { original: { role }} }) => {
					return <>{role.name}</>
				}
			},
      {
        Header: 'DATE OF ONBOARDING',
				accessor: 'onBoardDate',
				sortable: true,
      }
		],
	);

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
                  coln={columns}
                  check
                  data={{
                    employees: employees.filter((emp) => emp.onBoarded),
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