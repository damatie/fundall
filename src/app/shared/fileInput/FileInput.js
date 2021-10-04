import React from 'react';
import TextField from '@material-ui/core/TextField';

const FileInput = ({id, onChange, className, label, accept }) => {
  return (
    <div>
      <TextField
        accept={accept}
        id={id}
        className={className}
        type="file"
        label={label}
        variant="outlined"
        onChange={onChange}
      />
    </div>
  );
};

export default FileInput;