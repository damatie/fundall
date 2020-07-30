import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState, useRef } from 'react';
import { TextFieldFormsy, SelectFormsy, } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '.5rem',
  }
}))

function EmployeementInfoTab() {

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

  const classes = useStyles();

  const natureOfEmployeement = [
    {label: 'Title', name: 'title', value: '', type: 'text'},
    {label: 'Second title', name: 'secondTitle', value: '', type: 'text'},
    {label: 'Employee number', name: 'employeeNumber', value: '', type: 'number'},
    {label: 'Country of birth', name: 'countryOfBirth', value: '', data: ['Permanent', 'Contract', 'Consultant'], type: 'select'},
    {label: 'Marital status', name: 'maritalStatus', value: '', data: ['Single', 'Married', 'Complicated'], type: 'select'},
    {label: 'Since date', name: 'sinceDate', value: '', type: 'dateOpt', opt: 'never'},
    {label: 'Number of eligable dependant', name: 'noOfEligableDependant', value: '', type: 'number'},
    {label: 'Nearest airport to residence', name: 'nearestAirportToResidence', value: '', type: 'text'},
    {label: 'Department', name: 'departmentId', value: '', data: ['Single', 'Married', 'Complicated'], type: 'select'},
    {label: 'Zip code', name: 'zipCode', value: '', type: 'text'},
    {label: 'Nationality', name: 'nationality', value: '', data: ['Single', 'Married', 'Complicated'], type: 'select'},
    {label: 'State of origin', name: 'stateOfOrigin', value: '', data: ['Single', 'Married', 'Complicated'], type: 'select'},
    {label: 'LGA/City', name: 'LGA', value: '', data: ['Single', 'Married', 'Complicated'], type: 'select'},
    {label: 'Date of birth', name: 'DOB', value: '', type: 'date'},
    {label: 'International passport number expirationDate', name: 'internationalPassportNumberExpirationDate', value: '', type: 'date'},
    {label: 'Salary grade', name: 'salaryGrade', value: '', data: ['Single', 'Married', 'Complicated'], type: 'select'},
    {label: 'Start date', name: 'startDate', value: '', type: 'date'},
    {label: 'Date of exit', name: 'exitDate', value: '', type: 'dateOpt', opt: 'current'},
    {label: 'Date of last promotion details', name: 'dateOflastPromotionDetails', value: '', type: 'dateOpt', opt: 'not promoted'},
    {label: 'Compensation details', name: 'compensationDetails', value: '', type: 'textArea'},
    {label: 'ID card number', name: 'idCardNo', value: '', type: 'text'},
    {label: 'Qualification', name: 'qualification', value: '', data: ['Single', 'Married', 'Complicated'], type: 'select'},
    {label: 'Official number', name: 'officialNo', value: '', type: 'number'},
    {label: 'Official line', name: 'officeLine', value: '', type: 'number'},
    {label: 'Office extension', name: 'officeExtension', value: '', type: 'number'},
    {label: 'Office email', name: 'officeEmail', value: '', type: 'email'},
    {label: 'International passport issuance date', name: 'internationalPassportIssuanceDate', value: '', type: 'date'},
    {label: 'International passport number', name: 'internationalPassportNumber', value: '', type: 'text'},
    {label: 'International passport place issue', name: 'internationalPassportPlaceIssue', value: '', type: 'text'},
    {label: 'Location', name: 'location', value: '', type: 'text'},
    {label: 'Permanent address', name: 'permanentAddress', value: '', type: 'text'},
    {label: 'Nature of Employement', name: 'contractType', value: '', data: ['Permanent', 'Contract', 'Consultant'], type: 'select'},
    {label: 'Mode of exit', name: 'modeOfExit', value: '', type: 'text'},
    {label: 'Date of confirmation', name: 'confirmationDate', value: '', type: 'dateOpt', opt: 'Not confirmed'},
    {label: 'Confirmation status', name: 'confirmationStatus', value: '', data: ['Confirmed', 'Not confirmed', 'Deffered for 3 month', 'Not Appicable'], type: 'select'},
    {label: 'Confirmation comments', name: 'confirmationComments', value: '', type: 'textArea'},
    {label: 'Years in service', name: 'yearsInService', type: 'select', data: () => {
      const arr = [];
      for(let i = 1; i <= 35; i+=1) {

        arr.push(i)
      }
      return arr;
    }},
    {lable: 'Grade level', name: 'gradeLevel', value: '', type: 'select', data: []},
    {label: 'Designation', name: 'designation', value: '', type: 'text'},
    {label: 'Grade description', name: 'gradeDescription', value: '', type: 'textArea'},
    {label: 'Signature', name: 'signature', value: '', type: 'file'},
  ];
  
  const TextField = natureOfEmployeement.map((info) => {
    return (
      <>
        <div className="mb-24">
          <Typography className="font-bold mb-4 text-15">{info.label}</Typography>
					{/* <Typography>DATA</Typography> */}
          {info.type === 'text' || info.type === 'number' || info.type === 'email' ? 
            <TextFieldFormsy
              className="mb-16 w-full"
              variant="outlined"
              type={info.type}
              name={info.name}
              value={info.value}
              validations={{
                minLength: 1,
              }}
              validationErrors={{
                minLength: 'Min character length is 1',
              }}
              required
            /> : <></>}

            {info.type === 'date' || info.type === 'dateOpt' ? 
            <>
            <TextFieldFormsy
              className="mb-16 w-full"
              variant="outlined"
              type="date"
              name={info.name}
              value={info.value}
              validations={{
                minLength: 1,
              }}
              validationErrors={{
                minLength: 'Min character length is 1',
              }}
              required
            />
            <Typography variant='subtitle1'>{info.opt}</Typography>
            </>
             : <></>}

            {info.type === 'textArea' ? 
            <TextFieldFormsy
              className="mb-16 w-full"
              variant="outlined"
              type="text"
              name={info.name}
              value={info.value}
              multiline
              rows='4'
              validations={{
                minLength: 1,
              }}
              validationErrors={{
                minLength: 'Min character length is 1',
              }}
              required
            /> : <></>}


            {info.type === 'select' ? 
              <SelectFormsy
                className="mb-16 w-full"
                name={info.name}
                value={info.value}
                variant='filled'
                required
              >
                {[].map((item) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
                ))}
              </SelectFormsy>
            :
            <></>
            }
				</div>
      </>
    )
  })

	return (
		<div className="md:flex">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<Card className="w-full mb-16">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Employement Information
								</Typography>
								<Button className="normal-case" color="inherit" size="small">
									update
								</Button>
							</Toolbar>
						</AppBar>

						<CardContent>
              <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className={classes.grid}
              >
							  {TextField}
              </Formsy>
						</CardContent>
					</Card>
        </FuseAnimateGroup>
			</div>
    </div>
	);
}

export default EmployeementInfoTab;
