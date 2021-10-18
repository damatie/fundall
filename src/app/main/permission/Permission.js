import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
import VerticalTabs from './components/VerticalTab';
import endpoints from './endpoints';
import usePermission from './hook/usePermission';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers/permission.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRoles, getAllMenus } from './store/actions';
import PermissionsContainer from './components/PermissionsContainer';

const Permission = () => {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const state = useSelector(({permissions}) => permissions);
  
  React.useEffect(() => {
    dispatch(getAllRoles());
    dispatch(getAllMenus());
  }, [dispatch]);


  const handleChange = (val) => {
    setValue(val);
  }

  const {
    handleSubmit,
    handleClickTab,
    role,
    payload,
    setPayload
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
            handleClick={(event, newValue) => handleChange(newValue)}
            value={value}
            loading={state.loadingRoles}
          >
            {
              state.roles && state.roles.map((r, ind) => {
                return (
                  <PermissionsContainer
                    value={value} 
                    index={ind}
                    state={state}
                    role={(Object.keys(role).length > 0) ? role : state.roles[0]}
                    data={state.data}
                    setPayload={setPayload}
                    payload={payload}
                    handleSubmit={handleSubmit}
                  />
                )
              })
            }
        </VerticalTabs>
        </section>
        
      }
    />
  );
};

export default withReducer('permissions', reducer)(Permission);