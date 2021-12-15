
import React from 'react'
import Cards from 'app/shared/cards/cards'
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Radio from '@material-ui/core/Radio';
import { useDispatch, useSelector } from 'react-redux';
import * as allSurveyFormActions  from '../store/actions'
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import SurveyForms from './surveyForms';



 function surveyQuestion() {
	const dispatch = useDispatch();
	const stateData = useSelector((state => state.surveyForms.surveyFormsReducer ))

	function handleDeleteSurveyQuestion (surveyId,questionId) {
		dispatch(allSurveyFormActions.deleteSurveyQuestion(surveyId,questionId));
	}

	function handleEditOneSurveyQuestion (id, value) {
		dispatch(allSurveyFormActions.editOneSurveyQuestion(id, value));
	}

  const handleChange = (event) => {
  };
	console.log()
	 
	return(
		<div className=" flex flex-col   relative ">
			{ stateData.getSurveyQuestions.map((surveyQuestion, surveyQuestionIndex) =>
			<div key={surveyQuestionIndex}>
				{stateData?.isEdit === true? 
					<div className=" mb-32">
						<SurveyForms surveyQuestionId={surveyQuestionIndex}/>
					</div> : 
					<div> 
						<Cards className="w-7/12 mx-auto py-10 px-16 mb-40 rounded-20px shadow-10  break-words">
								<div className="w-full" style={{fontSize:14, fontWeight:700,}}>
									<span> {surveyQuestion.required}</span>
										{surveyQuestion.body}
										{ surveyQuestion.required === true? 
										<span style={{color:'#FF3030'}}> * </span>
										:
										""	
										}
										
								</div>
								{	surveyQuestion.options.map((option, optionIndex) =>
									<div className="w-full flex" style={{fontSize:14,}} key={optionIndex}> 

									{surveyQuestion.type  ==='multiChoice'? 
									<span>
									<Radio
										name="radio-button"
										inputProps={{ 'aria-label': 'A' }}
							/>
							</span>
									: surveyQuestion.type ==='checkBox'? 	
									<span>
											<Checkbox
												inputProps={{ 'aria-label': 'primary checkbox' }}
											/>
									</span>
									: '' }
								
										<span className="  leading-10 pt-2">
											{option}
										</span>
									</div>
									)
								}
								{ stateData.isEdit === false?
									<div className=" w-full"> 
									<span className=" float-right bg-red-100 px-6 py-2 rounded-lg cursor-pointer" onClick={()=>handleDeleteSurveyQuestion(stateData.surveyId,surveyQuestion.id)}>
										<DeleteOutlineIcon style={{ color:'#FF3030',fontSize: 16}}/>
									</span>
									<span
									className=" float-right bg-light-blue-50 rounded-lg px-6 py-2  cursor-pointer font-800 mr-16" 
									onClick={()=> handleEditOneSurveyQuestion(surveyQuestionIndex,!surveyQuestion.isEdit)}
									>
										<EditIcon  style={{ color:'#62DAFC',fontSize: 16}} /> 
									</span>
								</div>
								:
								""
								}
						</Cards>
					</div>
 				}
			</div>
			
			)
			}
		</div>
	)
}
export default withReducer('surveyQuestion',reducer, ) (surveyQuestion )