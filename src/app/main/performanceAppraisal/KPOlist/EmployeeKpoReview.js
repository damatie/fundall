import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import React from 'react';
import useKpoList from './hooks/useKpoList';
import reducer from './store/reducers';
import Skeleton from '@material-ui/lab/Skeleton';
import ListOfEmployeeKpo from './components/ListOfEmployeeKpo';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import useKpoReview from './hooks/useKpoReview';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getKpoByDept, getAssignedKpo, getKpoByEntity, getEntities, getKpoByStatus } from './store/actions';
import userRole from 'utils/userRole';
import KpoRequestModal from './components/KpoRequestModal';

const EmployeeKpoReview = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const kpoList = useSelector(state => state.kpo.kpoReview);
  const userInfo = useSelector(state => state.profile?.data);
  const dispatch = useDispatch();
  const { push } = useHistory();

  React.useEffect(() => {
    if(userRole(userInfo.role?.name) === 'linemanager') {
      dispatch(getKpoByDept(userInfo.departmentId));
    }
    dispatch(getAssignedKpo());
  }, [userInfo]);

  React.useEffect(() => {
    if(userRole(userInfo.role?.name) === 'hrmanager') {
      dispatch(getEntities(userInfo.entityId));
      dispatch(getKpoByStatus({status: 'requested', requested: true}))
    }
  }, [userInfo]);
  
  function handleChangeTab(event, value) {
		setTabValue(value);
  }

  const value = useKpoReview({
    dispatch,
    push,
    kpoList,
    userInfo
  });

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
      contentToolbar={
          <Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="All KPO" />
					<Tab className="h-64 normal-case" label="KPO Assigned as Reviewing Manager" />
          {userRole(userInfo.role?.name) === 'hrmanager' && <Tab className="h-64 normal-case" label="KPO Creation Request" />}
          <Tab className="h-64 normal-case" label="Completed KPO" />
				</Tabs>
      }
      content={
        <div className='p-24'>
          {tabValue === 0 && (
            <ListOfEmployeeKpo customHook={value} value={userInfo.entityId} type='all'/>
          )}
          {tabValue === 1 && (
            <ListOfEmployeeKpo customHook={value} isAssigned/>
          )}
          {(userRole(userInfo.role?.name) === 'hrmanager' ? tabValue === 2 : tabValue === 3) && (
            <>
              <ListOfEmployeeKpo customHook={value} request/>
              <KpoRequestModal customHook={value} />
            </>
          )}
          {(userRole(userInfo.role?.name) === 'hrmanager' ? tabValue === 3 : tabValue === 2) && (
            <ListOfEmployeeKpo customHook={value} value={userInfo.entityId} type='completed'/>
          )}
        </div>
      }
    />
  );
};

export default withReducer('kpo', reducer)(EmployeeKpoReview);