import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({

}));

const AutoCompleteInput = ({ data, inputs, label, handleChange, value, setInput, onChange, error, helperText, name, className, disabled}) => {
  return (
    <Autocomplete
      freeSolo
      disabled={disabled}
      defaultValue={!value ? '' : value}
      getOptionLabel={(option) => option.name}
      options={
        data
      }
      onChange={(ev, values) => {
        if(!onChange) {
          if(setInput && values) {
            setInput(values.id);
          }
        } else {
          onChange(ev, values);
        }
        
      }}
      name={name}
      className={className}
      renderInput={params => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          // disabled={!edit}
          // value={selected.accuserName}
          label={inputs?.label || label}
          margin="normal"
          variant="outlined"
          required
          name={name}
        />
      )}
    />
  );
};

export default AutoCompleteInput;