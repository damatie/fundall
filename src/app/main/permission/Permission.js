import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import VerticalTabs from './components/VerticalTab';
import endpoints from './endpoints';
import Typography from '@material-ui/core/Typography'
import PermissionList from './components/PermissionList';
import usePermission from './hook/usePermission';
import Button from '@material-ui/core/Button';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers/permission.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRoles, getAllRolePermissions } from './store/actions';

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
          // loading={loading}
        >
          <>
          {
            state.loadingPermission ? (
              <>Loading...</>
            ) : 
            endpoints.map((item) => (
              <section key={item.id}>
              <Typography variant="h6" className='font-semibold' color="initial">{item.name}</Typography>
              {
                updateWithCurrentPermissions(item.endpoints)?.map((result, index, current) => {
                  return (
                    <PermissionList endpointFor={result} key={result.name} handleClick={updateInitialEndpoint} getInitialEndpoint={getInitialEndpoint}/>
                  );
                })
              }
              </section>
            ))
          }
          <Button variant="contained" color="primary" className='text-white my-8' onClick={handleSubmit}>
            Submit
          </Button>
          </>
        </VerticalTabs>
        </section>
        
      }
    />
  );
};

export default withReducer('permissions', reducer)(Permission);