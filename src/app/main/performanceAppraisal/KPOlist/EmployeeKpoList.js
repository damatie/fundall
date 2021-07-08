import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import React from 'react';
import CreateEmployeeKpo from './components/CreateEmployeeKpo';
import EmployeeKpoListTable from './components/EmployeeKpoListTable';
import useKpoList from './hooks/useKpoList';
import reducer from './store/reducers';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const EmployeeKpoList = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const state = useSelector(state => state.kpo.employeeKpoList);
  const userId = useSelector(state => state.profile?.data?.id);
  const employees = useSelector(state => state.employeeList.data);
  const customHook = useKpoList({
    userId,
    dispatch,
    push,
    state,
    employees
  });
  return (
    <PageLayout
      header={{
        icon: '',
        title: 'KPO List',
        handleSearch: ({target: { value }}) => console.log(value),
      }}
      button={{
        showButton: true,
        btnTitle: 'Create KPO',
        onClick: customHook.handleOpenModal,
        btnComponent: false,
      }}
      content={
        <div className='p-24'>
          {customHook.loading ? (
            <Skeleton variant="rect" width='100%' height={400} animation="wave"/>
          ) : (
            <>
              <EmployeeKpoListTable customHook={customHook}/>
              <CreateEmployeeKpo customHook={customHook}/>
            </>
          )}
        </div>
      }
    />
  );
};

export default withReducer('kpo', reducer)(EmployeeKpoList);