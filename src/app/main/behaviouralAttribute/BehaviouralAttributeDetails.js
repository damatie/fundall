import React from 'react';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import UpdateBehaviouralAttribute from './components/UpdateBehaviouralAttribute';
import BehaviouralAttributeContent from './components/BehaviouralAttributeContent';

const BehaviouralAttributeDetails = () => {
  const [tabValue, setTabValue] = React.useState(0);
  
  function handleChangeTab(event, value) {
		setTabValue(value);
  }

  return (
    <PageLayout
      button={{
        showButton: true,
        btnTitle: 'Create',
        onClick: () => null,
      }}
      header={{
        title: 'Behavioural Attribute Content',
        handleSearch: (ev) => console.log(ev)
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
        <Tab className="h-64 normal-case" label="Behavioural Attribute Details" />
        <Tab className="h-64 normal-case" label="Behavioural Attribute Content" />
      </Tabs>
      }
      content={
        <div className='p-24'>
          {tabValue === 0 && (<UpdateBehaviouralAttribute/> )}
          {tabValue === 1 && (
            <>
              <BehaviouralAttributeContent/>
            </>
          )}
        </div>
      }
    />
  );
};

export default withReducer('behaviouralAttributeDetails', null)(BehaviouralAttributeDetails);