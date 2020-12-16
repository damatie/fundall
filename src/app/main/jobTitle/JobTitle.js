import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import JobTitleTable from './components/JobTitleTable';
import JobTitleModal from './components/JobTitleModal';
import reducer from './store/reducers/jobTitle.reducer';
import withReducer from 'app/store/withReducer';
import useJobTitle from './hooks/useJobTitle';
import Skeleton from '@material-ui/lab/Skeleton';

const JobTitle = () => {
  const { openModal, loading } = useJobTitle();
  return (
    <PageLayout
      button={{
        showButton: true,
        btnTitle: 'Add Job Title',
        onClick: openModal
      }}
      header={{
        title: 'Job Title',
        handleSearch: (ev) => console.log(ev)
      }}
      content={
        <div className='p-24'>
          {
            loading ? (
              <Skeleton variant="rect" width='100%' height={400} animation="wave"/>
            ) : (
              <>
                <JobTitleModal/>
                <JobTitleTable />
              </>
            )
          }
          
        </div>
      }
    />
  );
};

export default withReducer('jobTitle', reducer)(JobTitle);