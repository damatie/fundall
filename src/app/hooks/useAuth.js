export const useAuth = () => {
  const auth = localStorage.getItem('jwt_access_token');
  const data = localStorage.getItem('user_data');
  let token = '';
  let userData = '';
  if(auth) {
    token = auth;
  } else {
    token = '';
  }
  if(data) {
    userData = JSON.parse(data);
  } else {
    userData = '';
  }
  const getToken = () => {
    return token;
  }
  const getId = () => {
    return userData.id;
  }
  const getUserData = () => {
    return userData
  }

  return {
    getToken: getToken(),
    getId: getId(),
    getUserData: getUserData()
  };
};