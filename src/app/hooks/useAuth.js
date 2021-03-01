export const useAuth = item => {
  const auth = localStorage.getItem('jwt_access_token');
  const data = localStorage.getItem('user_data');
  const profile = localStorage.getItem('user_profile');

  let token = '';
  let userData = '';
  let userProfile = '';

  if (auth) {
    token = JSON.parse(auth);
  } else {
    token = '';
  }
  if (data) {
    userData = JSON.parse(data);
  } else {
    userData = '';
  }

  if (profile) {
    // userProfile = JSON.parse(profile);
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
  const getUserProfile = () => {
    return userProfile
  }

  const getUserDetails = () => {
    return userData.data
  }

  return {
    getToken: getToken(),
    getId: getId(),
    getUserData: getUserData(),
    getUserDetails: getUserDetails(),
    getUserProfile: getUserProfile()
  };
};