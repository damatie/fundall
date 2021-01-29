import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import EmployeeBasicInformation from './EmployeeBasicInformation';

const EmployeeInformation = () => {
  const [tabValue, setTabValue] = React.useState(0);
  function handleChangeTab(event, value) {
		setTabValue(value);
  }
  return (
    <PageLayout
      header={{}}
      button={{}}
      customHeader={
        <div className='h-80'>Header</div>
      }
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
					<Tab className="h-64 normal-case" label="Emplyee Basic Information" />
					<Tab className="h-64 normal-case" label="Grade And Promotion" />
          <Tab className="h-64 normal-case" label="Compensation" />
          <Tab className="h-64 normal-case" label="Seperation" />
          <Tab className="h-64 normal-case" label="Confidential Information" />
				</Tabs>
      }
      content={
        <div className=" sm:p-24 ">
          {tabValue === 0 && (
            <EmployeeBasicInformation />
          )}
        </div>
      }
    />
  );
};

export default EmployeeInformation;