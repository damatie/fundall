export const useAuth = () => {
  const auth = localStorage.getItem('jwt_access_token');
  let token = ''
  if(auth) {
    token = auth;
  } else {
    token = '';
  }
  const getToken = () => {
    return token;
  }

  return {
    getToken: getToken(),
  }
}