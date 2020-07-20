import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
// import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const FamilyInformation = () => {
  const [numbers, setNumbers] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  
  
  // const {convert, number} = useConvertToArray();

	const [isFormValid, setIsFormValid] = useState(true);
  const formRef = useRef(null);
  
  const nextOfkin = [
    {label: 'First name', name: 'firstName', value: '', icon: 'person', type: 'text'},
    {label: 'Last name', name: 'lastName', value: '', icon: 'person', type: 'text'},
    {label: 'Email', name: 'email', value: '', icon: 'mail', type: 'email'},
    {label: 'Relationship', name: 'relationship', value: '', icon: 'person', type: 'text'},
    {label: 'Contact number', name: 'contactNumber', value: '', icon: 'phone', type: 'number'},
    {label: 'Address', name: 'address', value: '', icon: 'map', type: 'text'}
  ];
  const whoToContact = [
    {label: 'Email', name: 'email', value: '', icon: 'mail', type: 'email'},
    {label: 'Contact number', name: 'contactNumber', value: '', icon: 'phone', type: 'number'},
    {label: 'Address', name: 'address', value: '', icon: 'map', type: 'text'}
  ];

	useEffect(() => {
  }, []);
  
  const handleChange = e => {
    switch(e.target.value) {
      case '1': {
        setNumbers([1]);
        break;
      }
      case '2': {
        setNumbers([1, 2]);
        break;
      }
      case '3': {
        setNumbers([1, 2, 3]);
        break;
      }
      case '4': {
        setNumbers(['1', '', '', '']);
        break;
      }
      case '5': {
        setNumbers(['', '', '', '', '']);
        break;
      }
      case '6': {
        setNumbers(['', '', '', '', '', '']);
        break;
      }
      case '7': {
        setNumbers(['', '', '', '', '', '', '']);
        break;
      }
      case '8': {
        setNumbers(['', '', '', '', '', '', '', '']);
        break;
      }
      case '9': {
        setNumbers(['', '', '', '', '', '', '', '', '']);
      }
      case '10': {
        setNumbers(['', '', '', '', '', '', '', '', '', '']);
        break
      }
      case '': {
        setNumbers([])
      }
      default: {
        setNumbers([]);
        break;
      }
    };
  };

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		// dispatch(Actions.saveBusinessUnit(model));
  }
  
  const NextOfKin = nextOfkin.map(item => {
    return (
      <TextFieldFormsy
        className="mb-16"
        type={item.type}
        name={item.name}
        label={item.label}
        value={item.value}
        // placeholder={'max. 10 dependants'}
        validations={{
          minLength: 1,
          maxLength: 10
        }}
        validationErrors={{
          minLength: 'Min character length is 1'
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon className="text-20" color="action">
                {item.icon}
              </Icon>
            </InputAdornment>
          )
        }}
        onChange={handleChange}
        variant="outlined"
        required
			/>
    )
  });

  const WhoToContact = whoToContact.map(item => {
    return (
      <TextFieldFormsy
        className="mb-16"
        type={item.type}
        name={item.name}
        label={item.label}
        value={item.value}
        // placeholder={'max. 10 dependants'}
        validations={{
          minLength: 1,
          maxLength: 10
        }}
        validationErrors={{
          minLength: 'Min character length is 1'
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon className="text-20" color="action">
                {item.icon}
              </Icon>
            </InputAdornment>
          )
        }}
        onChange={handleChange}
        variant="outlined"
        required
			/>
    )
  })

  return (
    <div className="w-full">
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        ref={formRef}
        className="flex flex-col justify-center w-full"
      >
        <TextFieldFormsy
          className="mb-16"
          type={'number'}
          name={'number of dependants'}
          label={'Number of Dependants'}
          value={''}
          placeholder={'max. 10 dependants'}
          validations={{
            minLength: 1,
            maxLength: 10
          }}
          validationErrors={{
            minLength: 'Min character length is 1'
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  group
                </Icon>
              </InputAdornment>
            )
          }}
          onChange={handleChange}
          variant="outlined"
          required
			  />

        {numbers.map( x => (<Depandants />))}
        <Typography className='my-16' variant="subtitle1">Next of Kin</Typography>
        {NextOfKin}
        <Typography className='my-16' variant="subtitle1">Who to contact incase of emergency</Typography>
        {WhoToContact}
      </Formsy>
    </div>
  );
};

const Depandants = () => {
  return (
    <Grid container className='w-full'>
      <Grid item style={{width: '30%'}}>
      <SelectFormsy
					className="my-16 mr-16 w-full"
					name={'info.name'}
					label={'Type'}
					// value={info.value}
					variant="outlined"
					required
					requiredError='Must not be None'
					// onChange={e => {
					// 	getDepartments(e.target.value);
					// }}
				>
				{['Wife', 'Children'].map(item => (
					<MenuItem value={item} key={item}>{item}</MenuItem>
				))}
			</SelectFormsy>
      </Grid>
      <Grid item style={{width: '70%'}}>
      <TextFieldFormsy 
          className="my-16 w-full"
          type={'number'}
          name={'number of dependants'}
          label={'Full name'}
          value={''}
          validations={{
            minLength: 1
          }}
          validationErrors={{
            minLength: 'Min character length is 1'
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  group
                </Icon>
              </InputAdornment>
            )
          }}
          variant="outlined"
          required
			  />
      </Grid>
    </Grid>
  )
};

export default FamilyInformation;