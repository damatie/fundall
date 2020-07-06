import MenuItem from '@material-ui/core/MenuItem';
import Formsy from 'formsy-react';
import {
  SelectFormsy,
} from '@fuse/core/formsy';
import React, { useState, useRef } from 'react';

const FilterLeaveSummary = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  function disableButton()
  {
      setIsFormValid(false);
  }

  function enableButton()
  {
      setIsFormValid(true);
  }

  function handleSubmit(model)
  {
      console.info('submit', model);
  }

  return (
    <Formsy
    onValidSubmit={handleSubmit}
    onValid={enableButton}
    onInvalid={disableButton}
    ref={formRef}
    className="flex flex-col justify-center w-1/2"
    >
      <SelectFormsy
        className="w-full"
        name="related"
        label="Filter"
        value=""
      >
        <MenuItem value="all">all</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="approved">Approved</MenuItem>
        <MenuItem value="rejected">Rejected</MenuItem>
      </SelectFormsy>
    </Formsy>
  )
};

export default FilterLeaveSummary;