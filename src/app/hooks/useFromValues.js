import React from 'react';

export const useFormValues = () => {
  const [values, setInputs] = React.useState([]);
  const [inputs, setValues] = React.useState([]);

  React.useEffect(() => {
    const arr = [];
    for (const i of values) {
      arr.push(i.props);
    };
    setValues(arr);
  }, [values]);

  return { inputs, setInputs };
};