import NumberFormat from 'react-number-format';
import React from 'react';
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
  const {handleChange, className, values, name, label, error, helperText, disabled } = props;

  return (
    <TextField
      className={className}
      label={label}
      defaultValue={values}
      error={error}
      helperText={helperText}
      onChange={handleChange}
      name={name}
      variant='outlined'
      style={{width: '100%'}}
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
};

export default CurrencyInput;