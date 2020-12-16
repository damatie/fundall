import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import JobTitleTable from './components/JobTitleTable';
import JobTitleModal from './components/JobTitleModal';
import reducer from './store/reducers/jobTitle.reducer';
import withReducer from 'app/store/withReducer';
import useJobTitle from './hooks/useJobTitle';

const JobTitle = () => {
  const { openModal } = useJobTitle();
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
          <JobTitleModal/>
          <JobTitleTable />
        </div>
      }
    />
  );
};

export default withReducer('jobTitle', reducer)(JobTitle);