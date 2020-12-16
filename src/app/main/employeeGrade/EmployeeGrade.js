import React from 'react';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import Skeleton from '@material-ui/lab/Skeleton';
import EmployeeGradeTable from './components/EmployeeGradeTable';
import EmployeeGradeModal from './components/EmployeeGradeModal';

const EmployeeGrade = () => {
  return (
    <PageLayout
      button={{
        showButton: true,
        btnTitle: 'Add Employee Grade',
        onClick: () => null,
      }}
      header={{
        title: 'Employee Grade',
        handleSearch: (ev) => console.log(ev)
      }}
      content={
        <div className='p-24'>
          <EmployeeGradeTable/>
          <EmployeeGradeModal />
        </div>
      }
    />
  );
};

export default EmployeeGrade;