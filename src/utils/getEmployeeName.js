const getEmployeeName = (data, id) => {
  for(const i of data) {
    if(i.id === id) {
      return `${i.firstName} ${i.lastName}`;
    }
  };
};


export default getEmployeeName;