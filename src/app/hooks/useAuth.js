export const useAuth = item => {
  const auth = localStorage.getItem('jwt_access_token');
  const data = localStorage.getItem('user_data');
  let token = '';
  let userData = '';
  if(auth) {
    token = JSON.parse(auth);
  } else {
    token = '';
  }
  if(data) {
    userData = JSON.parse(data);
  } else {
    userData = '';
  }

  const setItems = itemName => {
    localStorage.setItem(itemName, item)
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

  const getUserDetails = () => {
    return userData.data
  }

  return {
    getToken: getToken(),
    getId: getId(),
    getUserData: getUserData(),
    getUserDetails: getUserDetails()
  };
};