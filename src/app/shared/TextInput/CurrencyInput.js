import NumberFormat from 'react-number-format';
import React, { useEffect, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="₦"
    />
  );
};

const CurrencyInput = (props) => {
  let { handleChange, className, values, name, label, error, helperText, disabled } = props;

  return useMemo(() =>
  (
    <TextField
      className={className}
      label={label}
      value={String(values)}
      error={error}
      helperText={helperText}
      onChange={handleChange}
      name={name}
      variant='outlined'
      style={{ width: '100%' }}
      id="formatted-numberformat-input"
      required
      disabled={disabled ? disabled : false}
      InputProps={{
        inputComponent: NumberFormatCustom,
        endAdornment: (
          <InputAdornment position="end">
            <Icon className="text-20" color="action">
              money
            </Icon>
          </InputAdornment>
        )
      }}
    />
  )
    , [values, error, disabled, name, className])
};

export default CurrencyInput;