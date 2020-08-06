export const useAuth = item => {
  
  // const id = localStorage.getItem('user_data');
  // let token = '';
  // let userId = '';
  // if(auth) {
  //   token = 
  // } else {
  //   token = '';
  // }

  // if(id) {
  //   userId = JSON.parse(id);
  // } else {
  //   userId = '';
  // }

  const setItems = itemName => {
    localStorage.setItem(itemName, item)
  }
  const getToken = () => {
    const auth = localStorage.getItem('jwt_access_token');
    let token = JSON.parse(auth);
    return token;
  }
  const getId = () => {
    const id = localStorage.getItem('user_data');
    let userId = JSON.parse(id);
    return userId.id;
  }

  return {
    getToken: getToken(),
    getId: getId(),
    setItems: setItems,
  };
};