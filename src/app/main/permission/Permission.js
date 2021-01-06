import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import VerticalTabs from './components/VerticalTab';
import endpoints from './endpoints';
import Typography from '@material-ui/core/Typography'
import PermissionList from './components/PermissionList';
import usePermission from './hook/usePermission';
import Button from '@material-ui/core/Button'
const state = {
  '/loans': ['GET']
}
const Permission = () => {
  const [index, setIndex] = React.useState(0);
  const { 
    updateWithCurrentPermissions, 
    getInitialEndpoint,
    updateInitialEndpoint,
    handleSubmit
  } = usePermission({state})
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
          handleChange={(role) => () => console.log(role)}
          roles={[
            {
              name: 'HR',
              id: 1
            },
            {
              name: 'Line Manager',
              id: 2
            },
            {
              name: 'Finance Manager',
              id: 3
            },
            {
              name: 'Employee',
              id: 4
            }
          ]}
          handleClick={(ev, value) => setIndex(value)}
          index={index}
        >
          <>
          {
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
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
          </Button>
          </>
        </VerticalTabs>
        </section>
        
      }
    />
  );
};

export default Permission;