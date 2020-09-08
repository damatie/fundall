import { TextFieldFormsy } from '@fuse/core/formsy';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';
import DropZone from '../../../shared/sharedDropZone';

function AssignRecruiter(props) {
	const dispatch = useDispatch();

	const [file, setFile] = React.useState();
	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);;

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		let formData = new FormData();
		formData.append('candidateName', model.candidateName);
		formData.append('candidateEmail', model.candidateEmail);
		formData.append('candidatePhoneNumber', model.candidatePhoneNumber);
		formData.append('resume', file);
		dispatch(Actions.assignRecruiter(props.candidateId, formData));
	}

	const formInputs = [
		{name: 'candidateName', label: 'Name of Candidate', icon: 'person'},
		{name: 'candidateEmail', label: 'Email', icon: 'email'},
		{name: 'candidatePhoneNumber', label: 'Phone number', icon: 'phone', type: 'number'},
  ];

	const updateCandidateForm = formInputs.map((input, i) => {
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
					{ updateCandidateForm }
				</GridSystem>
        <Typography variant='body1' className="mt-16 mb-8">Upload resume</Typography>
        <DropZone setValue={value => setFile(value)} />
				<ProgressBtn success={false} loading={false} content='Assign recruiter' disable={!isFormValid} />
			</Formsy>
		</div>
	);
}

export default AssignRecruiter;
