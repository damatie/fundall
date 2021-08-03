import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxComponent = (props) => {
  const {
    checked, onChange, name, id, color, label, className, refs
  } = props;
  return (
    <FormControlLabel
      className={className}
      control={<Checkbox {...props} checked={checked} onChange={onChange} id={id} refs={refs} name={name} color={color || 'secondary'} />}
      label={label}
    />
  );
};
export default CheckboxComponent;
