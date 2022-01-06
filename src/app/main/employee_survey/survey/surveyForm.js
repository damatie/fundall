import React from 'react'
import PageLayout from 'app/shared/pageLayout/PageLayout'
import Button from '@material-ui/core/Button';
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
import SurveyForms from '../component/surveyForms'
import {useState,useEffect,useLayoutEffect } from 'react';
import Cards from 'app/shared/cards/cards'
import {useHistory, useParams } from 'react-router-dom'
import SurveyQuestion from '../component/surveyQuestion'
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch, useSelector } from 'react-redux';
import * as allSurveyFormActions  from '../store/actions'
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import SurveyLoader from '../utils/surveyLoader';


const surveyForm = () =>{
  // Get one survey id 
  const { id } = useParams()
  const   surveyId = id
  const history = useHistory()
  const dispatch = useDispatch();
  const stateData = useSelector((state => state.surveyForms.surveyFormsReducer ))
  let newData = {
    body:stateData.body,
    options: [...stateData.optionsArray],
    type:stateData.selected,
    required: stateData.isRequired,
    description: "Choose your test"
   
 }

 // Intial event
 useLayoutEffect(() => {
  dispatch(allSurveyFormActions.getOneSurvey(surveyId))
    dispatch(allSurveyFormActions.getSurveyQuestions(surveyId))
  }, [dispatch]);



  
  
  return (
    <PageLayout
      header={{
      icon: '',
      title: ' Survey Form',
      handleSearch: ({ target: { value } }) => console.log(value)
      }}
      button = {{
      showButton: true,
      btnComponent:(
        <Button
          variant="contained"
          color="secondary"
          onClick={()=>console.log('modal opened')}
          startIcon={<SaveIcon/>}
        >
          Save Survey
        </Button>
      )
      }}
      content={
      <div className=" w-10/12 py-28 mx-auto">
         {stateData.isLoading!== false? <SurveyLoader/>:
         <div className="w-full">
          <div className=" flex  w-full cursor-pointer" onClick={() => history.goBack()}>
            <p className="inline-block capitalize text-blue-800">
                Surveys 
            </p>
            <DoubleArrowRoundedIcon className="text-20 mx-6 text-black" />
            <p className="font-semibold"> {stateData.getOneSurvey.surveyInfo.title}</p>
          </div>
          
          <div className="w-full">
            <span className="block text-sm text-night font-bold mt-24">
              {stateData.getOneSurvey.surveyInfo.title}
            </span
            <span className=" block text-black text-xs w-5/12 pt-16 leading-relaxed font-semibold ">
            {stateData.getOneSurvey.surveyInfo.description}
            </span>
          </div>
          </div>
          }
        <div className=" mt-72">
          {stateData.isLoading!== false? 
          <Cards className="w-7/12 mx-auto py-10 px-16 mb-40 rounded-20px shadow-10  break-words">
              <SurveyLoader/>
          </Cards>
          :
          <SurveyQuestion/>
          }

         { stateData.isEdit?.status === false?
         <SurveyForms surveyId={surveyId}  newData={newData} />: " "
         }
          
        </div>
      </div>
      }
    />
  )
}
export default withReducer('surveyForm',reducer, ) (surveyForm )
