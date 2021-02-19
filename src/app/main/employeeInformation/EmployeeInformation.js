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
import { getEmployeeInfo } from './store/actions';
import { useParams } from 'react-router';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeInformation = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const { loading } = useSelector(state => state.employeeInformation.employeeInfo);
  const authState = useSelector(state => state.auth.user);

  const params = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!!params.id) {
      dispatch(getEmployeeInfo(params.id));
      return;
    }
    dispatch(getEmployeeInfo(authState.id));
  }, []);

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
            {
              loading ? (
                <Skeleton variant="rect" width='100%' height={400} animation="wave" />
              ) : (
                  <>
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
                  </>
                )
            }
          </div>
        }
      />
      <CreateEmployeeInfo />
    </>
  );
};

export default withReducer('employeeInformation', reducer)(EmployeeInformation);