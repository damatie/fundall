
export const formateDate = value => {
  if(value !== 'never')return new Date(value).toISOString().substr(0, 10);
};