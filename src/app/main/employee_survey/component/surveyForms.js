import React from 'react'
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Cards from 'app/shared/cards/cards'
import AddIcon from '@material-ui/icons/Add';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SwitchButton from '../../../shared/button/SwitchButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
import ExposureIcon from '@material-ui/icons/Exposure';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import * as allSurveyFormActions  from '../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';


// List Of Input Types
const inputTypes = [
  { name:'Multiple Choice', value:'multipleChoice', icon:<RadioButtonCheckedIcon/>},
  { name:'Checkbox', value:'checkBox', icon:<CheckBoxIcon/>},
  { name:'Image Type', value:'imageType', icon:<CropOriginalIcon/>},
  { name:'Single Line', value:'singleLine',icon:<ShortTextIcon/>},
  { name:'Multiple Line ', value:'multipleLine', icon:<SubjectIcon/>},
  { name:'Numeric ', value:'numeric', icon:<ExposureIcon/>},
  { name:'Rating Scale', value:'ratingScale', icon:''},
  { name:'Ranking ', value:'ranking', icon:''},
  { name:'Matrix Choice ', value:'matrixChoice', icon:''},
  { name:'Matrix Dropdown ', value:'matrixDropdown', icon:''},
]


const surveyForms = (props) => {
  const{newData,surveyId, surveyQuestionId} = props
  // Using redux
  const dispatch = useDispatch();
  const stateData = useSelector((state => state.surveyForms.surveyFormsReducer ))
  // Using useState
  const [showInputTypeList,setShowInputTypeList] = useState(false)
  const [inputTypeIcon,setInputTypeIcon] = useState()
 //  Input types layout
  // Radio input
  const multiChoice = (
    <div className=" w-full mt-20">
       { stateData.optionsArray?.map((option, index) =>

          <span className="flex pb-16" key={index}> 
            <span className="  inline-block w-16 h-16  mt-8 rounded-full border border-grey-A800"></span>
              <span className=" capitalize pl-10 text-12 text-grey-A800 inline-block w-8/12 ">
              <TextField value={option } className=" float-right w-full"  onChange={ (e) => handelUpdateOptionsArray(e.target.value,index)} />
            </span>
            <span className=" text-red-400 font-700 pt-10 pl-20 cursor-pointer" onClick={() =>handleRemoveOption(index)}> Remove </span>
          </span>
          )
        }

      <span className="flex"> 
        
      </span>
      <span className="flex mt-16">
        <AddIcon style={{ fontSize: 15 }} />
        <span className=" capitalize pl-10 text-12 text-grey-A800" onClick={()=> handleAddOption('multiChoice')}>
          Add Option </span>
      </span>
    </div>
  )
  //  Checkbox input
  const checkBox = (
    <div className=" w-full mt-20">
        {stateData.optionsArray?.map((option, index) =>
          <span className="flex pb-16" key={index}> 
          <span className="  inline-block w-16 h-16  rounded-sm border border-grey-A800 mt-8"></span>
          <span className=" capitalize pl-10 text-12 text-grey-A800 inline-block w-8/12 ">
              <TextField value={option } className=" float-right w-full"  onChange={ (e) => handelUpdateOptionsArray(e.target.value,index)} />
          </span>
            <span className=" text-red-400 font-700 pt-10 pl-20 cursor-pointer" onClick={() =>handleRemoveOption(index)}> Remove </span>
        </span>
          )
        }

    <span className="flex mt-16" > 
    <AddIcon style={{ fontSize: 15 }} />
    <span className=" capitalize pl-10 text-12 text-grey-A800" 
      onClick={()=> handleAddOption('checkBox')}>
          Add Option 
    </span>
    </span>
      
    </div>
  )

  // Handle selected input type option
  function handleSelected(name,value,icon) {
    setInputTypeIcon(icon)
    switch(value) {
      case 'multipleChoice':
        return dispatch(allSurveyFormActions.inputTypeSelected('multiChoice', name));
        break;
        case 'checkBox':
        return dispatch(allSurveyFormActions.inputTypeSelected('checkBox',  name));
        break;
      default:
        return dispatch(allSurveyFormActions.inputTypeSelected(null, name));
    }
  }
// Handle add option
  function handleAddOption () {
    dispatch(allSurveyFormActions.addNewOption());
  }
 
  // Handle remove option
  function handleRemoveOption (id) {
    dispatch(allSurveyFormActions.removeOption(id));
   }

  //  Handle update Options Array
   function handelUpdateOptionsArray(value,id){
    dispatch(allSurveyFormActions.updateOption(value,id));
   }
  //  Handle update body
  function handleUpdateBody(value){
    dispatch(allSurveyFormActions.updateBody(value));
  }
  //  Handle add survey question
  function handleAddSurveyQuestion(id,data) {
    dispatch(allSurveyFormActions.addSurveyQuestion(id, data));
  }
  // Handle update survey question
  function handleOneUpdateSurveyQuestion (id, value){
    dispatch(allSurveyFormActions.updateOneSurveyQuestion(id, value));
  }

  function handleIsRequired() {
    dispatch(allSurveyFormActions.setIsRequired(!stateData.isRequired));
  }

  // Intial event
  useEffect(() => {
	  dispatch(allSurveyFormActions.inputTypeSelected(null, null))
	}, [dispatch]);

  return(
    <div className="w-full">
        <div className=" flex  w-full relative ">
          
          <Cards className="w-7/12 mx-auto py-10 px-16 rounded-20px shadow-10 ">
        
          <div className=" mb-24 ">
            {
            stateData.inputType === null && stateData.isEdit === true?

            <span className=" text- px-10 py-6 rounded-md cursor-pointer text-12 font-medium flex w-64 float-right mb-20" style={{background:'#61DAFB', color:'#242B63'}} onClick={()=>handleOneUpdateSurveyQuestion(surveyQuestionId, !stateData.isEdit)}>
            <AddIcon style={{ fontSize: 15 }} /> Edit
            </span>
              :
              <span className=" text- px-10 py-6 rounded-md cursor-pointer text-12 font-medium flex w-64 float-right mb-20" style={{background:'#61DAFB', color:'#242B63'}} onClick={()=>handleAddSurveyQuestion(surveyId,newData)}>
              <AddIcon style={{ fontSize: 15 }} /> Add
              </span>

              }
             
          </div>
          <div className="flex  w-full">
          <div className=" flex-none w-7/12 inline-block ">
              <TextField
              onChange={(e)=>handleUpdateBody(e.target.value)}
              required
              label="Question"
              value={stateData.body} 
              variant="outlined"
              style ={{width: '90%'}}
            />
          
          </div>
          <div className=" w-320 border border-grey-A800 rounded  pt-8 leading-8 pl-16 pr-5 cursor-pointer "  onClick={ ()=>setShowInputTypeList(!showInputTypeList)}>
            <span className=" inline-block text-grey-A800" style={{ fontSize: 15 }}>
            {inputTypeIcon}
            </span>
            <span className=" flex-1 px-6 text-12">
            {stateData.inputType === null? 'Select Input Type' : stateData.inputType}
              </span>
            <span className=" inline-block -mt-5 float-right text-right cursor-pointer text-grey-A800 ">
              <ArrowDropDownIcon style={{ fontSize: 30 }}/>
            </span>
          </div>
          </div>
          {stateData.selected ==='multiChoice'?   multiChoice : stateData.selected ==='checkBox'? checkBox : '' }
          <div className="mt-10">
            <span className=" float-right -mt-8 pl-10">
              <span className="text-grey-A800 text-13"> Required</span>
                <SwitchButton checked={stateData.isRequired} onChange={()=>handleIsRequired()} /> 
            </span>
          </div>
          
          </Cards>
          {/*End Survey Questions */}
          { !showInputTypeList? "" :
          <div className=" block w-288  inputTypeOptions " id="topToBottom">
          <Cards  className=" block  py-4 px-16 rounded-20px shadow-10 mb-32 "  >
            <ul className="block">
              {
                inputTypes.map((name, index)=>
                  <li className=" block inputTypeOptionsLi" key={index} onClick={() => handleSelected(name.name,name.value,name.icon)}>
                    <span className="  w-full px-4 block" >
                      <span style={{ fontSize: 20, color:'#00CCF2'}}>
                      {name.icon}
                      </span>
                      <span className="pl-20 font-semibold">
                      {name.name}
                    </span>
                  </span>
                  </li>)
                }
            </ul>
          </Cards>
          </div>
        }
        
        </div>
    </div>
  )
}

export default withReducer('surveyForms',reducer, ) (surveyForms )