
export const desSort = (data) => {
  return data.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}