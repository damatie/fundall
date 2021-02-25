import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';

import Formsy from 'formsy-react';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProgressBtn from 'app/shared/progressBtn';
import { useHistory } from 'react-router';

function NewExitRequest(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const [details, setDetails] = useState({});

    const effectiveData = [
        "Extremely effectively",
        "Very effectively",
        "Moderately effectively ",
        "Slightly effectively ",
        "Not at all effectively "
    ]

    const [isFormValid, setIsFormValid] = useState(true);
    const formRef = useRef(null);

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function handleSubmit(model) {

        let objectKeys = Object.keys(model);

        let payload = {
            answers: generateAnswer(objectKeys, model)
        };

        Actions.createRequest(payload, history);
    }

    function generateAnswer(questionKeys, model) {
        let answers = [];

        questionKeys.forEach((element, index) => {
            answers.push({
                question: element,
                answer: model[element]
            });
        });

        return answers;
    }

    const handleChange = (name, value) => {
        setDetails(state => ({ ...state, [name]: value }));
    };

    const formInputs = [
        { name: 'question1', label: 'What are your reasons for leaving this company?', validations: "", type: "text" },
        { name: 'question2', label: 'How effectively were your skills put to use at this company?', validations: "", data: effectiveData },
        { name: 'question3', label: 'How much room for professional growth did you have at this company?', validations: "", data: effectiveData },
        { name: 'question4', label: 'How well were you paid for the work you did at this company?', validations: "", data: effectiveData },
        { name: 'question5', label: 'How fairly were you treated by your supervisor at this company? ', validations: "", data: effectiveData },
        { name: 'question6', label: 'How consistently did your supervisor reward you for good work? ', validations: "", data: effectiveData },
        { name: 'question7', label: 'How realistic were the expectations of your supervisor? ', validations: "", data: effectiveData },
        { name: 'question8', label: 'How reasonable were the decisions made by your supervisor? ', validations: "", data: effectiveData },
        { name: 'question9', label: "How often did your supervisor listen to employees' opinions when making decisions? ", validations: "", data: effectiveData },
        { name: 'question10', label: "How easy was it for employees to disagree with the decisions made by your supervisor? ", validations: "", data: effectiveData },
        { name: 'question11', label: "How well did your supervisor handle employee problems? ", validations: "", data: effectiveData },
        { name: 'question12', label: "How well did the members of your team work together to reach a common goal? ", validations: "", data: effectiveData },
        { name: 'question13', label: "In a typical week, how often did you feel stressed at work? ", validations: "", data: effectiveData },
        { name: 'question14', label: "How easy was it to balance your work life and personal life while working at this company? ", validations: "", data: effectiveData },
        { name: 'question15', label: "How safe did you feel at your employer's workplace? ", validations: "", data: effectiveData },
        { name: 'question16', label: "How comfortable was your employer's work environment? ", validations: "", data: effectiveData },
        { name: 'question17', label: "How positive was your employer's work environment? ", validations: "", data: effectiveData },
        { name: 'question18', label: "Was your employer's health insurance plan better, worse, or about the same as those of other employers?", validations: "", data: effectiveData },
        { name: 'question19', label: "What actions can your employer take to build a better workplace? ", validations: "", type: "text" },
        { name: 'question20', label: "Overall, did you like working with your employer, neither like nor dislike it, or dislike it? ", validations: "", data: effectiveData }
    ];

    const exitRequestForm = formInputs.map((input, i) => {

        if (input.type === 'text') {
            return (
                <TextFieldFormsy
                    className="mb-16 w-full"
                    type={input.type}
                    name={input.label}
                    label={input.label}
                    // value={details[input.name]}
                    onChange={(e) => handleChange(input.name, e.target.value)}
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
        }
        else if (input.type === 'date') {
            return (
                <TextFieldFormsy
                    className="mb-16 w-full"
                    type={input.type}
                    name={input.label}
                    label={input.label}
                    // value={details[input.name]}
                    onChange={(e) => handleChange(input.name, e.target.value)}
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
        }
        else {
            return (
                <SelectFormsy
                    className="mb-16 w-full"
                    name={input.label}
                    label={input.label}
                    variant="outlined"
                    required
                    requiredError='Must not be None'
                    // value={details[input.name]}
                    onChange={(e) => handleChange(input.name, e.target.value)}
                >
                    {input?.data?.map((item, i) => (
                        <MenuItem value={item} key={i}>{item}</MenuItem>
                    ))}
                </SelectFormsy>
            )
        }
    });

    return (
        <div className="w-full">
            <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
            >
                <div className={"my-24 md:w-3/4 sm:w-full mx-auto"} >
                    {exitRequestForm}
                    <ProgressBtn content='Apply' disable={!isFormValid} />
                </div>
            </Formsy>
        </div>
    );
}

export default withReducer('NewOpening', reducer)(NewExitRequest);