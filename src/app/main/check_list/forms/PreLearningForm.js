import React, { useState, useRef, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Formsy from 'formsy-react';
import withReducer from 'app/store/withReducer';
import { TextFieldFormsy, CheckboxFormsy, RadioGroupFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import { inputStyles } from 'app/shared/EmployeeFormInput';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from 'app/hooks/useAuth';
import * as Actions from '../store/actions';
import LocalAtmRoundedIcon from '@material-ui/icons/SchoolRounded';
import Divider from '@material-ui/core/Divider';
import reducer from '../store/reducers';
import Checkbox from '@material-ui/core/Checkbox';
import ProgressBtn from 'app/shared/progressBtn';;

const PreLearningForm = (props) => {
	const classes = inputStyles();
	const dispatch = useDispatch();
	const questions = useSelector(({ preLearningForm }) => preLearningForm.question.data);
	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);
	const [sign, setSign] = useState(false);
	const userData = useAuth().getUserDetails;
    const checkListID = parseInt(props.match.params.checkListID);
    const trainingID = parseInt(props.match.params.trainingID);

	useEffect(() => {
		dispatch(Actions.getAllQuestions(checkListID));
	}, [dispatch]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	const handleChange = (event) => {
		setSign(event.target.checked);
	  };

	function handleSubmit(model) {
		console.log(model);
		let data = [];
		questions.forEach(q => {
			data.push({
				question: q.question,
				answer: model[q.id]
			});
		})
		let payload = {
			trainingId: checkListID,
			managerId: userData.department.departmentHeadId,
			delegateName: userData.displayName,
			delegateSignature: userData.details.signature,
			checklistId: checkListID,
			data: data
		}
		console.log(payload);
		dispatch(Actions.createAnswer(payload));
	}

	return (
		<Formsy
			onValidSubmit={handleSubmit}
			onValid={enableButton}
			onInvalid={disableButton}
			ref={formRef}
			className="flex flex-col justify-center"
		>
			<div className={classes.formField}>
				<div className={classes.container}>
					<div className={classes.title}>
						<h1>
							<span className={classes.AuthIcon}>
								<LocalAtmRoundedIcon />
							</span>
							Pre-Training Checklist
						</h1>
					</div>
					<div className={classes.texts}>
						<p style={{ textAlign: 'center', fontSize: '20px', marginBottom: '40px' }}>
							Kindly complete this section and submit to the HR Dept at least one – week before the training program
						</p>
						{(questions) ? questions.map(data => {
							return (
							<Grid container spacing="4" key={data.id}>
								<Grid item xs="12">
									<p>{data.question}</p>
									<TextFieldFormsy
										className="mb-16 w-full"
										type="text"
										name={data.id}
										id={data.id}
										variant="outlined"
									/>
								</Grid>
							</Grid>
							);
						}): (<Grid></Grid>)}
						
						<FormControlLabel
							control={<Checkbox checked={sign} onChange={handleChange} name="sign" />}
							label="Sign this document"
						/>
						<Grid alignItems="center" container item sm="12" md="12" lg="12" xl="12">
							<div className={classes.submit}>
								<ProgressBtn  content='Submit' disable={!sign}/>
							</div>
						</Grid>
					</div>
				</div>
			</div>
		</Formsy>
	);
};

export default withReducer('preLearningForm', reducer)(PreLearningForm);;
