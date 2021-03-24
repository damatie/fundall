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
import { getAllEmployeeGrade } from 'app/main/employeeGrade/store/actions';
import { getAllJobTitle } from 'app/main/jobTitle/store/actions';
import { getAllRoles } from 'app/main/permission/store/actions';
import ProfilePicture from './components/ProfilePicture';
import Signature from './components/Signature';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

const EmployeeInformation = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const { loading, info } = useSelector(state => state.employeeInformation.employeeInfo);
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

  React.useEffect(() => {
    dispatch(getAllEmployeeGrade({ offset: 0, limit: 10000 }));
    dispatch(getAllJobTitle());
    dispatch(getAllRoles())
  }, []);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }
  return (
    <>
      <PageLayout
        header={{}}
        button={{
          icon: '',
          title: 'Employee Management',
          handleSearch: ({ target: { value } }) => handleSearch(value),
        }}
        noSearch={true}
        headerClass='h-192'
        customHeader={
          <section className='h-full w-full p-4 relative'>
            {
              !!params?.id && (
                <section className='flex flex-row justify-start items-end absolute bottom-0 p-20'>
                  <Icon
                    className="text-20 text-black bg-white rounded-20 mr-16"
                    component={Link}
                    to={'/employee_management'}
                    role="button"
                  >
                    arrow_back
							    </Icon>
                </section>
              )
            }
            <section className='flex flex-row items-center justify-center p-4'>
              <ProfilePicture />
            </section>
            <Signature value={{
              signature: info.signature,
              id: info.employeeId
            }} />
          </section>
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