import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Cancel from '@material-ui/icons/CancelRounded';
import IconButton from '@material-ui/core/IconButton';

const RenameFolder = (props) => {

  return (
    <TextField
      name={props.name}
      label={props.label}
      className='my-16'
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      rows={props.multiline && 4}
      multiline={props.multiline && true}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={ev => {props.onClick()}}
              edge="end"
            >
              <Cancel/>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default RenameFolder;