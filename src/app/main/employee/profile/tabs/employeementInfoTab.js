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
import { useSelector, useDispatch } from 'react-redux';
import * as departmentAction from 'app/main/HR/business_unit/department/store/actions';
import * as regionActions from 'app/store/actions';
import { showMessage } from 'app/store/actions';
import { salaryGrade, yearsOfService, gradeLevel, confirmationStatus, qualification, maritalStatus, natureOfEmployement } from '../employementData';
import * as Actions from '../store/actions';
import { formateDate } from 'app/shared/formateDate';
import ProgressBtn from 'app/shared/progressBtn';
import SharedDropzone from 'app/shared/sharedDropZone';
import GridSystem from 'app/shared/gridSystem';
import { useParams } from 'react-router';

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
  const [country, setCountry] = useState('');
  const [data, setData] = useState({});
  const [file, setFile] = useState('');
  const [edit, setEdit] = useState(true);
  const [fields, setFields] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();
  // STORES
  const profile = useSelector(({ profile }) => profile.data);

  const department = useSelector(({ department }) => department.departments.data);

  const regions = useSelector(({ regions }) => regions);

  const employementInfo = useSelector(({ employeeProfile }) => employeeProfile);

  const EmployeeProfileState = useSelector(({ employeesDetails }) => employeesDetails);

  useEffect(() => {
    dispatch(departmentAction.getDepartments(profile.department.entityId));
    dispatch(regionActions.getCountries());
    dispatch(Actions.getEmployeeInfo());
  }, [dispatch]);

  useEffect(() => {
    // console.log(data.stateOfOrigin)
    // if(data.stateOfOrigin) {
      regionActions.getStates(data.nationality)
      regionActions.getCitites(data.stateOfOrigin, data.nationality)
    // }
  }, [data.stateOfOrigin]);

  useEffect(() => {
    if(id) {
      setData(EmployeeProfileState.employee.info.info)
    } else {
      setData(employementInfo.employeeInfo.data ? employementInfo.employeeInfo.data : {});
    }
    
  }, [employementInfo]);

  useEffect(() => {
    setFields([
      {label: 'Title', name: 'title', value: data.title, type: 'text', disabled: edit},
      {label: 'Second title', name: 'secondTitle', value: data.secondTitle, type: 'text', disabled: edit},
      {label: 'Employee number', name: 'employeeNumber', value: data.employeeNumber, type: 'number', disabled: edit},
      {label: 'Country of birth', name: 'countryOfBirth', value: data.countryOfBirth, data: regions.countries, type: 'select', field: 'name', disabled: edit},
      {label: 'Marital status', name: 'maritalStatus', value: data.maritalStatus, data: maritalStatus, field: 'name', type: 'select', disabled: edit},
      {label: 'Since date', name: 'sinceDate', value: data.sinceDate, type: 'dateOpt', opt: 'never', disabled: edit},
      {label: 'Number of eligable dependant', name: 'noOfEligableDependant', value: data.noOfEligableDependant, type: 'number', disabled: edit},
      {label: 'Nearest airport to residence', name: 'nearestAirportToResidence', value: data.nearestAirportToResidence, type: 'text', disabled: edit},
      {label: 'Department', name: 'departmentId', value: data.departmentId, data: department, type: 'select', field: 'departmentName', disabled: edit},
      {label: 'Zip code', name: 'zipCode', value: data.zipCode, type: 'text', disabled: edit},
      {label: 'Nationality', name: 'nationality', value: data.nationality, data: regions.countries, type: 'select', field: 'name', disabled: edit},
      {label: 'State of origin', name: 'stateOfOrigin', value: data.stateOfOrigin, data: regions.states, type: 'select', field: 'name', disabled: edit},
      {label: 'LGA/City', name: 'LGA', value: data.LGA, data: regions.cities, type: 'select', field: 'name', disabled: edit},
      {label: 'Date of birth', name: 'DOB', value: data.DOB, type: 'date', disabled: edit},
      {label: 'International passport number expirationDate', name: 'internationalPassportNumberExpirationDate', value: data.internationalPassportNumberExpirationDate, type: 'date', disabled: edit},
      {label: 'Salary grade', name: 'salaryGrade', value: data.salaryGrade, data: salaryGrade, type: 'select', field: 'name', disabled: edit},
      {label: 'Start date', name: 'startDate', value: data.startDate, type: 'date', disabled: edit},
      {label: 'Date of exit', name: 'exitDate', value: data.exitDate, type: 'dateOpt', opt: 'current', disabled: edit},
      {label: 'Date of last promotion details', name: 'dateOflastPromotionDetails', value: data.dateOflastPromotionDetails, type: 'dateOpt', opt: 'not promoted', disabled: edit},
      {label: 'Compensation details', name: 'compensationDetails', value: data.compensationDetails, type: 'textArea', disabled: edit},
      {label: 'ID card number', name: 'idCardNo', value: data.idCardNo, type: 'text', disabled: edit},
      {label: 'Qualification', name: 'qualification', value: data.qualification, data: qualification, field: 'name', type: 'select', disabled: edit},
      {label: 'Official number', name: 'officialNo', value: data.officialNo, type: 'number', disabled: edit},
      {label: 'Official line', name: 'officeLine', value: data.officeLine, type: 'number', disabled: edit},
      {label: 'Office extension', name: 'officeExtension', value: data.officeExtension, type: 'number', disabled: edit},
      {label: 'Office email', name: 'officeEmail', value: data.officeEmail, type: 'email', disabled: edit},
      {label: 'International passport issuance date', name: 'internationalPassportIssuanceDate', value: data.internationalPassportIssuanceDate, type: 'date', disabled: edit},
      {label: 'International passport number', name: 'internationalPassportNumber', value: data.internationalPassportNumber, type: 'text', disabled: edit},
      {label: 'International passport place issue', name: 'internationalPassportPlaceIssue', value: data.internationalPassportPlaceIssue, type: 'text', disabled: edit},
      {label: 'Location', name: 'location', value: data.location, type: 'text', disabled: edit},
      {label: 'Permanent address', name: 'permanentAddress', value: data.permanentAddress, type: 'text', disabled: edit},
      {label: 'Nature of Employement', name: 'contractType', value: data.contractType, data: natureOfEmployement, field: 'name', type: 'select', disabled: edit},
      {label: 'Mode of exit', name: 'modeOfExit', value: data.modeOfExit, type: 'text', disabled: edit},
      {label: 'Date of confirmation', name: 'confirmationDate', value: data.confirmationDate, type: 'dateOpt', opt: 'Not confirmed', disabled: edit},
      {label: 'Confirmation status', name: 'confirmationStatus', value: data.confirmationStatus, data: confirmationStatus, field: 'name', type: 'select', disabled: edit},
      {label: 'Confirmation comments', name: 'confirmationComments', value: data.confirmationStatus, type: 'textArea', disabled: edit},
      {label: 'Years in service', name: 'yearsInService', type: 'select', data: yearsOfService, field: 'name', value: data.yearsInService, disabled: edit},
      {label: 'Grade level', name: 'gradeLevel', value: data.gradeLevel, type: 'select', data: gradeLevel, field: 'name', disabled: edit},
      {label: 'Designation', name: 'designation', value: data.designation, type: 'text', disabled: edit},
      {label: 'Grade description', name: 'gradeDescription', value: data.gradeDescription, type: 'textArea', disabled: edit},
      {label: 'Signature', name: 'signature', value: data.signature, type: 'file', disabled: edit},
    ]);
  }, [regions.states, regions.cities, department, edit])

  function disableButton()
  {
    setIsFormValid(false);
  };

  function enableButton()
  {
    setIsFormValid(true);
  };

  function handleSubmit(model)
  {
    // console.log({
      ...model,
      signature: file[0]
    });
    if(data.title) {
      dispatch(Actions.updateEmployeeInfo(1, {
        ...model,
        signature: file[0]
      }));
    } else {
      dispatch(Actions.createEmployeeInfo(1, {
        ...model,
        signature: file[0]
      }));
    }
  };

  const classes = useStyles();


  
  const TextField = fields.map((info) => {
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
              // validations={{
              //   minLength: 1,
              // }}
              // validationErrors={{
              //   minLength: 'Min character length is 1',
              // }}
              // required
              disabled={info.disabled}
            /> : <></>}

            {info.type === 'date' || info.type === 'dateOpt' ? 
            <>
            <TextFieldFormsy
              className="mb-16 w-full"
              variant="outlined"
              type="date"
              name={info.name}
              value={formateDate(new Date())}
              // validations={{
              //   minLength: 1,
              // }}
              // validationErrors={{
              //   minLength: 'Min character length is 1',
              // }}
              // required
              disabled={info.disabled}
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
              disabled={info.disabled}
              // validations={{
              //   minLength: 1,
              // }}
              // validationErrors={{
              //   minLength: 'Min character length is 1',
              // }}
              // required
            /> : <></>}


            {info.type === 'select' ? 
              <SelectFormsy
                className="mb-16 w-full"
                name={info.name}
                value={info.value}
                variant='outlined'
                required
                label=''
                disabled={info.disabled}
                onChange={e => {
                  if(info.name === 'nationality') {
                    setCountry(e.target.value);
                    dispatch(regionActions.getStates(e.target.value));
                    dispatch(
                      showMessage({
                        message: 'Enter your State',
                        autoHideDuration: 3000,
                        anchorOrigin: {
                          vertical  : 'top',
                          horizontal: 'right'
                        },
                        variant: 'info'
                      })
                    )
                  }
                  if(info.name === 'stateOfOrigin') {
                    dispatch(regionActions.getCitites(e.target.value, country));
                    dispatch(
                      showMessage({
                        message: 'Enter your city/LGA',
                        autoHideDuration: 3000,
                        anchorOrigin: {
                          vertical  : 'top',
                          horizontal: 'right'
                        },
                        variant: 'info'
                      })
                    )
                  }
                }}
              >
                {info.data.map((item, i) => (
                <MenuItem value={item.id} key={i}>
                  {item[info.field]}
                </MenuItem>
                ))}
              </SelectFormsy>
            :
            <></>
            }

            {info.type === 'file' ?
              <SharedDropzone name={info.name} allowedTypes={'image/*'} setValue={setFile}/> :
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
								{!id ? <Button className="normal-case" color="inherit" variant='outlined' color="secondary" size="medium" onClick={e => setEdit(!edit)}>
									{edit ? 'update' : 'Cancel'}
								</Button> : <></>}
							</Toolbar>
						</AppBar>

						<CardContent>
              <Formsy
                // onValidSubmit={handleSubmit}
                // onValid={enableButton}
                // onInvalid={disableButton}
                ref={formRef}
                // className={}
                onSubmit={handleSubmit}
              >
                <GridSystem>
                 {TextField}
                </GridSystem>
                {!id ? <>
                {data.title ? <ProgressBtn content='Update info' success={employementInfo.employeeInfo.success} loading={employementInfo.employeeInfo.updaing}/> : <ProgressBtn content='Create info' success={employementInfo.employeeInfo.success} loading={employementInfo.employeeInfo.creating}/>}
                </> : <></>}
              </Formsy>
						</CardContent>
					</Card>
        </FuseAnimateGroup>
			</div>
    </div>
	);
}

export default EmployeementInfoTab;
