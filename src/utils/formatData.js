export const formatDataList = (data) => {
  const arr = [];
  for (const i of data) {
    arr.push(
      {
        id: i.id,
        name: `${i.firstName} ${i.lastName} (${i.role.name})`,
      }
    );
  };
  return arr;
}