import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import withReducer from 'app/store/withReducer';
import EditEmployeeKpoContent from './components/EditEmployeeKpoContent';
import KpoContentTarget from './components/KpoContentTarget';
import reducer from './store/reducers';
import kpoCategoryReducer from '../KPOcategoryList/store/reducers/categoryList.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import useKpoContent from './hooks/useKpoContent';
import ModificationRequest from './components/ModificationRequest';
import useModificationReq from './hooks/useModificationReq';

const EmployeeKpoContentDetails = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const dispatch = useDispatch();
  const params = useParams();
  const { push } = useHistory();
  const location = useLocation();
  const [prevUrl, setPrevUrl] = React.useState(`/performance_appraisal/kpoList/details/${params.id}`);

  React.useEffect(() => {
    location.pathname === `/performance_appraisal/kpo/review/details/${params.id}/kpoContent/${params.kpoContentId}` && setPrevUrl(`/performance_appraisal/kpo/review/details/${params.id}`);
  }, [])
  const { data: kpoCategory } = useSelector(state => state.kpoCategory);
  const state = useSelector(state => state.kpo.kpoContentList);
  const userInfo = useSelector(state => state.auth.user)
  const customHook = useKpoContent({
    config: {type: tabValue === 1 && 'quarter'},
    state,
    dispatch,
    params,
    push,
    kpoCategory,
    userInfo
  });

  const modificationReq = useModificationReq({
    state,
    dispatch,
    role: userInfo.role
  })
  
  function handleChangeTab(event, value) {
		setTabValue(value);
  }
  
  return (
    <PageLayout
      noSearch
      prev={{
        url: prevUrl
      }}
      header={{
        icon: '',
        title: 'KPO Content Details',
        handleSearch: ({target: { value }}) => console.log(value),
      }}
      button={{
        showButton: true,
        btnComponent: <ModificationRequest role={modificationReq.role} status={state.kpoContent.updateStatus ? state.kpoContent.updateStatus : 'No Request'} handleClick={modificationReq.handleClick} id={state.kpoContent.id}/>
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
					<Tab className="h-64 normal-case" label="KPO Content Details" />
					<Tab className="h-64 normal-case" label="KPO Targets" />
				</Tabs>
      }
      content={
        <div className=" sm:p-24 ">
          {tabValue === 0 && (<EditEmployeeKpoContent customHook={customHook}/>)}
          {tabValue === 1 && (
            <>
              <KpoContentTarget customHook={customHook} />
            </>
          )}
        </div>
      }
    />
  );
};
withReducer('kpoCategory', kpoCategoryReducer)(EmployeeKpoContentDetails);
export default withReducer('kpo', reducer)(EmployeeKpoContentDetails);