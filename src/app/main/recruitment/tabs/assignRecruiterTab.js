import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { fetchHeaders } from 'app/shared/fetchHeaders'
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';
import DropZone from '../../../shared/sharedDropZone';

function AssignRecruiter(props) {
	const dispatch = useDispatch();

	const [file, setFile] = React.useState();
	const [hrList, setHrList] = useState([]);
	const [jobTitleList, setJobTitleList] = useState([]);
	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	const baseUrl = getBaseUrl;
	const headers = fetchHeaders();

	useEffect(() => {
		fetch(`${baseUrl()}/auth/hr`, {...headers.getRegHeader()})
			.then(res => res.json()).then(async data => {
				if (data.success) {
					setHrList(data.data.map(hr => hr))
				} else {
					console.log(data)
				}
			}).catch(err => {
				console.log(err);
			})
	}, []);

	useEffect(() => {
		fetch(`${baseUrl()}/appraisal/jobTitle/all`, {...headers.getRegHeader()})
			.then(res => res.json()).then(async data => {
				console.log(data);
				if (data.success) {
					setJobTitleList(data.data.map(jobTitle => jobTitle))
				} else {
					console.log(data)
				}
			}).catch(err => {
				console.log(err);
			})
	}, []);

	useEffect(() => {
		// if (register.error && (register.error.username || register.error.password || register.error.email)) {
		// 	formRef.current.updateInputsWithError({
		// 		...register.error
		// 	});
		// 	disableButton();
		// }
		// dispatch(entityActions.getBusinessUnits());
		// dispatch(rolesActions.getRoles());
	}, []);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	const checkName = (item) => {
		if (item.lastName) return (
			<div style={{display: 'flex'}}>
				<Avatar style={{height: 24, width: 24}}></Avatar>
				<span style={{alignSelf: 'center', marginLeft: 16}}>{`${item.lastName} ${item.firstName}`}</span>
			</div>
		);
		if (item.name) return item.name;
		return item;
	}

	function handleSubmit(model) {
		let formData = new FormData();
		formData.append('numberOfScreen', model.numberOfScreen);
		formData.append('cvReviewBy', model.cvReviewBy);
		formData.append('employeeId', model.employeeId);
		formData.append('jobDescription', file);
		dispatch(Actions.assignRecruiter(props.selectedPosition.id, formData));
	}

	const formInputs = [
		{name: 'employeeId', label: 'Name of Recruiter', icon: 'person', data: hrList},
		{name: 'cvReviewBy', label: 'Job title', icon: 'person', data: jobTitleList},
		{name: 'numberOfScreen', label: 'Number of screens', type: 'number'},
  ];

	const recruitmentForm = formInputs.map((input, i) => {
		if (input.type === 'number') {
			return (
				<TextFieldFormsy
					className="mb-16"
					type={input.type}
					name={input.name}
					label={input.label}
					key={i}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									{input.icon}
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>
			)
		} else {
			return (
				<SelectFormsy
					className="mb-16"
					key={i}
					name={input.name}
					label={input.label}
					value=""
					variant="outlined"
					required
					requiredError='Must not be None'
				>
					{input.data.map(item => (
						<MenuItem value={item.id} key={item.id} style={{textTransform: 'capitalize'}}>
							{checkName(item)}
						</MenuItem>
					))}
				</SelectFormsy>
			)
		}
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
				<GridSystem>
					{ recruitmentForm }
				</GridSystem>
        <Typography variant='body1' className="mt-16 mb-8">Upload Job Description</Typography>
        <DropZone setValue={value => setFile(value)} />
				<ProgressBtn success={false} loading={false} content='Assign recruiter' disable={!isFormValid} />
			</Formsy>
		</div>
	);
}

export default AssignRecruiter;
