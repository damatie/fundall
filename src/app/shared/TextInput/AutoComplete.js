import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({

}));

const AutoCompleteInput = ({ data, inputs, handleChange, value, setInput }) => {
  return (
    <Autocomplete
      freeSolo
      // disabled={!edit}
      defaultValue={!value ? '' : value}
      getOptionLabel={(option) => option.name}
      options={
        data
      }
      onChange={(ev, values) => {
        if(setInput && values) {
          setInput(values.id);
        }
      }}
      renderInput={params => (
        <TextField
          {...params}
          // disabled={!edit}
          // value={selected.accuserName}
          label={inputs.label}
          margin="normal"
          variant="outlined"
          required
        />
      )}
    />
  );
};

export default AutoCompleteInput;