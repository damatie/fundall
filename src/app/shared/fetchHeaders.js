import { useAuth } from "app/hooks/useAuth"

export const fetchHeaders = () => {
  
  const token = useAuth;

  const auth = {
    Authorization: `JWT ${token().getToken}`
  }
  

  const getRegHeader = () => {
    return {
      headers: {
        ...auth
      }
    };
  };

  const delHeader = () => {
    return {
      method: 'delete',
      headers: {
        ...auth,
      },
    }
  }

  const reqHeader = (method, body) => {
    return {
      method: method,
      headers: {
        ...auth,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    };
  };

  return {
    getRegHeader,
    reqHeader,
    delHeader
  };

};