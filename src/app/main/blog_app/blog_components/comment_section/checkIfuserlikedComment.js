export const checkIfUserLikedComment = data => {
  const id = JSON.parse(localStorage.getItem('user_data'));
  if(data) {
    for(const i of data) {
      if(i.employeeId === id.id) {
        return true;
      } else {
        return false;
      }
    }
  }

};