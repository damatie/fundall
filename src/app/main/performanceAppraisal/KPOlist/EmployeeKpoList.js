import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import React from 'react';
import CreateEmployeeKpo from './components/CreateEmployeeKpo';
import EmployeeKpoListTable from './components/EmployeeKpoListTable';
import useKpoList from './hooks/useKpoList';
import reducer from './store/reducers/kpoList.reducers';
import Skeleton from '@material-ui/lab/Skeleton';

const EmployeeKpoList = () => {
  const { handleOpenModal, loading } = useKpoList();
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
        onClick: handleOpenModal
      }}
      content={
        <div className='p-24'>
          {false ? (
            <Skeleton variant="rect" width='100%' height={400} animation="wave"/>
          ) : (
            <>
              <EmployeeKpoListTable />
              <CreateEmployeeKpo />
            </>
          )}
        </div>
      }
    />
  );
};

export default withReducer('employeeKpoList', reducer)(EmployeeKpoList);