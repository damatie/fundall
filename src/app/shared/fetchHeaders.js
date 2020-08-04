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
    return {
      method: method,
      headers: {
        ...auth,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    };
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

  // post, put, patch formdata request header
  const formDHeader = (method, body) => {
    const formData = new FormData();
    const entries = Object.entries(body)
    for(const [key, value] of entries) {
      formData.append(key, value);
    }
    return {
      method: method,
      headers: {
        ...auth,
      },
      body: formData
    };
  }


  // returns functions
  return {
    getRegHeader,
    reqHeader,
    fdHeader,
    delHeader,
    formDHeader
  };

};