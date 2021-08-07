import React, { useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
// import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-input-2/lib/material.css';

const PhoneNumberInput = (props) => {
  const { country, value, onChange, className, setError, placeholder, disabled, enableAreaCodes } = props;

  return (
    <PhoneInput
      {...props}
      country={country && country.toLowerCase()}
      value={value}
      onChange={onChange}
      containerClass={className || 'w-full'}
      inputClass={className || 'w-full'}
      enableAreaCodes={enableAreaCodes || true}
      enableSearch
      inputProps={{
        required: true,
      }}
      disabled={disabled}
      specialLabel={placeholder}
      // specialLabel={placeholder ? placeholder : "Phone"}
      defaultErrorMessage='Phone number'
      isValid={(value, country) => {
        if ((value.length > 15) && value.length !== 3) {
          if (setError) {
            setError(true);
          }
          return 'Invalid Phone number: +' + value + ', ' + country.name
        } else {
          if (setError) {
            setError(false);
          }
          return true;
        }
      }}
    />
  );
};

export default PhoneNumberInput;