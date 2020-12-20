import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';

const SelectTextField = React.forwardRef((props, ref) => {
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
    register
  } = props;
  return (
      <FormControl variant={variant || 'outlined'} size={size || 'medium'} className={`w-full my-10`}>
      <InputLabel error={error} id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId={`${name}-id`}
        id={name}
        color={color || 'secondary'}
        label={label}
        variant={variant || 'outlined'}
        error={!!error}
        ref={register || ref}
        name={name}
        onChange={onChange}
        defaultValue={value}
        onBlur={onBlur}
        inputRef={register}
        {...props}
      >
        {children}
      </Select>
      <FormHelperText error={error}>{message}</FormHelperText>
    </FormControl>
  );
});

export default SelectTextField;
