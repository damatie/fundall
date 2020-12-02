import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import FusePageCarded from '@fuse/core/FusePageCarded';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { DatePicker } from '@material-ui/pickers';
import * as Actions from '../store/actions';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import DropZone from '../../../shared/sharedDropZone';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import moment from 'moment';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';
import { useAuth } from 'app/hooks/useAuth';
import * as LocationActions from '../../../store/actions/index';



function CreateForm(props) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const loading = useSelector(({ createForm }) => createForm.srep.loading);
	const success = useSelector(({ createForm }) => createForm.srep.success);
	const country = useSelector(({ regions }) => regions.countries);
	const userData = useAuth().getUserDetails;
	const userId = useAuth().getId;
	const userProfile = useAuth().getUserProfile;

	const [isFormValid, setIsFormValid] = useState(true);
	const [file, setFile] = useState('');
	const [dob, setDob] = useState(moment(new Date()));
	const [identity, setIdentity] = useState('');
	const [benIdentity, setBenIdentity] = useState('');
	const [hideIdentity, setHideIdentity] = useState(false);
	const [adProof, setAdProof] = useState('');
	const [photo, setPhoto] = useState('');
	const [benPhoto, setBenPhoto] = useState('');
	const formRef = useRef(null);

	useEffect(() => {
		dispatch(LocationActions.getCountries())
	}, [dispatch])

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}


	function handleSubmit(model) {
		console.log(model);
		let payload = new FormData();
		payload.append("employeeId", userId);
		payload.append("hrManagerId", userId);
		payload.append("identityType", model.identityType);
		payload.append("benName", model.beneficiary_name);
		payload.append("benDob", dob.format("DD-MM-YYYY"));
		payload.append("benNationality", model.nationality);
		payload.append("birthCertNo", model.birth_cert_no);
		payload.append("capitalFund", model.capital_fund);
		payload.append("benEmailAddress", model.email_address);
		payload.append("benGender", model.gender);
		payload.append("phoneNo", model.phone_no);
		payload.append("benRelationshipEmp", model.relationship_emp);
		payload.append("residentialAddress", model.residential_address);
		payload.append("benTelNo", model.tel_no);
		payload.append("benTitle", model.title);
		
		// payload.append("sre_form", file[0]);
		payload.append("identity", identity[0], `${model.identityType}_${moment(new Date()).format('DDMMYY')}.${identity[0].name.split('.').pop()}`);
		payload.append("residential_proof", adProof[0], `${model.residentialProof}_${moment(new Date()).format('DDMMYY')}.${adProof[0].name.split('.').pop()}`);
		payload.append("employee_photo", photo[0], `${userData.displayName}_${moment(new Date()).format('DDMMYY')}.${photo[0].name.split('.').pop()}`);
		payload.append("bene_identity", benIdentity[0], `${model.benIdentityType}_${moment(new Date()).format('DDMMYY')}.${benIdentity[0].name.split('.').pop()}`);
		payload.append("bene_pass_photo", benPhoto[0], `${userData.displayName}_ben_${moment(new Date()).format('DDMMYY')}.${benPhoto[0].name.split('.').pop()}`);
		dispatch(Actions.addSrep(payload));
	}

	function checkFiles(){
		return (identity.length === 0 ||  
			benIdentity.length === 0 || adProof.length === 0 || 
			photo.length === 0 || benPhoto.length === 0)
	}

	const identityTypes = [
		{ id: 1, name: "Driver's License" },
		{ id: 2, name: "International Passport (Data Page)" },
		{ id: 3, name: "National Identity Card" },
		{ id: 4, name: "Voter's Card"}
	]

	const residentialProof = [
		{ id: 1, name: "Official Payment Receipt" },
		{ id: 2, name: "Utility Bill" }
	]

	const title = [
		{ id: 1, name: "Mr" },
		{ id: 2, name: "Miss" }
	]
	

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				content: 'flex flex-col',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between">
					<div className="flex flex-col items-start max-w-full">
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Typography className="normal-case flex items-center sm:mb-12" color="inherit">
								<Icon
									className="text-20 text-black bg-white rounded-20"
									component={Link}
									  to='/srep/all'
									role="button"
								>
									{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
								</Icon>
								<span className="mx-4 text-20 ml-16">Apply for Spring Rock Education Plan</span>
							</Typography>
						</FuseAnimate>
					</div>
				</div>
			}
			content={
				<div className=" sm:p-24">
					<div className="w-full">
						<GridSystem>
							<div>
								<Typography variant='h6' className="mb-3">Employee Name: {userData.displayName} </Typography>
							</div>
							<div>
							<Typography variant='h6' className="mb-3">Employment ID: EMP1236</Typography>
							</div>
							<div>
								<Typography variant='h6' className="mb-3">Department: {(userProfile.department) ? userProfile.department.departmentName : ''}</Typography>
							</div>
							<div>
								<Typography variant='h6' className="mb-3">Job Role: {(userProfile.role) ? userProfile.role.name : ''}</Typography>
							</div>
							<div>
							<Typography variant='h6' className="mb-3">Entity: SREL</Typography>
							</div>
							<div>
							<Typography variant='h6' className="mb-3">Employee Grade: G9</Typography>
							</div>
							<div>
							<Typography variant='h6' className="mb-32">Email: {(userProfile) ? userProfile.email : ''}</Typography>
							</div>
						</GridSystem>
						<Formsy
							onValidSubmit={handleSubmit}
							onValid={enableButton}
							onInvalid={disableButton}
							ref={formRef}
							className="flex flex-col justify-center w-full"
						>
							<GridSystem className="mt-16">
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Residential Address *</Typography>
									<TextFieldFormsy
										className="mb-16 w-full"
										type="text"
										name="residential_address"
										validations={{
											minLength: 1
										}}
										validationErrors={{
											minLength: 'Min character length is 1'
										}}
										variant="outlined"
										required
									/>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Phone Number *</Typography>
									<TextFieldFormsy
										className="mb-16 w-full"
										type="text"
										name="phone_no"
										validations={{
											minLength: 1
										}}
										validationErrors={{
											minLength: 'Min character length is 1'
										}}
										variant="outlined"
										required
									/>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Capital Fund to be contributed to the SREP(monthly) *</Typography>
									<TextFieldFormsy
										className="mb-16 w-full"
										type="number"
										name="capital_fund"
										validations={{
											minLength: 1
										}}
										validationErrors={{
											minLength: 'Min character length is 1'
										}}
										variant="outlined"
										required
									/>
								</div>
								</GridSystem>
								<Typography variant='h5' className="mt-16 mb-8">Beneficiary Details</Typography>
								<GridSystem>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Title *</Typography>
									<SelectFormsy
										className="w-full"
										style={{marginTop: "160px"}}
										name="title"
										label=""
										value=""
										variant="outlined"
										required
										requiredError='Must not be None'
									>
										{title.sort().map((item, i) => (
											<MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
										))}
									</SelectFormsy>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Name of Beneficiary *</Typography>
									<TextFieldFormsy
										className="mb-16 w-full"
										type="text"
										name="beneficiary_name"
										validations={{
											minLength: 1
										}}
										validationErrors={{
											minLength: 'Min character length is 1'
										}}
										variant="outlined"
										required
									/>
								</div>
								<div>
								<Typography variant='body1' className="mt-16 mb-8">Date of Birth *</Typography>
								<DatePicker
									inputVariant="outlined"
									value={dob}
									onChange={date => setDob(date)}
									className="mt-8 mb-16 w-full"
									maxDate={dob}
									format={'MMMM Do, YYYY hh:mm a'}
								/>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Nationality *</Typography>
									<SelectFormsy
										className="w-full"
										style={{marginTop: "160px"}}
										name="nationality"
										label=""
										value=""
										variant="outlined"
										required
										requiredError='Must not be None'
									>
										{country.sort().map((item, i) => (
											<MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
										))}
									</SelectFormsy>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Gender *</Typography>
									<SelectFormsy
										className="w-full"
										style={{marginTop: "160px"}}
										name="gender"
										label=""
										value=""
										variant="outlined"
										required
										requiredError='Must not be None'
									>
										<MenuItem value='M' key="1">Male</MenuItem>
										<MenuItem value="F" key="2">Female</MenuItem>
									</SelectFormsy>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Relationship to Employee *</Typography>
									<TextFieldFormsy
										className="mb-16 w-full"
										type="text"
										name="relationship_emp"
										validations={{
											minLength: 1
										}}
										validationErrors={{
											minLength: 'Min character length is 1'
										}}
										variant="outlined"
										required
									/>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Telephone Number *</Typography>
									<TextFieldFormsy
										className="mb-16 w-full"
										type="text"
										name="tel_no"
										validations={{
											minLength: 1
										}}
										validationErrors={{
											minLength: 'Min character length is 1'
										}}
										variant="outlined"
										required
									/>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Birth Certificate Number *</Typography>
									<TextFieldFormsy
										className="mb-16 w-full"
										type="text"
										name="birth_cert_no"
										validations={{
											minLength: 1
										}}
										validationErrors={{
											minLength: 'Min character length is 1'
										}}
										variant="outlined"
										required
									/>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Email Address *</Typography>
									<TextFieldFormsy
										className="mb-16 w-full"
										type="email"
										name="email_address"
										validations={{
											minLength: 1
										}}
										validationErrors={{
											minLength: 'Min character length is 1'
										}}
										variant="outlined"
										required
									/>
								</div>
								</GridSystem>
								<GridSystem>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Employee Passport Photo *</Typography>
									<DropZone setValue={setPhoto}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Beneficiary Passport Photo *</Typography>
									<DropZone setValue={setBenPhoto}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
								</div>	
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Means of Identification *</Typography>
									<SelectFormsy
										className="w-full"
										style={{marginTop: "160px"}}
										name="identityType"
										label=""
										value=""
										variant="outlined"
										required
										requiredError='Must not be None'
									>
										{identityTypes.sort().map((item, i) => (
											<MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
										))}
									</SelectFormsy>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Means of Identification File *</Typography>
									<DropZone setValue={setIdentity} allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false} />
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Proof of Address *</Typography>
									<DropZone setValue={setAdProof}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Proof of Employee's Parentship to Beneficiary *</Typography>
									<DropZone setValue={setBenIdentity}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
								</div>
							</GridSystem>
							<ProgressBtn success={success} loading={loading} content="Send" disable={checkFiles()} />
						</Formsy>
					</div>
				</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('createForm', reducer)(CreateForm);
