import React from 'react'
import { useState,useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Cards from 'app/shared/cards/cards'
import AddIcon from '@material-ui/icons/Add';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SwitchButton from '../../../shared/button/SwitchButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Grow from '@material-ui/core/Grow';

// List Of Input Types
const inputType = [
  { name:'Multiple Choice'},
  { name:'Dropdown '},
  { name:'Image Type '},
  { name:'Rating Scale '},
  { name:'Ranking '},
  { name:'Matrix Choice '},
  { name:'Matrix Dropdown '},
  { name:'Single Line '},
  { name:'Multiple Line '},
  { name:'Numeric '},
  
 ]
   
const surveyForms = () => {
  const [showInputOption,setShowInputOption] = useState(false)
  const [isRequired, setIsRequired] = useState( false )
  const compRef = useRef();
  console.log(isRequired)

  // handle dropdown event hide when click outside
  const handleClick = e => {
    if (compRef.current?.contains(e.target)) {
      // inside click
      return;
    }
    // when outside is clicked
    setShowInputOption(false)
  };
  // intial event
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);


  return(
    <div className=" flex  w-full relative ">
      <Cards className="w-7/12 mx-auto py-10 px-16 rounded-20px shadow-10 ">
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
        <div className=" w-320 border border-grey-A800 rounded  pt-8 leading-8 pl-16 pr-5 ">
          <span className=" inline-block text-grey-A800">
            <RadioButtonCheckedIcon style={{ fontSize: 17 }}/>
          </span>
          <span className=" flex-1 px-6 text-12"> Multiple Choice </span>
          <span className=" inline-block -mt-5 float-right text-right cursor-pointer text-grey-A800 " onClick={ ()=>setShowInputOption(!showInputOption)}>
            <ArrowDropDownIcon style={{ fontSize: 30 }}/>
          </span>
        </div>
        </div>
        <div className=" w-full mt-20">
        <span className="flex"> 
          <span className="  inline-block w-16 h-16  rounded-full border border-grey-A800"></span>
          <span className=" capitalize pl-10 text-12 text-grey-A800">Option 1</span>
        </span>
        <span className="flex mt-10"> 
          <AddIcon style={{ fontSize: 15 }} />
          {/* <span className="  inline-block w-16 h-16  rounded-full border"></span> */}
          <span className=" capitalize pl-10 text-12 text-grey-A800">Add Option </span>
        </span>
        </div>
        <div className="">
          <span className=" float-right -mt-8 pl-10">
            <span className="text-grey-A800 text-13"> Required</span>
              <SwitchButton checked={isRequired} onChange={()=> setIsRequired(!isRequired)} /> 
         </span>
          <span className=" float-right bg-red-100 px-6 py-2 rounded-lg cursor-pointer">
            <DeleteOutlineIcon style={{ color:'#FF3030',fontSize: 16}}/>
          </span>
        </div>
      </Cards>
     { !showInputOption? "" :
    
      <div className=" block w-288  inputTypeOptions " id="topToBottom">
      <Cards  className=" block  py-4 px-16 rounded-20px shadow-10 mb-32 "  ref={compRef}>
        <ul className="block">
          {
            inputType.map((name, index)=>
              <li className=" block inputTypeOptionsLi" key={index} >
                <span className="  w-full px-4 block  ">
                  <RadioButtonCheckedIcon style={{ fontSize: 26, color:'#00CCF2'}}/>
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
export default surveyForms 