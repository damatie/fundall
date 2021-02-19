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
import { useHistory } from 'react-router-dom';

const BehaviouralAttribute = () => {

  const dispatch = useDispatch();
  const push = useHistory();
  const state = useSelector(state => state.behaviouralAttribute);
  const customHook = useBehaviouralAttribute(state, dispatch);

  React.useEffect(() => {
    dispatch(getAllBehaviouralAttribute({
      offset: 0,
      limit: 10
    }));
  }, []);
  return (
    <PageLayout
      button={{
        showButton: true,
        btnTitle: 'Create',
        onClick: customHook.handleOpen,
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
                <BehaviouralAttributeTable handleDelete={customHook.handleDelete} state={state} push={push}/>
                <BehaviouralAttributeModal customHook={customHook} state={state}/>
              </>
            )
          }
        </div>
      }
    />
  );
};

export default withReducer('behaviouralAttribute', reducer)(BehaviouralAttribute);