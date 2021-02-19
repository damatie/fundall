import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import VerticalTabs from './components/VerticalTab';
import endpoints from './endpoints';
import usePermission from './hook/usePermission';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers/permission.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRoles, getAllRolePermissions } from './store/actions';
import PermissionsContainer from './components/PermissionsContainer';

const Permission = () => {
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();
  const state = useSelector(state => state.permissions);
  React.useEffect(() => {
    dispatch(getAllRoles(true));
  }, []);

  React.useEffect(() => {
    if(state.id !== '') {
      dispatch(getAllRolePermissions(state.id));
    }
  }, [state.id]);

  const { 
    updateWithCurrentPermissions, 
    getInitialEndpoint,
    updateInitialEndpoint,
    handleSubmit,
    handleClickTab,
    methodsType
  } = usePermission({state, dispatch});

  return (
    <PageLayout
      header={{
        title: 'Roles and Permission',
        icon: ''
      }}
      noSearch
      button={{
        showButton: false
      }}
      content={
        <section className='p-12'>
          <VerticalTabs
          handleChange={handleClickTab}
          roles={state.roles}
          handleClick={(ev, value) => setIndex(value)}
          index={index}
          loading={state.loading}
        >
          <PermissionsContainer
            state={state}
            endpoints={endpoints}
            permissions={{
              updateWithCurrentPermissions,
              updateInitialEndpoint,
              getInitialEndpoint,
              methodsType
            }}
            handleSubmit={handleSubmit}
          />
        </VerticalTabs>
        </section>
        
      }
    />
  );
};

export default withReducer('permissions', reducer)(Permission);