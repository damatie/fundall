{/* <FormControl variant="outlined" style={{ width: '100%', margin: '8px 0px' }} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Company Type</InputLabel>
                <Select
                  justify='left'
                  align='left'
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name='timeZone'
                  error={errors.companyType}
                  message={errors.companyType?.message}
                  onChange={handleCompanyTypeChange}
                  label="Time Zone"
                >
                  {companyTypes.map(item => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.label}
                  </MenuItem>))}
                </Select>
                <FormHelperText style={{ color: 'red'}}>{companyTypeErr}</FormHelperText>
              </FormControl>


import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';

const SelectField = React.forwardRef((props, ref) => {
  const {
    error,
    color,
    children,
    variant,
    onBlur,
    message,
    value,
    name,
    onChange,
    label,
    size,
    className,
    refs,
    register
  } = props;
  return (
      <FormControl variant={variant || 'outlined'} size={size || 'medium'} className={`w-full`}>
      <InputLabel error={error} id="demo-simple-select-outlined-label">{label}</InputLabel>
      <Select
        labelId={`${name}-id`}
        id={name}
        color={color || 'secondary'}
        label={label}
        variant={variant || 'outlined'}
        error={!!error}
        ref={register || ref}
        name={name}
        onChange={onChange}
        value={value}
        // defaultValue={value}
        onBlur={onBlur}
        inputRef={register}
        {...props}
      >
        {children}
      </Select>
      <FormHelperText error={error}>{message}</FormHelperText>
    </FormControl>
  );
});

export default SelectField; */}
