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

const EmployeeKpoDetails = () => {

  const [tabValue, setTabValue] = React.useState(0);
  
  function handleChangeTab(event, value) {
		setTabValue(value);
  }

  const { handleOpenModal } = useKpoContentList();
  
  return (
    <PageLayout
      noSearch={tabValue === 1 ? false : true}
      header={{
        icon: '',
        title: 'KPO Details',
        handleSearch: ({target: { value }}) => console.log(value),
      }}
      button={{
        showButton: tabValue === 1 && true,
        btnTitle: 'Add KPO Content',
        onClick: handleOpenModal
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
          <Tab className="h-64 normal-case" label="Personal Improvement" />
				</Tabs>
      }
      content={
        <div className=" sm:p-24 ">
          {tabValue === 0 && (<EditEmployeeKpo/>)}
          {tabValue === 1 && (
            <>
              <KpoContentList />
              <CreateKpoContent />
            </>
          )}
          {tabValue === 2 && (<KpoComments />)}
          {tabValue === 3 && (<KpoContentPipScore />)}
          {tabValue === 4 && (<KpoComments />)}
          {tabValue === 5 && (<KpoComments />)}
        </div>
      }
    />
  );
};

withReducer('kpoCategory', kpoCategoryReducer)(EmployeeKpoDetails);
export default withReducer('kpo', reducer )(EmployeeKpoDetails);