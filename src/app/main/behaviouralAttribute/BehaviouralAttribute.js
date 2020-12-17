import React from 'react';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import BehaviouralAttributeTable from './components/BehaviouralAttributeTable';
import BehaviouralAttributeModal from './components/BehaviouralAttributeModal';
import { getAllBehaviouralAttribute } from './store/actions';
import reducer from './store/reducer/behavioural.reducer';
import useBehaviouralAttribute from './hooks/useBehaviouralAttribute';

const BehaviouralAttribute = () => {

  const dispatch = useDispatch();
  const state = useSelector(state => state.behaviouralAttribute);
  const { handleOpen } = useBehaviouralAttribute(state)
  React.useEffect(() => {
    dispatch(getAllBehaviouralAttribute());
  }, []);
  return (
    <PageLayout
      button={{
        showButton: true,
        btnTitle: 'Create',
        onClick: handleOpen,
      }}
      header={{
        title: 'Behavioural Attribute',
        handleSearch: (ev) => console.log(ev)
      }}
      content={
        <div className='p-24'>
          {
            state.loading ? (
              <Skeleton variant="rect" width='100%' height={400} animation="wave"/>
            ): (
              <>
                <BehaviouralAttributeTable/>
                <BehaviouralAttributeModal />
              </>
            )
          }
        </div>
      }
    />
  );
};

export default withReducer('behaviouralAttribute', reducer)(BehaviouralAttribute);