import { combineReducers } from 'redux';
import {onboardingReducer } from './onboarding.reducer'

const reducers = combineReducers({
  onboarding: onboardingReducer
});

export default reducers;