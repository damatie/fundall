import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import React from 'react';
import useKpoList from './hooks/useKpoList';
import reducer from './store/reducers';
import Skeleton from '@material-ui/lab/Skeleton';
import ListOfEmployeeKpo from './components/ListOfEmployeeKpo';

const EmployeeKpoReview = () => {
  return (
    <PageLayout
      header={{
        icon: '',
        title: 'KPO List',
        handleSearch: ({target: { value }}) => console.log(value),
      }}
      button={{
        showButton: false,
      }}
      content={
        <div className='p-24'>
          {false ? (
            <Skeleton variant="rect" width='100%' height={400} animation="wave"/>
          ) : (
            <>
              <ListOfEmployeeKpo />
            </>
          )}
        </div>
      }
    />
  );
};

export default withReducer('kpo', reducer)(EmployeeKpoReview);