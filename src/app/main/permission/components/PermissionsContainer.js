import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import PermissionList from './PermissionList';

const PermissionsContainer = ({
  state,
  endpoints,
  permissions: {
    updateWithCurrentPermissions,
    updateInitialEndpoint,
    getInitialEndpoint
  },
  handleSubmit
}) => {
  return (
    <>
      {
        state.loadingPermission ? (
          <Skeleton variant="rect" width='100%' height="70%" animation="wave" />
        ) :
          endpoints.map((item) => (
            <section key={item.id}>
              <Typography variant="h6" className='font-semibold' color="initial">{item.name}</Typography>
              {
                updateWithCurrentPermissions(item.endpoints)?.map((result) => {
                  return (
                    <PermissionList endpointFor={result} key={result.name} handleClick={updateInitialEndpoint} getInitialEndpoint={getInitialEndpoint} />
                  );
                })
              }
            </section>
          ))
      }
      <Button variant="contained" color="primary" className='text-white my-8' onClick={handleSubmit}>
        Save
      </Button>
    </>
  );
};

export default PermissionsContainer;