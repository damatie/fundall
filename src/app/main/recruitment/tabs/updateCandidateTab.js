import { TextFieldFormsy } from '@fuse/core/formsy';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import Formsy from 'formsy-react';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';
import DropZone from '../../../shared/dropZonePdf';
import { useParams } from 'react-router';

function AssignRecruiter(props) {
	const dispatch = useDispatch();

	const [file, setFile] = React.useState();
	const [isFormValid, setIsFormValid] = useState(true);
	const formRef = useRef(null);

	const { selectedPosition } = props;

	const { loading, success } = useSelector(state => state.PositionDetails.candidate)

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	const { positionId } = useParams();

	function handleSubmit(model) {
		dispatch(Actions.updateCandidate({
			...model,
			resume: file[0]
		},
		selectedPosition.id, 
		positionId
		))
	}

	const formInputs = [
		{name: 'candidateName', label: 'Name of Candidate', icon: 'person', value: selectedPosition.candidateName},
		{name: 'candidateEmail', label: 'Email', icon: 'email', value: selectedPosition.candidateEmail},
		{name: 'candidatePhoneNumber', label: 'Phone number', icon: 'phone', type: 'number', value: selectedPosition.candidatePhoneNumber},
  ];

	const updateCandidateForm = formInputs.map((input, i) => {
    return (
      <TextFieldFormsy
        className="mb-16"
        type={input.type}
        name={input.name}
        label={input.label}
				key={i}
				value={input.value}
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
        <DropZone setValue={setFile} />
				<ProgressBtn success={success} loading={loading} content='Update candidate' disable={!isFormValid} />
			</Formsy>
		</div>
	);
}

export default AssignRecruiter;
