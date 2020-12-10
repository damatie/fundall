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

const EmployeeKpoReview = () => {
  const [tabValue, setTabValue] = React.useState(0);
  
  function handleChangeTab(event, value) {
		setTabValue(value);
  }

  const { 
    isAssigned,
  } = useKpoReview();
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
        isAssigned && (
          <Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="LINE MANAGER" />
					<Tab className="h-64 normal-case" label="REVIEWING MANAGER" />
				</Tabs>
      )}
      content={
        <div className='p-24'>
          {tabValue === 0 && (
            <ListOfEmployeeKpo />
          )}
          {tabValue === 1 && isAssigned && (
            <ListOfEmployeeKpo user='reviewingManager'/>
          )}
        </div>
      }
    />
  );
};

export default withReducer('kpo', reducer)(EmployeeKpoReview);