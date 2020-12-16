import React from 'react';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import Skeleton from '@material-ui/lab/Skeleton';
import EmployeeGradeTable from './components/EmployeeGradeTable';
import EmployeeGradeModal from './components/EmployeeGradeModal';
import reducer from './store/reducers/employeeGrade.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployeeGrade } from './store/actions';
import useEmployeeGrade from './hooks/useEmployeeGrade';

const EmployeeGrade = () => {

  const dispatch = useDispatch();
  const state = useSelector(state => state.employeeGrade);
  const { handleOpen } = useEmployeeGrade(state);
  React.useEffect(() => {
    dispatch(getAllEmployeeGrade());
  }, []);

  return (
    <PageLayout
      button={{
        showButton: true,
        btnTitle: 'Add Employee Grade',
        onClick: handleOpen,
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

export default withReducer('employeeGrade', reducer)(EmployeeGrade);