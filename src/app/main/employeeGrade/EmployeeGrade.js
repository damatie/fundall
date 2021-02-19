import React from 'react';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import Skeleton from '@material-ui/lab/Skeleton';
import EmployeeGradeTable from './components/EmployeeGradeTable';
import EmployeeGradeModal from './components/EmployeeGradeModal';
import reducer from './store/reducers/employeeGrade.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployeeGrade, getEntity } from './store/actions';
import useEmployeeGrade from './hooks/useEmployeeGrade';

const EmployeeGrade = () => {

  const dispatch = useDispatch();
  const state = useSelector(state => state.employeeGrade);
  const customHook = useEmployeeGrade(state, dispatch);

  React.useEffect(() => {
    dispatch(getAllEmployeeGrade({
      offset: 0,
      limit: 10
    }));
    dispatch(getEntity());
  }, []);

  return (
    <PageLayout
      button={{
        showButton: true,
        btnTitle: 'Add Employee Grade',
        onClick: customHook.handleOpen,
      }}
      header={{
        title: 'Employee Grade',
        handleSearch: (ev) => console.log(ev)
      }}
      content={
        <div className='p-24'>
          {
            state.loading ? (
              <Skeleton variant="rect" width='100%' height={400} animation="wave"/>
            ) : (
              <>
                <EmployeeGradeTable customHook={customHook}/>
                <EmployeeGradeModal customHook={{entity: state.entity, ...customHook}}/>
              </>
            )
          }
        </div>
      }
    />
  );
};

export default withReducer('employeeGrade', reducer)(EmployeeGrade);