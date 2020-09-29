import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import FusePageCarded from '@fuse/core/FusePageCarded';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
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



function CreateForm(props) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const loading = useSelector(({ createForm }) => createForm.srep.loading);
	const success = useSelector(({ createForm }) => createForm.srep.success);
	const userData = useAuth().getUserDetails;
	const userId = useAuth().getId;

	const [isFormValid, setIsFormValid] = useState(true);
	const [file, setFile] = useState('');
	const [identity, setIdentity] = useState('');
	const [benIdentity, setBenIdentity] = useState('');
	const [hideIdentity, setHideIdentity] = useState(false);
	const [adProof, setAdProof] = useState('');
	const [photo, setPhoto] = useState('');
	const [benPhoto, setBenPhoto] = useState('');
	const formRef = useRef(null);

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
		payload.append("benIdentityType", model.benIdentityType);
		payload.append("sre_form", file[0]);
		payload.append("identity", identity[0], `${model.identityType}_${moment(new Date()).format('DDMMYY')}.${identity[0].name.split('.').pop()}`);
		payload.append("residential_proof", adProof[0], `${model.residentialProof}_${moment(new Date()).format('DDMMYY')}.${adProof[0].name.split('.').pop()}`);
		payload.append("employee_photo", photo[0], `${userData.displayName}_${moment(new Date()).format('DDMMYY')}.${photo[0].name.split('.').pop()}`);
		payload.append("bene_identity", benIdentity[0], `${model.benIdentityType}_${moment(new Date()).format('DDMMYY')}.${benIdentity[0].name.split('.').pop()}`);
		payload.append("bene_pass_photo", benPhoto[0], `${userData.displayName}_ben_${moment(new Date()).format('DDMMYY')}.${benPhoto[0].name.split('.').pop()}`);
		dispatch(Actions.addSrep(payload));
	}

	function checkFiles(){
		return (file.length === 0 || identity.length === 0 ||  
			benIdentity.length === 0 || adProof.length === 0 || 
			photo.length === 0 || benPhoto.length === 0)
	}

	const identityTypes = [
		{ id: 1, name: "Birth Certificate" },
		{ id: 2, name: "Driver's License" },
		{ id: 3, name: "International Passport Data Page" },
		{ id: 4, name: "National Identity Card" },
		{ id: 5, name: "Voter's Card"}
	]

	const residentialProof = [
		{ id: 1, name: "Official Payment Receipt" },
		{ id: 2, name: "Utility Bill" }
	]
	

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
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
				<div className=" sm:p-24 ">
					<div className="w-full">
						<Formsy
							onValidSubmit={handleSubmit}
							onValid={enableButton}
							onInvalid={disableButton}
							ref={formRef}
							className="flex flex-col justify-center w-full"
						>
							<GridSystem>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Signed SREP Document *</Typography>
									<DropZone setValue={setFile}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
								</div>	
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Employee Passport Photo *</Typography>
									<DropZone setValue={setPhoto}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Identity Type *</Typography>
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
									<Typography variant='body1' className="mt-16 mb-8">Identity File *</Typography>
									<DropZone setValue={setIdentity} allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false} />
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Employee's Residential Proof *</Typography>
									<SelectFormsy
										className="w-full"
										name="residentialProof"
										label=""
										value=""
										variant="outlined"
										required
										requiredError='Must not be None'
									>
										{residentialProof.sort().map((item, i) => (
											<MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
										))}
									</SelectFormsy>
								</div>	
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Employee's Residential Proof File *</Typography>
									<DropZone setValue={setAdProof}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Beneficiary Identity Type *</Typography>
									<SelectFormsy
										className="w-full"
										name="benIdentityType"
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
									<Typography variant='body1' className="mt-16 mb-8">Beneficiary Identity File *</Typography>
									<DropZone setValue={setBenIdentity}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
								</div>
								<div>
									<Typography variant='body1' className="mt-16 mb-8">Beneficiary Passport Photo *</Typography>
									<DropZone setValue={setBenPhoto}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
								</div>		
							</GridSystem>
							<ProgressBtn success={success} loading={loading} content="Apply" disable={!isFormValid || checkFiles()} />
						</Formsy>
					</div>
				</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('createForm', reducer)(CreateForm);
