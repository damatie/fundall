import React from 'react'
import PageLayout from 'app/shared/pageLayout/PageLayout'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SurveyForms from '../component/surveyForms'
import SaveIcon from '@material-ui/icons/Save';


const surveyForm = () =>{
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
        <div className="w-full">
          <span className="block text-sm text-night font-bold mt-10">
            Company Policy Survey
          </span>
          <span className=" block text-black text-xs w-5/12 pt-16 leading-relaxed font-semibold ">
            Do not read me, i am an uninspirational dummy text. I am standing in place of  an important information, the bos tag should be explanator enough. 
          </span>
        </div>
        <div className=" mt-72">
          <SurveyForms/>
        </div>
      </div>
      }
    />
  )
}
export default surveyForm