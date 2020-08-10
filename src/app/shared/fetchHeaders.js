import { useAuth } from "app/hooks/useAuth"

export const fetchHeaders = () => {
  
  const token = useAuth;

  // authorization
  const auth = {
    Authorization: `JWT ${token().getToken}`
  }
  
  // get request header
  const getRegHeader = () => {
    return {
      headers: {
        ...auth
      }
    };
  };

  // delete request header
  const delHeader = () => {
    return {
      method: 'delete',
      headers: {
        ...auth,
      },
    }
  }

  // post, put, patch request header
  const reqHeader = (method, body) => {
    if(body !== ''){
      return {
        method: method,
        headers: {
          ...auth,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      };
    }else{
      return {
        method: method,
        headers: {
          ...auth,
          'Content-type': 'application/json'
        }
      };
    }
  };

  const fdHeader = (method, body) => {
    return {
      method: method,
      headers: {
        ...auth,
      },
      body: body
    };
  };


  // returns functions
  return {
    getRegHeader,
    reqHeader,
    fdHeader,
    delHeader
  };

};