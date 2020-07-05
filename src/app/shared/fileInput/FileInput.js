import React from 'react';
import TextField from '@material-ui/core/TextField';

const FileInput = ({ onChange }) => {
  return (
    <div>
      <TextField
        accept="image/*"
        id="outlined-secondary"
        type="file"
        variant="outlined"
        onChange={onchange}
      />
    </div>
  );
};

export default FileInput;