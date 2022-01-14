
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

	function handleDeleteSurveyQuestion (surveyId,questionId, index) {
		dispatch(allSurveyFormActions.deleteSurveyQuestion(surveyId,questionId, index));
	}

	function handleEditOneSurveyQuestion (surveyId,questionId,index) {
		
		dispatch(allSurveyFormActions.editOneSurveyQuestion(surveyId,questionId,index));
	}

  let newData = {
    body:stateData.body,
    options: [...stateData.optionsArray],
    type:stateData.selected,
    required: stateData.isRequired,
    description: "Choose your test"
   
 }
	return(
		<div className=" flex flex-col   relative ">
			{ stateData.getSurveyQuestions.length === 0? 
			<Cards className="w-7/12 mx-auto py-10 px-16 mb-40 rounded-20px shadow-10  break-words">
				<span className=' block  text-20 font-700'> No questions found </span>
				<span className=' block text-16 font-500 mt-4'>Kindly create one</span>
			</Cards>
			:
			""
			}
		
			{ stateData.getSurveyQuestions.sort((a,b) => (a.id - b.id)).map((surveyQuestion, surveyQuestionIndex) =>
			<div key={surveyQuestionIndex}>
				{stateData?.isEdit?.index === surveyQuestionIndex? 
					<div className=" mb-32">
						<SurveyForms questionIndex={surveyQuestionIndex} surveyId={stateData.surveyId} surveyQuestionId={surveyQuestion.id} newData={newData}/>
					</div> : 
					<div> 
						<Cards className="w-7/12 mx-auto py-10 px-16 mb-40 rounded-20px shadow-10  break-words">
							{stateData.isRequired}
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

									{surveyQuestion.type  ==='Multiple Choice'? 
									<span>
									<Radio
										name="radio-button"/>
							</span>
									: surveyQuestion.type ==='Check Box'? 	
									<span>
											<Checkbox/>
									</span>
									: '' }
								
										<span className="leading-10 pt-2">
											{option}
										</span>
									</div>
									)
								}
								{ stateData.isEdit.status === false ?
									<div className=" w-full">
									<span className=" float-right bg-red-100 px-6 py-2 rounded-lg cursor-pointer" onClick={()=>handleDeleteSurveyQuestion(stateData.surveyId,surveyQuestion.id,surveyQuestionIndex)}>
										<DeleteOutlineIcon style={{ color:'#FF3030',fontSize: 16}}/>
									</span>
									<span
									className=" float-right bg-light-blue-50 rounded-lg px-6 py-2  cursor-pointer font-800 mr-16" 
									onClick={()=> handleEditOneSurveyQuestion(stateData.surveyId,surveyQuestion.id,surveyQuestionIndex )}
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