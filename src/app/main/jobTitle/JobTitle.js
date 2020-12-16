import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import JobTitleTable from './components/JobTitleTable';
import JobTitleModal from './components/JobTitleModal';

const JobTitle = () => {
  return (
    <PageLayout
      button={{
        showButton: true,
        btnTitle: 'Add Job Title',
        onClick: () => console.log('click')
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

export default JobTitle;