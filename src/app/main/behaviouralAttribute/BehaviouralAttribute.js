import React from 'react';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import BehaviouralAttributeTable from './components/BehaviouralAttributeTable';
import BehaviouralAttributeModal from './components/BehaviouralAttributeModal';

const BehaviouralAttribute = () => {
  return (
    <PageLayout
      button={{
        showButton: true,
        btnTitle: 'Create',
        onClick: () => null,
      }}
      header={{
        title: 'Behavioural Attribute',
        handleSearch: (ev) => console.log(ev)
      }}
      content={
        <div className='p-24'>
          <BehaviouralAttributeTable/>
          <BehaviouralAttributeModal />
        </div>
      }
    />
  );
};

export default withReducer('behaviouralAttribute', null)(BehaviouralAttribute);