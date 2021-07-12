import { combineReducers } from 'redux';
import educationReducer from 'app/main/employeeInformation/store/reducers/education.reducer';
import travelReducer from 'app/main/employeeInformation/store/reducers/travel.reducer';
import trainingReducer from 'app/main/employeeInformation/store/reducers/training.reducer';
import emergencyContactReducer from 'app/main/employeeInformation/store/reducers/emergencyContact.reducer';
import spouseDependantReducer from 'app/main/employeeInformation/store/reducers/spouseDependant.reducer';
import nextOfKinReducer from 'app/main/employeeInformation/store/reducers/nextOfKin.reducer';
import employeeInfoReducer from 'app/main/employeeInformation/store/reducers/employeeInfo.reducer';
import onboardingForms from './onboardingForms.reducer';
import referenceDetails from './referenceDetails.reducer';
import uploadForms from './uploadForms.reducer';

const reducers = combineReducers({
  education: educationReducer,
  travel: travelReducer,
  training: trainingReducer,
  emergencyContact: emergencyContactReducer,
  spouseDependant: spouseDependantReducer,
  nextOfKin: nextOfKinReducer,
  employeeInfo: employeeInfoReducer,
  onboardingForms,
  referenceDetails,
  uploadForms
});

export default reducers;