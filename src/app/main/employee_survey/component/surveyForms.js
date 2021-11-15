import React from 'react'
import { useState,useRef, useEffect } from 'react';
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

//  Input types layout
const multiChoice = (
  <div className=" w-full mt-20">
    <span className="flex"> 
      <span className="  inline-block w-16 h-16  rounded-full border border-grey-A800"></span>
      <span className=" capitalize pl-10 text-12 text-grey-A800">Option 1</span>
    </span>
    <span className="flex mt-10"> 
      <AddIcon style={{ fontSize: 15 }} />
      <span className=" capitalize pl-10 text-12 text-grey-A800">Add Option </span>
    </span>
  </div>
)

const checkBox = (
  <div className=" w-full mt-20">
    <span className="flex"> 
      <span className="  inline-block w-16 h-16  rounded-sm border border-grey-A800"></span>
      <span className=" capitalize pl-10 text-12 text-grey-A800">Option 1</span>
    </span>
    <span className="flex mt-10"> 
      <AddIcon style={{ fontSize: 15 }} />
      <span className=" capitalize pl-10 text-12 text-grey-A800">Add Option </span>
    </span>
  </div>
)
   
const surveyForms = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state => state.surveyForms.selected ))
  const [showInputTypeList,setShowInputTypeList] = useState(false)
  const [inputType,setInputType] = useState(null)
  const [inputTypeIcon,setInputTypeIcon] = useState()
  const [isRequired, setIsRequired] = useState( false )
  const [inputTypeSelected, setInputTypeSelected] = useState( null)
  const compRef = useRef();

  // handle selected input type option
  function handleSelected(name,value,icon) {
    setInputTypeIcon(icon)
    setInputType(name)
    switch(value) {
      case 'multipleChoice':
        return setInputTypeSelected(multiChoice);
        break;
        case 'checkBox':
        return setInputTypeSelected(checkBox);
        break;
      default:
        return setInputTypeSelected(null);
    }
  }
  // handle dropdown event hide when click outside
  const handleClick = e => {
    if (compRef.current?.contains(e.target)) {
      // when dropdown  is clicked show list
      setShowInputTypeList(true)
      // inside click
      return;
    }
    // when dropdown  is clicked close list
    setShowInputTypeList(false)
  };
   // 
   useEffect(() => {
    // document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  // intial event
  useEffect(() => {
	  dispatch(allSurveyFormActions.selectedInputType())
    console.log(reducer)
	}, [dispatch]);

 


  return(
    <div className=" flex  w-full relative ">
      <Cards className="w-7/12 mx-auto py-10 px-16 rounded-20px shadow-10 ">
       value {counter}
        <div className=" mb-24 ">
        <span className=" text- px-10 py-6 rounded-md cursor-pointer text-12 font-medium flex w-64 float-right mb-20" style={{background:'#61DAFB', color:'#242B63'}}>
        <AddIcon style={{ fontSize: 15 }} /> Add
        </span>
        </div>
        <div className="flex  w-full">
        <div className=" flex-none w-7/12 inline-block ">
            <TextField
            required
            label="Question"
            defaultValue="Hello World"
            variant="outlined"
            style ={{width: '90%'}}
          />
         
        </div>
        <div className=" w-320 border border-grey-A800 rounded  pt-8 leading-8 pl-16 pr-5 cursor-pointer "  onClick={ ()=>setShowInputTypeList(!showInputTypeList)}>
          <span className=" inline-block text-grey-A800" style={{ fontSize: 15 }}>
           {inputTypeIcon}
          </span>
          <span className=" flex-1 px-6 text-12">
          {inputType === null? 'Select Input Type' : inputType}
             </span>
          <span className=" inline-block -mt-5 float-right text-right cursor-pointer text-grey-A800 ">
            <ArrowDropDownIcon style={{ fontSize: 30 }}/>
          </span>
        </div>
        </div>
        {inputTypeSelected}
        <div className="mt-10">
          <span className=" float-right -mt-8 pl-10">
            <span className="text-grey-A800 text-13"> Required</span>
              <SwitchButton checked={isRequired} onChange={()=> setIsRequired(!isRequired)} /> 
         </span>
          <span className=" float-right bg-red-100 px-6 py-2 rounded-lg cursor-pointer">
            <DeleteOutlineIcon style={{ color:'#FF3030',fontSize: 16}}/>
          </span>
        </div>
        
      </Cards>
     { !showInputTypeList? "" :
    
      <div className=" block w-288  inputTypeOptions " id="topToBottom">
      <Cards  className=" block  py-4 px-16 rounded-20px shadow-10 mb-32 "  ref={compRef}>
        <ul className="block">
          {
            inputTypes.map((name, index)=>
              <li className=" block inputTypeOptionsLi" key={index} onClick={() => handleSelected(name.name,name.value,name.icon)}>
                <span className="  w-full px-4 block" >
                  <span style={{ fontSize: 26, color:'#00CCF2'}}>
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
  )
}

export default withReducer('surveyForms',reducer, ) (surveyForms )