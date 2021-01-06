import React from 'react';

const usePermission = ({dispatch, state}) => {
  const [initialEndpoint, setInitialEndpoint] = React.useState([]);

  const updateWithCurrentPermissions = (endpoints) => {
    const currentEndpoints = [];
    const defaultEndpoints = [];
    const convertObj = Object.entries(state);
    for(const i of endpoints) {
      for(const [key, value] of convertObj) {
        if(i.path === key) {
          currentEndpoints.push({
            ...i,
            methods: value
          });
        } else {
          defaultEndpoints.push(i);
        }
      }
    }
    return [...currentEndpoints, ...defaultEndpoints];
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
    let value = {};
    initialEndpoint.map((item) => {
      if(item.methods.length !== 0) {
        value = {
          ...value,
          [item.path]: item.methods
        }
      }
    });
    console.log(value);
  };

  return {
    updateWithCurrentPermissions,
    getInitialEndpoint,
    updateInitialEndpoint,
    handleSubmit
  };
};

export default usePermission;