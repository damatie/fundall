import { useAuth } from "app/hooks/useAuth"

export const fetchHeaders = () => {
  
  const token = useAuth;
  
  // get request header
  const getRegHeader = () => {
    return {
      headers: {
        Authorization: `JWT ${token().getToken}`
      }
    };
  };

  // delete request header
  const delHeader = () => {
    return {
      method: 'delete',
      headers: {
        Authorization: `JWT ${token().getToken}`
      },
    }
  }

  // post, put, patch request header
  const reqHeader = (method, body) => {
    if(body !== ''){
      return {
        method: method,
        headers: {
          Authorization: `JWT ${token().getToken}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      };
    }else{
      return {
        method: method,
        headers: {
          Authorization: `JWT ${token().getToken}`,
          'Content-type': 'application/json'
        }
      };
    }
  };

  const fdHeader = (method, body) => {
    return {
      method: method,
      headers: {
        Authorization: `JWT ${token().getToken}`,
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
        Authorization: `JWT ${token().getToken}`,
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