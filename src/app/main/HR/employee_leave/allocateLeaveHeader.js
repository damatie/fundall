import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as Actions from './store/actions';
import swal from 'sweetalert2';
import {
  FuseChipSelectFormsy,
  TextFieldFormsy
} from '@fuse/core/formsy';
import Formsy from 'formsy-react';

function AllocateLeaveHeader(props) {
	const dispatch = useDispatch();
	// const searchText = useSelector(({ leaveOptions }) => leaveOptions.leaveOptions.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	return (
    <>
    <AllocateLeaveHead />
    </>
	);
};

const suggestions = ['Spring rock'].map(item => ({
  value: item,
  label: item
}));

const suggestion = ['Support service'].map(item => ({
  value: item,
  label: item
}));

const AllocateLeaveHead = () => {
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
    // console.info('submit', model);
    setTimeout(() => {
      swal.fire({
        title: 'Allocate leave',
        text: 'Leave allocated successfully',
        icon: 'success',
        timer: 3000
      })
    }, 1500)
      
  }
  return (
    <Formsy
      onValidSubmit={handleSubmit}
      onValid={enableButton}
      onInvalid={disableButton}
      ref={formRef}
      className="flex flex-1 justify-center items-center w-full"
    >
    {/* <div className="flex flex-1 w-full items-center justify-between"> */}
      {/* <div> */}
        <FuseChipSelectFormsy
          className="mx-16 w-full"
          name="tags"
          placeholder="Select multiple entities"
          textFieldProps={{
              label          : 'Entities',
              InputLabelProps: {
                  shrink: true
              },
              // variant        : 'outlined'
          }}
          options={suggestions}
          isMulti
          validations={{minLength: 1}}
          validationErrors={{
              minLength: 'You need to select at least one'
          }}
          required
        />

      {/* </div> */}
      {/* <div> */}
        <FuseChipSelectFormsy
          className="mx-16 w-full"
          name="tags"
          placeholder="Select multiple departments"
          textFieldProps={{
              label          : 'Department',
              InputLabelProps: {
                  shrink: true
              },
              // variant        : 'outlined'
          }}
          options={suggestions}
          isMulti
          validations={{minLength: 1}}
          validationErrors={{
              minLength: 'You need to select at least one'
          }}
          required
          
        />

      {/* </div> */}
      {/* <div> */}
        <TextFieldFormsy
          className="mx-16 w-full"
          type="number"
          name="name"
          label="Allocate leave days"
          // value={new Date().getFullYear()}
          // disabled
          required
          // variant='outlined'
          size='small'
        />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="mx-16 w-full"
          aria-label="LOG IN"
          disabled={!isFormValid}
        >
          Allocate leave
        </Button>
    </Formsy>
  );
};

export default AllocateLeaveHeader;
