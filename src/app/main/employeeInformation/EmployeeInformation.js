import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import EmployeeBasicInformation from './EmployeeBasicInformation';
import GradeAndPromotion from './GradeAndPromotion';
import EmployeeCompensation from './EmployeeCompensation';
import EmployeeConfidentialInfo from './EmployeeConfidentialInfo';
import CreateEmployeeInfo from './CreateEmployeeInfo';
import reducer from './store/reducers';
import withReducer from 'app/store/withReducer';

const EmployeeInformation = () => {
  const [tabValue, setTabValue] = React.useState(0);
  function handleChangeTab(event, value) {
		setTabValue(value);
  }
  return (
    <>
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
          {/* <Tab className="h-64 normal-case" label="Confidential Information" /> */}
				</Tabs>
      }
      content={
        <div className=" sm:p-24 ">
          {tabValue === 0 && (
            <EmployeeBasicInformation />
          )}
          {tabValue === 1 && (
            <GradeAndPromotion />
          )}
          {tabValue === 2 && (
            <EmployeeCompensation />
          )}
          {tabValue === 3 && (
            <>Stil Under Contruction</>
          )}
          {/* {tabValue === 4 && (
            <EmployeeConfidentialInfo />
          )} */}
        </div>
      }
    />
      <CreateEmployeeInfo />
    </>
  );
};

export default withReducer('employeeInformation', reducer)(EmployeeInformation);