import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import EditEmployeeKpo from './components/EditEmployeeKpo';
import KpoContentList from './components/KpoContentList';
import CreateKpoContent from './components/CreateKpoContent';
import reducer from './store/reducers';
import withReducer from 'app/store/withReducer';
import useKpoContentList from './hooks/useKpoContent';
import KpoComments from './components/KpoComments';
import kpoCategoryReducer from '../KPOcategoryList/store/reducers/categoryList.reducer';
import KpoContentPipScore from './components/KpoContentPipScore';
import PersonalDevelopment from './components/PersonalDevelopment';
import BehaviouralAttribute from './components/BehaviouralAttribute';
import useKpoList from './hooks/useKpoList';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import useKpoSummary from './hooks/useKpoSummary';
import useKpoPip from './hooks/useKpoPip';
import CustomIconButton from 'app/shared/button/CustomIconButton';
import Button from '@material-ui/core/Button'
import userRole from 'utils/userRole';

const EmployeeKpoDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { push } = useHistory();

  const EmployeeKpo = useSelector(state => state.kpo.employeeKpoList);
  const { data: kpoCategory } = useSelector(state => state.kpoCategory);
  const state = useSelector(state => state.kpo.kpoContentList);
  const userInfo = useSelector(state => state.auth.user);
  const employees = useSelector(state => state.employeeList.data);

  const EmployeeKpoCustomHook = useKpoList({
    dispatch,
    id: params?.id,
    state: EmployeeKpo,
    push,
    employees,
    userInfo,
  });
  const customHook = useKpoContentList({
    config: {},
    state,
    dispatch,
    params,
    push,
    kpoCategory,
    userInfo
  });

  const kpoSummary = useKpoSummary({
    dispatch,
    state: EmployeeKpo.kpo,
    userInfo,
  });
  
  const calculatePip = useKpoPip({
    dispatch,
    state: EmployeeKpo.kpo,
    role: userInfo.role
  })

  const [tabValue, setTabValue] = React.useState(0);
  
  function handleChangeTab(event, value) {
		setTabValue(value);
  }

  
  return (
    <PageLayout
      noSearch={tabValue === 1 ? false : true}
      prev={{
        url: '/performance_appraisal/kpoList'
      }}
      header={{
        icon: '',
        title: 'KPO Details',
        handleSearch: ({target: { value }}) => console.log(value),
      }}
      button={{
        showButton: true,
        btnComponent: tabValue !== 1 ? (
          <CustomIconButton 
            onClick={EmployeeKpoCustomHook.submitKpo} 
            icon='check' 
            type='success' 
            className='w-full px-8'
          >
            {EmployeeKpoCustomHook.submitButtonText()}
          </CustomIconButton>
        ) : (
          <>
            {
              EmployeeKpoCustomHook.shouldShowAddButton() && (
                <Button variant="contained" color="secondary" onClick={customHook.handleOpenModal}>
                  Add KPO Content
                </Button>
              )
            }
          </>
        )
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
					<Tab className="h-64 normal-case" label="KPO Details" />
					<Tab className="h-64 normal-case" label="KPO Content" />
          <Tab className="h-64 normal-case" label="KPO Summary Review" />
          <Tab className="h-64 normal-case" label="%PIP" />
          <Tab className="h-64 normal-case" label="Behavioural Attribute" />
          <Tab className="h-64 normal-case" label="Personnel Development" />
				</Tabs>
      }
      content={
        <div className=" sm:p-24 ">
          {tabValue === 0 && (<EditEmployeeKpo customHook={EmployeeKpoCustomHook}/>)}
          {tabValue === 1 && (
            <>
              <KpoContentList customHook={customHook} />
              <CreateKpoContent customHook={customHook} />
              {
                userRole(userInfo.role) === 'linemanager' && (
                  <CustomIconButton 
                    type='success' 
                    className='flex flex-col my-10 mx-auto' 
                    onClick={EmployeeKpoCustomHook.approveKpo}
                  >
                    Approve
                  </CustomIconButton>
                )
              }
            </>
          )}
          {tabValue === 2 && (<KpoComments kpoSummary={kpoSummary}/>)}
          {tabValue === 3 && (<KpoContentPipScore calculatePip={calculatePip}/>)}
          {tabValue === 4 && (<BehaviouralAttribute kpoDetails={EmployeeKpo.kpo} role={userRole(userInfo.role)}/>)}
          {tabValue === 5 && (<PersonalDevelopment data={EmployeeKpo.kpo} role={userRole(userInfo.role)}/>)}
        </div>
      }
    />
  );
};

withReducer('kpoCategory', kpoCategoryReducer)(EmployeeKpoDetails);
export default withReducer('kpo', reducer )(EmployeeKpoDetails);