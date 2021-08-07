import React from 'react';
import * as Actions from '../store/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import errorMsg from '../../../../utils/errorMsg';
import userRole from 'utils/userRole';
import moment from 'moment';

const schema = yup.object().shape({
	applicantName: yup
		.string(
			errorMsg({
				name: 'Applicant Name',
				type: 'string'
			})
		)
		.required(
			errorMsg({
				name: 'Applicant Name',
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
	applicationStatus: yup.string(
		errorMsg({
			name: 'Application Status',
			type: 'string'
		})
		)
		.required(
			errorMsg({
				name: 'Application Status',
				type: 'required'
			})
		),
});

const useCandidates = ({ state, dispatch, push, id, hash, positionId, userInfo }) => {
	const { open, data, loading, showButton, oneCandidate, oneLoading, showEdit } = state;

	const { register, handleSubmit, errors, control, getValues, reset } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema)
	});

	// console.log(state);

	const [shortlistedRows, setShortlistedRows] = React.useState([]);
	const [activeRows, setActiveRows] = React.useState([]);
	const [contentList, setContentList] = React.useState([]);
	const [shortListedList, setShortListedList] = React.useState([]);
	const [contentSelectedItem, setContentSelectedItem] = React.useState({
		id: 0,
		openPositionId:positionId,
		applicantName: '',
		applicantEmail: '',
		contactNumber: '',
		dateApplied: '',
		homeAddress: '',
		applicationSource: '',
		applicationStatus: '',
		applicationFile: [],
		applicationData: ''
	});

	React.useEffect(() => {
		// dispatch(Actions.getAllCandidates());
		if (positionId) {
			dispatch(Actions.getAllCandidates(positionId));
			if(id){
				console.log('Gettiing one Candidate ', positionId, id);
				dispatch(Actions.getOneCandidates(positionId, id));
			}
		}
	}, [dispatch]);

	  React.useEffect(() => {
	      setContentSelectedItem({
	          ...oneCandidate,
			  dateApplied: moment(oneCandidate?.dateApplied).format('DD-MM-YYYY')
	      });
	  }, [oneCandidate]);

	React.useEffect(() => {
		setShortlistedRows(data.filter(row => row.status === 'SHORTLISTED'));
		setActiveRows(data.filter(row => row.status === 'ACTIVE'))
	}, [data]);

	const handleOpenModal = () => {
		dispatch({ type: Actions.OPEN_CREATE_CANDIDATE_OPENING_MODAL });
	};

	const handleCloseModal = () => {
		dispatch({ type: Actions.CLOSE_CREATE_CANDIDATE_OPENING_MODAL });
	};

	const handleEdit = () => {
		dispatch({ type: Actions.SHOW_EDIT_FORM });
	}

	const isManager = () => userRole(userInfo?.role?.name) === 'linemanager';

	const isHR = () => userRole(userInfo?.role?.name) === 'hrmanager' || userRole(userInfo?.role?.name).includes('hr');

	const onSubmit = () => {
		console.log(contentList);
		const payload = {
			candidates: contentList
		};
		dispatch(Actions.addCandidate(payload, positionId));
	};

	const onUpdate = (model) => {
		console.log(model)
		const payload = {
			applicantName: model.applicantName,
			applicantEmail: model.applicantEmail,
			contactNumber: model.contactNumber,
			dateApplied: model.dateApplied,
			homeAddress: model.homeAddress,
			applicationSource: model.applicationSource,
			applicationStatus: model.applicationStatus,
			applicationFile: model.applicationFile,
			applicationData: model.applicationData
		}
		dispatch(Actions.updateCandidate(payload, positionId, id))
	};

	const onShortlising = () => {
		console.log(shortListedList)
		const payload = shortListedList.map(list => list.id);
		console.log(payload);
		dispatch(Actions.shortlistCandidate(payload, positionId));
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

	const handleAddList = async(model) => {
		console.log(model);
		contentList.push({
			...model,
			id: model.id || contentList.length + 1,
		});
		reset();
		setContentSelectedItem({
			id: 0,
			openPositionId:positionId,
			applicantName: '',
			applicantEmail: '',
			contactNumber: '',
			dateApplied: '',
			homeAddress: '',
			applicationSource: '',
			applicationStatus: '',
			applicationFile: [],
			applicationData: ''
		});
	};

	const handleEditList = id => {
		console.log(id);
		setContentSelectedItem(contentList.find(content => content.id === id));
		setContentList(contentList.filter(content => content.id !== id));
	};


	const handleSelectShorted = (checked, item) => {
		// console.log(item);
		// console.log(checked);
		if(checked){
			if(item.status !== 'SHORTLISTED'){
				shortListedList.push({
				...item	
				});
			}
		}else{
			const newList = shortListedList.findIndex(i => Number(i.id) !== Number(item.id));
			shortListedList.splice(newList, 1);
			setShortListedList(shortListedList);
		}
		if(shortListedList.length > 0 ){
			dispatch({
				type: Actions.SHOW_SHORTLIST_BUTTON
			});
		}else{
			dispatch({
				type: Actions.HIDE_SHORTLIST_BUTTON
			});
		}
	}

	const handleDeleteRecruitment = id => {
		console.log(id);
	};

	const handleDownload = url => {
		console.log(url);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('target', '_blank');
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	}

	return {
		// ...state,
		open,
		handleOpenModal,
		handleCloseModal,
		errors,
		control,
		handleSubmit,
		register,
		onSubmit,
		onUpdate,
		onShortlising,
		loading,
		oneLoading,
		push,
        positionId,
		isHR,
		shortlistedRows,
		activeRows,
		isManager,
		rows: data,
		content: oneCandidate,
		handleDeleteRecruitment,
		handleAddList,
		handleEditList,
		handleDownload,
		handleEdit,
		contentList,
		contentSelectedItem,
		setContentSelectedItem,
		convertFileToBase64,
		handleSelectShorted,
		showButton,
		showEdit
	};
};

export default useCandidates;
