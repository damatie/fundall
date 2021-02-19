import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import JobTitleTable from './components/JobTitleTable';
import JobTitleModal from './components/JobTitleModal';
import reducer from './store/reducers/jobTitle.reducer';
import withReducer from 'app/store/withReducer';
import useJobTitle from './hooks/useJobTitle';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

const JobTitle = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.jobTitle)
  const value = useJobTitle({
    dispatch,
    state
  });

  React.useEffect(() => {
    dispatch(Actions.getAllJobTitle());
  }, []);

  return (
    <PageLayout
      button={{
        showButton: true,
        btnTitle: 'Add Job Title',
        onClick: value.openModal
      }}
      header={{
        title: 'Job Title',
        handleSearch: (ev) => console.log(ev)
      }}
      content={
        <div className='p-24'>
          {
            value.loading ? (
              <Skeleton variant="rect" width='100%' height={400} animation="wave"/>
            ) : (
              <>
                <JobTitleModal customHook={value}/>
                <JobTitleTable customHook={value}/>
              </>
            )
          }
          
        </div>
      }
    />
  );
};

export default withReducer('jobTitle', reducer)(JobTitle);