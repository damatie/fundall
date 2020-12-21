import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import withReducer from 'app/store/withReducer';
import EditEmployeeKpoContent from './components/EditEmployeeKpoContent';
import KpoContentTarget from './components/KpoContentTarget';
import KpoContentPipScore from './components/KpoContentPipScore';
import reducer from './store/reducers';

const EmployeeKpoContentDetails = () => {

  const [tabValue, setTabValue] = React.useState(0);
  
  function handleChangeTab(event, value) {
		setTabValue(value);
  }
  
  return (
    <PageLayout
      noSearch
      header={{
        icon: '',
        title: 'KPO Content Details',
        handleSearch: ({target: { value }}) => console.log(value),
      }}
      button={{showButton: false}}
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
					<Tab className="h-64 normal-case" label="KPO Content Details" />
					<Tab className="h-64 normal-case" label="KPO Targets" />
          {/* <Tab className="h-64 normal-case" label="PIP Score" /> */}
				</Tabs>
      }
      content={
        <div className=" sm:p-24 ">
          {tabValue === 0 && (<EditEmployeeKpoContent />)}
          {tabValue === 1 && (
            <>
              <KpoContentTarget />
            </>
          )}
          {/* {tabValue === 2 && (<KpoContentPipScore />)} */}
        </div>
      }
    />
  );
};

export default withReducer('kpo', reducer)(EmployeeKpoContentDetails);