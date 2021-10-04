import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-input-2/lib/material.css';

const PhoneNumberInputField = (props) => {
  const [validState, setValidState] = React.useState(true);
  const { country, value, name, setError, register, label, disabled } = props;

  return (
    <PhoneInput
        country={'NG'}
        value={value}
        // containerClass={className || 'w-full'}
        // inputClass={className || 'w-full'}
        disabled={disabled}
        specialLabel={label}
        onChange={e => {
            register({
            name: name,
            value: e
            })
            if (e === '234') {
            // setError(true);
                setValidState(false)
            }
            onChange(e)
      }}
      containerClass='w-full'
      inputClass='w-full'
      inputStyle={{ width: '100%' }}
      enableAreaCodes
      enableSearch
      inputProps={{
        required: true
      }}
      {...props}
      defaultErrorMessage='Phone number'
      isValid={(value, country) => {

        if (!isValidPhoneNumber(`+${value}`) && value !== '234') {
          if (setError) {
            setError(true);
          }
          // console.log('value: ', value);
          return 'Invalid Phone number: +' + value + ', ' + country.name
        } else {
          if (value !== '234') {
            if (setError) {
              setError(false);
            }
            return true;
            // if (validState) {
            // } else {
            //   return false
            // }
          } else {
            if (setError) {
              setError(false);
            }
            if (validState) {
              return true;
            } else {
              return false
            }
          }
        }
      }}
    />
  );
};

export default PhoneNumberInputField;