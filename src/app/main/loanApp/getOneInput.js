export const getOneInput = (inputs, name) => {
  for (const i of inputs) {
    if(i.name === name) {
      return i;
    }
  }
};