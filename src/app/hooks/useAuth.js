export const useAuth = () => {
  const auth = localStorage.getItem('jwt_access_token');
  const id = localStorage.getItem('user_data');
  let token = '';
  let userId = '';
  if(auth) {
    token = auth;
  } else {
    token = '';
  }
  if(id) {
    userId = JSON.parse(id);
  } else {
    userId = '';
  }
  const getToken = () => {
    return token;
  }
  const getId = () => {
    return userId.id;
  }

  return {
    getToken: getToken(),
    getId: getId(),
  };
};