
import React from 'react'
import { useState,useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Cards from 'app/shared/cards/cards'
import SwitchButton from '../../../shared/button/SwitchButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import * as allSurveyFormActions  from '../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';


 function surveyQuestion() {
	const dispatch = useDispatch();
	const surveyQuestions = useSelector((state => state.surveyForms.surveyFormsReducer.surveyQuestion ))

  const handleChange = (event) => {
  };

	//  // Intial event
	//  useEffect(() => {
	//   dispatch(allSurveyFormActions.getSurveyQuestion())
	// }, [dispatch]);

	 
	return(
		<div className=" flex flex-col   relative ">

			{ surveyQuestions.map((surveyQuestion, surveyQuestionIndex) =>
			
				<Cards className="w-7/12 mx-auto py-10 px-16 mb-40 rounded-20px shadow-10  break-words" key={surveyQuestionIndex}>
					<div className="w-full" style={{fontSize:14, fontWeight:700,}}>
					<span> {surveyQuestion.isRequired}</span>
						{surveyQuestion.body}
						
					</div>
				{	surveyQuestion.options.map((option, optionIndex) =>
				<div className="w-full flex" style={{fontSize:14,}} key={optionIndex}> 

					{surveyQuestion.selected  ==='multiChoice'? 
					<span>
					<Radio
						name="radio-button"
						inputProps={{ 'aria-label': 'A' }}
      />
			</span>
					: surveyQuestion.selected ==='checkBox'? 	
					<span>
							<Checkbox
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
					</span>
					 : '' }
				
						<span className="  leading-10 pt-2">
							{option.name}
						</span>
					</div>
						)
					}
					<span className=" float-right  cursor-pointer font-800 "> Delete</span>
					<span className=" float-right  cursor-pointer font-800 pr-16"> Edit</span>
					
			</Cards>
			)
			}
		</div>
	)
}
export default withReducer('surveyQuestion',reducer, ) (surveyQuestion )