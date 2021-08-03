import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const RadioComponent = (props) => {
  const {
    checked, onChange, name, id, color, label, className, refs
  } = props;
  return (
    <FormControlLabel
      className={className}
      control={<Radio {...props} checked={checked} onChange={onChange} id={id} refs={refs} name={name} color={color || 'secondary'} />}
      label={label}
    />
  );
};
export default RadioComponent;
