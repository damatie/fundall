import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { useState, memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React from 'react';

const Input = memo((props) => {
  const {
    name,
    error,
    message,
    onChange,
    label,
    variant,
    value,
    type,
    size,
    className,
    onBlur,
    refs,
    color,
    multiline,
    placeholder,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const toggleType = () => {
    return showPassword ? 'text' : 'password';
  };

  return (
    <TextField
      {...props}
      className={clsx('w-full', className)}
      size={size || 'medium'}
      color={color || 'secondary'}
      type={type === 'password' ? toggleType() : type}
      id={name}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      variant={variant || 'outlined'}
      helperText={message}
      onBlur={onBlur}
      inputRef={refs}
      rows={multiline && 4}
      multiline={multiline && true}
      placeholder={placeholder}
      InputProps={type === 'password' ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : null}
    />
  );
});

export default Input;
