export const useAuth = item => {
  const auth = localStorage.getItem('jwt_access_token');
  const id = localStorage.getItem('user_data');
  let token = '';
  let userId = '';
  if(auth) {
    token = JSON.parse(auth);
  } else {
    token = '';
  }

  if(id) {
    userId = JSON.parse(id);
  } else {
    userId = '';
  }

  const setItems = itemName => {
    localStorage.setItem(itemName, item)
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
    setItems: setItems,
  };
};