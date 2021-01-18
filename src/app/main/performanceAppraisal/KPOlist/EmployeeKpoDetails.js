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

const EmployeeKpoDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { push } = useHistory();

  const EmployeeKpo = useSelector(state => state.kpo.employeeKpoList);
  const { data: kpoCategory } = useSelector(state => state.kpoCategory);
  const state = useSelector(state => state.kpo.kpoContentList);
  const userInfo = useSelector(state => state.auth.user);

  const EmployeeKpoCustomHook = useKpoList({
    dispatch,
    id: params?.id,
    state: EmployeeKpo,
    push
  });
  const customHook = useKpoContentList({
    config: {},
    state,
    dispatch,
    params,
    push,
    kpoCategory
  });

  const kpoSummary = useKpoSummary({
    dispatch,
    state,
    userInfo,
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
        showButton: tabValue === 1 && true,
        btnTitle: 'Add KPO Content',
        onClick: customHook.handleOpenModal
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
          <Tab className="h-64 normal-case" label="Personal Development" />
				</Tabs>
      }
      content={
        <div className=" sm:p-24 ">
          {tabValue === 0 && (<EditEmployeeKpo customHook={EmployeeKpoCustomHook}/>)}
          {tabValue === 1 && (
            <>
              <KpoContentList customHook={customHook} />
              <CreateKpoContent customHook={customHook} />
            </>
          )}
          {tabValue === 2 && (<KpoComments kpoSummary={kpoSummary}/>)}
          {tabValue === 3 && (<KpoContentPipScore />)}
          {tabValue === 4 && (<BehaviouralAttribute />)}
          {tabValue === 5 && (<PersonalDevelopment data={EmployeeKpo.kpo}/>)}
        </div>
      }
    />
  );
};

withReducer('kpoCategory', kpoCategoryReducer)(EmployeeKpoDetails);
export default withReducer('kpo', reducer )(EmployeeKpoDetails);