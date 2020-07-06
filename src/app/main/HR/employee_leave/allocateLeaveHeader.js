import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as Actions from './store/actions';
import swal from 'sweetalert2';
import {
  SelectFormsy,
} from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import Formsy from 'formsy-react';
import * as departmentActions from 'app/main/HR/business_unit/department/store/actions';
import * as businessUnitActions from 'app/main/HR/business_unit/store/actions';


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



const suggestion = ['Support service'].map(item => ({
  value: item,
  label: item
}));

const AllocateLeaveHead = () => {
  const businessUnits = useSelector(({ businessUnits }) => businessUnits.businessUnits);
  const departments = useSelector(({ departments }) => departments.departments);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const dateOne = businessUnits.data.map(item => ({
    value: item.id,
    label: item.entityName
  }));
  

  useEffect(() => {
    dispatch(businessUnitActions.getBusinessUnits());
  }, [dispatch]);

  function disableButton()
  {
    setIsFormValid(false);
  }

  function enableButton()
  {
    setIsFormValid(true);
  }

  const handleDepartment = id => {
    dispatch(departmentActions.getDepartments(id));
  };

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
        <SelectFormsy
          className="w-full"
          name="related-outlined"
          label="Entities"
          // value="none"
          variant="outlined"
          onChange={e => handleDepartment(e.target.value) }
          required
          size='small'
        >
          {businessUnits.data.map(item => (
            <MenuItem value={item.id}>{item.entityName}</MenuItem>
          ))}
        </SelectFormsy>

      {/* </div> */}
      {/* <div> */}
        
        <SelectFormsy
          className="w-full"
          name="related-outlined"
          label="Department"
          // value="none"
          variant="outlined"
          // onChange={e => handleDepartment(e.target.value) }
          required
          size='small'
        >
          {['Support service'].map(item => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </SelectFormsy>

      {/* </div> */}
      {/* <div> */}
    </Formsy>
  );
};

export default AllocateLeaveHeader;
