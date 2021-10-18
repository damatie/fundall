import React from 'react';
import * as Actions from '../store/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import errorMsg from '../../../../utils/errorMsg';
import userRole from 'utils/userRole';
import moment from 'moment';

const schema = yup.object().shape({
	firstName: yup
		.string(
			errorMsg({
				name: 'First Name',
				type: 'string'
			})
		)
		.required(
			errorMsg({
				name: 'First Name',
				type: 'required'
			})
		),
    lastName: yup
		.string(
			errorMsg({
				name: 'Last Name',
				type: 'string'
			})
		)
		.required(
			errorMsg({
				name: 'Last Name',
				type: 'required'
			})
		),
	applicantEmail: yup
		.string(
			errorMsg({
				name: 'Applicant Email',
				type: 'string'
			})
		)
		.required(
			errorMsg({
				name: 'Applicant Email',
				type: 'required'
			})
		),
	contantNumber: yup
		.string(
			errorMsg({
				name: 'Contanct Number',
				type: 'string'
			})
		)
		.required(
			errorMsg({
				name: 'Contanct Number',
				type: 'required'
			})
		),
	dateApplied: yup
		.date(
			errorMsg({
				name: 'Job Applied Date',
				type: 'date'
			})
		)
		.required(
			errorMsg({
				name: 'Job Applied Date',
				type: 'required'
			})
		),
	homeAddress: yup
		.string(
			errorMsg({
				name: 'Home Address',
				type: 'string'
			})
		)
		.required(
			errorMsg({
				name: 'Home Address',
				type: 'required'
			})
		),
	applicationSource: yup
		.string(
			errorMsg({
				name: 'Application Source',
				type: 'string'
			})
		)
		.required(
			errorMsg({
				name: 'Application Source',
				type: 'required'
			})
		),
});

const useExternalCandidate = ({ state, dispatch, push, hash }) => {
	const { onePosition, oneLoading } = state.recruitment;
	const { success, loading } = state.candidate;

	const { register, handleSubmit, errors, control, reset } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema)
	});

	// console.log(onePosition);

    const [apply, setApply] = React.useState(false);
	const [contentSelectedItem, setContentSelectedItem] = React.useState({
		hash,
		firstName: '',
		lastName: '',
		applicantEmail: '',
		contactNumber: '',
		dateApplied: new Date(),
		homeAddress: '',
		applicationSource: '',
		applicationStatus: '',
		applicationFile: [],
		applicationData: ''
	});

	React.useEffect(() => {
		// dispatch(Actions.getAllCandidates());
		if (hash) {
			dispatch(Actions.getOneCandidateByHash(hash));
		}
	}, [dispatch]);

	
	const onSubmit = (model) => {
        console.log(model);
		const payload = {
			...model,
			applicantName: `${model.firstName} ${model.lastName}`
		};
		dispatch(Actions.candidateApply(payload, hash, setApply));
		reset();
	};
	
	const convertFileToBase64 = (fileData) => {
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.onload = function(){
				var arrayBuffer = this.result;
				// console.log(arrayBuffer);
				resolve(arrayBuffer);
			}
			reader.readAsDataURL(fileData);
		});
	}

	return {
		// ...state,
		errors,
		control,
		handleSubmit,
		register,
		onSubmit,
		oneLoading,
		loading,
		success,
		push,
		content: onePosition,
		contentSelectedItem,
		setContentSelectedItem,
		convertFileToBase64,
        setApply,
        apply,
	};
};

export default useExternalCandidate;
