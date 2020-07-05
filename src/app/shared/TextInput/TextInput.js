import React from 'react';
import TextField from '@material-ui/core/TextField';

export const InputField = ({options, handleChange}) => {
  return (
    <TextField
    id={options.name}
    label={options.label}
    variant={options.variant}
    onChange={handleChange}
    placeholder={options.placeholder}
    color="primary"
    type={options.type}
    size={options.size}
    defaultValue={options.value}
    error={options.error !== 'required' && options.error !== undefined}
    helperText={options.error}
    style={{ width: '100%'}}
  />
  );
};