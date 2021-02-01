import React, { useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-input-2/lib/material.css';

const PhoneNumberInput = (props) => {
  const { country, value, onChange, setError, placeholder, disabled } = props;

  return (
    <PhoneInput
      country={country}
      value={value}
      onChange={onChange}
      containerClass='w-full'
      inputClass='w-full'
      enableAreaCodes
      enableSearch
      inputProps={{
        required: true,
      }}
      disabled={disabled}
      specialLabel={placeholder ? placeholder : "Phone"}
      defaultErrorMessage='Phone number'
      isValid={(value, country) => {
        if ((value.length < 14 || value.length > 14) && value.length !== 3) {
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