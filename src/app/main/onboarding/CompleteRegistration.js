import React from 'react';
import Card from '@material-ui/core/Card';
import EmployeeInfoForm from 'app/main/employeeInformation/components/EmployeeInfoForm';
import CustomStepper from './components/CustomStepper';
import DisplayEmployeeInfo from './components/DisplayEmployeeInfo';
import SharedModal from 'app/shared/modal/SharedModal';
import { AddEducationalQualification } from 'app/main/employeeInformation/components/EducationalQualifications';
import { AddEmergencyContact } from 'app/main/employeeInformation/components/EmergencyContacts';
import { AddSpouseAndDependant } from 'app/main/employeeInformation/components/SpouseAndDependants';
import { useSelector, useDispatch } from 'react-redux';
import { AddEmployeeNextOfKin } from 'app/main/employeeInformation/components/EmployeeNextOfKin';
import reducers from './store/reducers';
import withReducer from 'app/store/withReducer';
import { getEmployeeInfo, getEducation, getSpouseDependant, getNextOfKin, getEmergencyContact } from 'app/main/employeeInformation/store/actions';

const inputs = {
  spouseDependant: [
    {
      name: 'firstName',
      label: 'First Name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
    },
    {
      name: 'birthday',
      label: 'Birthday',
    },
    {
      name: 'nationality',
      label: 'Nationality',
    },
    {
      name: 'educationalLevel',
      label: 'Educational Level',
    },
    {
      name: 'relationship',
      label: 'Relationship',
    },
  ],
  nextOfKin: [
    {
      name: 'firstName',
      label: 'First Name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
    },
    {
      name: 'gender',
      label: 'Gender',
    },
    {
      name: 'birthday',
      label: 'Birthday',
    },
    {
      name: 'nationality',
      label: 'Nationality',
    },
    {
      name: 'address',
      label: 'Address',
    },
    {
      name: 'phoneNo',
      label: 'Contact Number',
    },
    {
      name: 'relationship',
      label: 'Relationship',
    },
  ],
  emergencyContact: [
    {
      name: 'firstName',
      label: 'First Name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
    },
    {
      name: 'address',
      label: 'Address',
    },
    {
      name: 'contactNumber',
      label: 'Contact Number',
    },
    {
      name: 'nationality',
      label: 'Nationality',
    },
    {
      name: 'gender',
      label: 'Gender',
    },
    {
      name: 'relationship',
      label: 'Relationship',
    },
  ],
  education: [
    {
      name: 'school',
      label: 'Institute/School',
    },
    {
      name: 'department',
      label: 'Major/Department',
    },
    {
      name: 'grade',
      label: 'Grade',
    },
    {
      name: 'qualification',
      label: 'Qualification',
    },
    {
      name: 'startYear',
      label: 'Start Year',
    },
    {
      name: 'endYear',
      label: 'End Year',
    },
  ]
}

const { useState, useEffect } = React;

const CompleteRegistration = () => {

  const { 
    auth: {
      user: {
        id,
      }
    },
    employeeInformation: {
      education,
      emergencyContact,
      nextOfKin,
      spouseDependant
    }
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const [config, setConfig] = useState({
    open: false,
    title: ''
  });

  useEffect(() => {
    dispatch(getEmployeeInfo(id));
    dispatch(getEducation(id));
    dispatch(getSpouseDependant(id));
    dispatch(getNextOfKin(id));
    dispatch(getEmergencyContact(id));
  }, [])

  const handleOpen = (title) => () => {
    setConfig({
      open: true,
      title,
    });
  };

  const handleClose = () => {
    setConfig({
      open: false,
      title: '',
    });
  }

  return (
    <section className='p-20'>
      <Card variant="outlined" className="w-full">
        <CustomStepper>
          {
            ({ activeStep, handleNext }) => (
              <>
                {
                  activeStep === 0 && (
                    <EmployeeInfoForm handleClick={handleNext}/>
                  )
                }
                {
                  activeStep === 1 && (
                    <DisplayEmployeeInfo
                      title='Spouse / Dependants'
                      data={spouseDependant.data}
                      inputs={inputs.spouseDependant}
                      handleClick={handleOpen}
                    />
                  )
                }
                {
                  activeStep === 2 && (
                    <DisplayEmployeeInfo
                      title='Employee Next of Kin'
                      data={nextOfKin.data}
                      inputs={inputs.nextOfKin}
                      handleClick={handleOpen}
                    />
                  )
                }
                {
                  activeStep === 3 && (
                    <DisplayEmployeeInfo
                      title='Emergency Contact'
                      data={emergencyContact.data}
                      inputs={inputs.emergencyContact}
                      handleClick={handleOpen}
                    />
                  )
                }
                {
                  activeStep === 4 && (
                    <DisplayEmployeeInfo
                      title='Educational Qualification'
                      data={education.data}
                      inputs={inputs.education}
                      handleClick={handleOpen}
                    />
                  )
                }
              </>
            )
          }
        </CustomStepper>
      </Card>
      <SharedModal
        title={config.title}
        open={config.open}
        handleClose={handleClose}
      >
        {config.title === 'Educational Qualification' && (<AddEducationalQualification />)}
        {config.title === 'Emergency Contact' && (<AddEmergencyContact />)}
        {config.title === 'Spouse / Dependants' && (<AddSpouseAndDependant />)}
        {config.title === 'Employee Next of Kin' && (<AddEmployeeNextOfKin />)}
      </SharedModal>
    </section>
  );
};

export default withReducer('employeeInformation', reducers)(CompleteRegistration);