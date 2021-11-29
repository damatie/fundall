
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


 function surveyQuestion(props) {
	const dispatch = useDispatch();
	const stateData = useSelector((state => state.surveyForms.surveyFormsReducer ))

	function handleDeleteSurveyQuestion (id) {
		dispatch(allSurveyFormActions.deleteSurveyQuestion(id));
	}

	function handleEditOneSurveyQuestion (id, value) {
		dispatch(allSurveyFormActions.editOneSurveyQuestion(id, value));
	}

  const handleChange = (event) => {
  };
	 
	return(
		<div className=" flex flex-col   relative ">

			{ stateData.surveyQuestion.map((surveyQuestion, surveyQuestionIndex) =>
			<div key={surveyQuestionIndex}>
				{surveyQuestion.isEdit === true? 
					<div className=" mb-32">
						<SurveyForms surveyQuestionId={surveyQuestionIndex}/>
					</div> : 
					<Cards className="w-7/12 mx-auto py-10 px-16 mb-40 rounded-20px shadow-10  break-words" >
						<div className="w-full" style={{fontSize:14, fontWeight:700,}}>
							<span> {surveyQuestion.isRequired}</span>
								{surveyQuestion.body}
								{ surveyQuestion.isRequired === true? 
								<span style={{color:'#FF3030'}}> * </span>
								:
								""	
								}
								
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
						{ stateData.isEdit === false?
							<div className=" w-full"> 
							<span className=" float-right bg-red-100 px-6 py-2 rounded-lg cursor-pointer" onClick={()=>handleDeleteSurveyQuestion(surveyQuestionIndex)}>
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
 				}
			</div>
			
			)
			}
		</div>
	)
}
export default withReducer('surveyQuestion',reducer, ) (surveyQuestion )