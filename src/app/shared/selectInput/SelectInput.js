import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {
  SelectFormsy
} from '@fuse/core/formsy';


const SelectFormsys = ({ value, name, label, validationError, validations, options, variant }) => {

  return (
    <SelectFormsy
      className="mb-16 w-full"
      name={name}
      variant={variant}
      label={label}
      value={value}
      validations={validations}
      validationError={validationError}
    >
      {
        options.map(option => (
          <MenuItem value={value}>
            {option}
          </MenuItem>
        ))
      }
    </SelectFormsy>
  );
};

export default SelectFormsys;
