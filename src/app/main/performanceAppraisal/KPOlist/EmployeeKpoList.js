import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import React from 'react';
import CreateEmployeeKpo from './components/CreateEmployeeKpo';
import EmployeeKpoListTable from './components/EmployeeKpoListTable';
import useKpoList from './hooks/useKpoList';
import reducer from './store/reducers';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

const EmployeeKpoList = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const state = useSelector(state => state.kpo.employeeKpoList);
  const userId = useSelector(state => state.profile?.data?.id);
  const employees = useSelector(state => state.employeeList.data);

  function handleChangeTab(event, value) {
		setTabValue(value);
  }

  const customHook = useKpoList({
    userId,
    dispatch,
    push,
    state,
    employees
  });
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
        onClick: customHook.handleOpenModal,
        btnComponent: false,
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
        <Tab className="h-64 normal-case" label="On-going KPO" />
        <Tab className="h-64 normal-case" label="Completed" />
      </Tabs>
    }
      content={
        <div className='p-24'>
          {customHook.loading ? (
            <Skeleton variant="rect" width='100%' height={400} animation="wave"/>
          ) : (
            <>
            {
              tabValue === 0 && (
                <>
                  <EmployeeKpoListTable customHook={customHook}/>
                  <CreateEmployeeKpo customHook={customHook}/>
                </>
              )
            }
            {
              tabValue === 1 && (
                <EmployeeKpoListTable customHook={customHook} completed/>
              )
            }
            </>
          )}
        </div>
      }
    />
  );
};

export default withReducer('kpo', reducer)(EmployeeKpoList);