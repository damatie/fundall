import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';

const SelectTextField = (props) => {
  const {
    error,
    color,
    children,
    variant,
    onBlur,
    message,
    value,
    name,
    onChange,
    label,
    size,
    className,
    refs,
  } = props;
  return (
    <FormControl variant={variant || 'outlined'} size={size || 'medium'} className={`w-full ${className}`}>
      <InputLabel error={error} id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId={`${name}-id`}
        id={name}
        color={color || 'secondary'}
        label={label}
        variant={variant || 'outlined'}
        error={!!error}
        ref={refs}
        name={name}
        onChange={onChange}
        defaultValue={value}
        onBlur={onBlur}
        {...props}
      >
        {children}
      </Select>
      <FormHelperText error={error}>{message}</FormHelperText>
    </FormControl>
  );
};

export default SelectTextField;