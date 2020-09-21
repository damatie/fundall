export const formatDataList = (data, role) => {
  const arr = [];
  for (const i of data) {
    if(role) {
      if(i.role.name == role) {
        arr.push(
          {
            id: i.id,
            name: `${i.firstName} ${i.lastName} (${i.role.name})`,
          }
        );
      }
    } else {
      arr.push(
        {
          id: i.id,
          name: `${i.firstName} ${i.lastName} (${i.role.name})`,
        }
      );
    }
    
  };
  return arr;
}