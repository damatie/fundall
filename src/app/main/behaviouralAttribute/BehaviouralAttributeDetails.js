import React from 'react';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import UpdateBehaviouralAttribute from './components/UpdateBehaviouralAttribute';
import BehaviouralAttributeContent from './components/BehaviouralAttributeContent';
import BehaviouralAttributeContentModal from './components/BehaviouralAttributeContentModal';
import reducer from './store/reducer/behaviouralContent.reducer';
import { getAllBehaviouralContent } from './store/actions';
import { useParams } from 'react-router';
import useBehaviouralAttribute from './hooks/useBehaviouralAttribute';
import useBehaviouralContent from './hooks/useBehaviouralContent';

const BehaviouralAttributeDetails = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector(state => state.behaviouralAttributeContent);

  const header = useBehaviouralAttribute(state, dispatch);
  const content = useBehaviouralContent(state, dispatch);
  
  function handleChangeTab(event, value) {
		setTabValue(value);
  }
  
  React.useEffect(() => {
    dispatch(getAllBehaviouralContent({
      id
    }))
  }, []);

  return (
    <PageLayout
      button={{
        showButton: tabValue === 1,
        btnTitle: 'Create',
        onClick: content.handleOpen,
      }}
      noSearch={tabValue !== 1}
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
          {
            state.loading ? (
              <Skeleton variant="rect" width='100%' height={400} animation="wave"/>
            ) : (
              <>
              {tabValue === 0 && (<UpdateBehaviouralAttribute customHook={header}/> )}
          {tabValue === 1 && (
            <>
              <BehaviouralAttributeContent customHook={content}data={state.data}/>
              <BehaviouralAttributeContentModal customHook={content} state={state}/>
            </>
          )}
          </>
            )
          }
          
        </div>
      }
    />
  );
};
export default withReducer('behaviouralAttributeContent', reducer)(BehaviouralAttributeDetails);