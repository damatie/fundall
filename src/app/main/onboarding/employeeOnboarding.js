import React, { useEffect, useState } from 'react';
import Onboarding from 'app/shared/onboarding/onboarding';
import withReducer from 'app/store/withReducer';
// import * as Actions from '../store/actions';
import reducer from 'app/main/employee/store/reducer';
import { useDispatch } from 'react-redux';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IDCardIssuanceForm from '../../shared/onboarding/onboardingForms/IDCardIssuanceForm';
import MalariaPreventionProgramAttestation from '../../shared/onboarding/onboardingForms/MalariaPreventionProgramAttestation';
import AuthorizationFormForDDORE from '../../shared/onboarding/onboardingForms/AuthorizationFormForDDORE';
import AuthorizationForPayrollDeductions from '../../shared/onboarding/onboardingForms/AuthorizationForPayrollDeductions';
import EmployeeHandbookAcknowledgement from '../../shared/onboarding/onboardingForms/EmployeeHandbookAcknowledgement';
import CompanyAssetAcknowledgeForm from '../../shared/onboarding/onboardingForms/CompanyAssetAcknowledgeForm';
import CompanyPolicyAcknowledgementForm from '../../shared/onboarding/onboardingForms/CompanyPolicyAcknowlegementForm';
import AxaMansardEnrollmentTemplate from '../../shared/onboarding/onboardingForms/AxamansardEnrollmentTemplate';
import MalaroneMalanilAcknowledgementForm from '../../shared/onboarding/onboardingForms/MalaroneMalanilAcknowledgementForm';
import SRGEmploymentDataSheet from '../../shared/onboarding/onboardingForms/SRGEmploymentDataSheet';


const useStyles = makeStyles({
	layoutRoot: {}
});

const EmployeeOnboarding = () => {

  const classes = useStyles();
	const dispatch = useDispatch();

	const [malariaPPA, setMalariaPPA] = useState({});
	
  // useEffect(() => {
  //   dispatch(Actions.getEmployeeProfile());
	// }, []);
	

  return (
    <FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="flex flex-col flex-1 p-24">
					<div className="flex items-center py-24">
						<div className="flex-1">
              <div className="flex items-center flex-1">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <Icon className="text-32">check_box</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <span className="text-24 mx-16">Onboarding forms</span>
                </FuseAnimate>
              </div>
						</div>
					</div>
				</div>
			}
			content={
				<div className="p-24">
					<br />
					<br />
					<SRGEmploymentDataSheet />
					<br />
					<br />
					<CompanyPolicyAcknowledgementForm />
					<br />
					<br />
					<MalaroneMalanilAcknowledgementForm />
					<br />
					<br />
					<AxaMansardEnrollmentTemplate />
					<br />
					<br />
					<IDCardIssuanceForm />
					<br />
					<br />
					<MalariaPreventionProgramAttestation setFormData={setMalariaPPA}/>
					<br />
					<br />
					<AuthorizationFormForDDORE />
					<br />
					<br />
					<AuthorizationForPayrollDeductions />
					<br />
					<br />
					<CompanyAssetAcknowledgeForm />
					<br />
					<br />
					<EmployeeHandbookAcknowledgement />
				</div>
      }
    />
  );
};
export default withReducer('employeeProfile', reducer)(EmployeeOnboarding)