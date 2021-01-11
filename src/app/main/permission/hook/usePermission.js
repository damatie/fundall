import React from 'react';
import * as Actions from '../store/actions';


function removeDuplicates(a, b) {

  b = b.filter( function( item ) {
      for( var i=0, len=a.length; i<len; i++ ){
          if( a[i].name == item.name ) {
              return false;
          }
      }
      return true;
  });
  return b;
}

const usePermission = ({dispatch, state}) => {
  const [initialEndpoint, setInitialEndpoint] = React.useState([]);
  const [submitValue, setSubmitValue] = React.useState({});

  const updateWithCurrentPermissions = (endpoints) => {
    const currentEndpoints = [];
    const convertObj = Object.entries(state.permissions?.endpoints || {});
    if(convertObj.length !== 0) {
      for(const i of endpoints) {
        for(const [key, value] of convertObj) {
          if(i.path === key) {
            currentEndpoints.push({
              ...i,
              methods: value
            });
          }
        }
        
      };
      return [...currentEndpoints, ...removeDuplicates(currentEndpoints, endpoints)];
    } else {
      return endpoints;
    }
  };

  const getInitialEndpoint = (endpoints) => {
    setInitialEndpoint((prevState) => [...prevState, endpoints])
  };

  const updateEndpoints = (state, checked, method) => {
    initialEndpoint.forEach((item, index, current) => {
      switch(checked) {
        case true:
          if(item.name === state.name) {
            current.splice(current.indexOf(item), 1);
            setInitialEndpoint([
              ...current,
              {
                ...state,
                methods: [...item.methods, method]
              }
            ])
          }
          return;
        case false:
          if(item.name === state.name) {
            current.splice(current.indexOf(item), 1);
            setInitialEndpoint([
              ...current,
              {
                ...state,
                methods: item.methods.filter(item => item !== method)
              }
            ])
          }
          return;
        default:
          return null;
      }
      
    })
  };

  const updateInitialEndpoint = (state) => (ev) => {
    switch(ev.target.name) {
      case 'get':
        updateEndpoints(state, ev.target.checked, 'GET');
        break;
      case 'post':
        updateEndpoints(state, ev.target.checked, 'POST');
        break;
      case 'patch':
        updateEndpoints(state, ev.target.checked, 'PATCH');
        break;
      case 'delete':
        updateEndpoints(state, ev.target.checked, 'DELETE');
        break;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    let endpoints = {};
    initialEndpoint.map((item) => {
      // if(item.methods.length !== 0) {
        endpoints = {
          ...endpoints,
          [item.path]: item.methods
        }
      // }
    });
    setSubmitValue(endpoints);
    if(Object.entries(state.permissions).length === 0) {
      dispatch(Actions.submitRolePermission({
        id: state.id,
        payload: {
          roleId: state.id,
          endpoints, 
        }
      }))
    } else {
      dispatch(Actions.updateRolePermission({
        id: state.permissions.id,
        payload: {
          roleId: state.id,
          endpoints, 
        }
      }))
    }
  };

  const handleClickTab = (role) => () => {
    dispatch({
      type: Actions.ROLE_ID,
      payload: role.id
    });
    dispatch(Actions.getAllRolePermissions(role.id));
  };

  const includesCharacter = (name, char) => {
    return name.toUpperCase().includes(char.toUpperCase());
  }
  const methodsType = (name) => {
    if(includesCharacter(name, 'view') && includesCharacter(name, 'add')) {
      return [
        {
          name: 'get',
          label: 'Can View'
        },
        {
          name: 'post',
          label: 'Can Add'
        },
      ];
    } else if((includesCharacter(name, 'update') && includesCharacter(name, 'delete'))) {
      return [
        {
          name: 'patch',
          label: 'Can Edit'
        },
        {
          name: 'delete',
          label: 'Can Delete'
        }
      ]
    } else {
      return [
        {
          name: 'get',
          label: 'Can View'
        },
        {
          name: 'post',
          label: 'Can Add'
        },
        {
          name: 'patch',
          label: 'Can Edit'
        },
        {
          name: 'delete',
          label: 'Can Delete'
        }
      ]
    }
  }

  return {
    updateWithCurrentPermissions,
    getInitialEndpoint,
    updateInitialEndpoint,
    handleSubmit,
    handleClickTab,
    submitValue,
    initialEndpoint,
    methodsType
  };
};

export default usePermission;