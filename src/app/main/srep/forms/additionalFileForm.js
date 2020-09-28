import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import FusePageCarded from '@fuse/core/FusePageCarded';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Actions from '../store/actions';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import DropZone from '../../../shared/sharedDropZone';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import moment from 'moment';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import ProgressBtn from 'app/shared/progressBtn';
import GridSystem from 'app/shared/gridSystem';
import { useAuth } from 'app/hooks/useAuth';



function AdditionalFileForm(props) {
	const dispatch = useDispatch();
    const theme = useTheme();
    const srepData = useSelector(({ additionalFileForm }) => additionalFileForm.srep.data);
	const loading = useSelector(({ additionalFileForm }) => additionalFileForm.additionalFiles.loading);
    const success = useSelector(({ additionalFileForm }) => additionalFileForm.additionalFiles.success);
    const endorsedSuccess = useSelector(({ additionalFileForm }) => additionalFileForm.additionalFiles.endorsedSuccess);
    const emailSuccess = useSelector(({ additionalFileForm }) => additionalFileForm.additionalFiles.emailSuccess);
    const boardSuccess = useSelector(({ additionalFileForm }) => additionalFileForm.additionalFiles.boardSuccess);
    const endorsedId = useSelector(({ additionalFileForm }) => additionalFileForm.additionalFiles.endorsedId);
    const emailIndemnityId = useSelector(({ additionalFileForm }) => additionalFileForm.additionalFiles.emailIndemnityId);
    const boardResolutionId = useSelector(({ additionalFileForm }) => additionalFileForm.additionalFiles.boardResolutionId);
	const userData = useAuth().getUserDetails;
	const userId = useAuth().getId;

	const [isFormValid, setIsFormValid] = useState(true);
	const [file, setFile] = useState('');
	const [endorsed, setEndorsed] = useState('');
	const [emailIndemnity, setEmailIndemnity] = useState('');
	const [boardResolution, setBoardResolution] = useState('');
    const formRef = useRef(null);

    let srepId = props.srepId;
    
    const files = (props.srepOtherFiles) ? props.srepOtherFiles.filter((f, id, self)=>{return self.indexOf(f) === id;} ).map(d => {return d.fieldname}) : [];


	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
    }

	function handleSubmit(model) {
		dispatch(Actions.sendToFinance(parseInt(props.srepId)))
	}

	function checkFiles(){
        return ((!endorsedSuccess && !files.includes('endorsed')) || 
        (!emailSuccess && !files.includes('EmailIndemnity')) || 
        (!boardSuccess && !files.includes('boardResolution')));
    }
    
    useEffect(()=> {
        if(endorsed.length > 0){
            console.log("Endorsed File Loaded");
            let payload = new FormData();
            payload.append("id", (endorsedId) ? endorsedId : 0);
            payload.append("srepId", srepId);
            payload.append("name", "Endorsed Trust Deed");
            payload.append("fieldname", "endorsed");
            if(props.employee){
                payload.append("endorsed", endorsed[0], `${props.employee.firstName}${props.employee.lastName}_EndorsedTrustDeed${moment(new Date()).format('DDMMYY')}.${endorsed[0].name.split('.').pop()}`);
            }else{
                payload.append("endorsed", endorsed[0], `EndorsedTrustDeed${moment(new Date()).format('DDMMYY')}.${endorsed[0].name.split('.').pop()}`);
            }
            dispatch(Actions.addEndorsed(payload, srepId));
        } 

    }, [endorsed]);

    useEffect(()=> {

        if(emailIndemnity.length > 0){
            console.log("Email Indemnity File Loaded");
            let payload = new FormData();
            payload.append("id", (emailIndemnityId) ? emailIndemnityId : 0);
            payload.append("srepId", srepId);
            payload.append("name", "Endorsed Trust Deed");
            payload.append("fieldname", "EmailIndemnity");
            if(props.employee){
                payload.append("EmailIndemnity", emailIndemnity[0], `${props.employee.firstName}${props.employee.lastName}_EmailIndemnityLetter${moment(new Date()).format('DDMMYY')}.${emailIndemnity[0].name.split('.').pop()}`);
            }else{
                payload.append("EmailIndemnity", emailIndemnity[0], `EmailIndemnityLetter${moment(new Date()).format('DDMMYY')}.${emailIndemnity[0].name.split('.').pop()}`);
            }
            dispatch(Actions.addEmailIndemnity(payload, srepId));
        }

    }, [emailIndemnity]);

    useEffect(()=> {
        if(boardResolution.length > 0 ){
            console.log("Board Resolution File Loaded");
            let payload = new FormData();
            payload.append("id", (boardResolutionId) ? boardResolutionId : 0);
            payload.append("srepId", srepId);
            payload.append("name", "Board Resolution of The Company");
            payload.append("fieldname", "boardResolution");
            if(props.employee){
                payload.append("boardResolution", boardResolution[0], `${props.employee.firstName}${props.employee.lastName}_BoardResolutionCompany${moment(new Date()).format('DDMMYY')}.${boardResolution[0].name.split('.').pop()}`);
            }else{
                payload.append("boardResolution", boardResolution[0], `BoardResolutionCompany${moment(new Date()).format('DDMMYY')}.${boardResolution[0].name.split('.').pop()}`);
            }
            dispatch(Actions.addBoardResolution(payload, srepId));
        } 
    }, [boardResolution]);
	

	return (
		
        <div className=" sm:p-24 ">
            <div className="w-full">
                <Formsy
                    onValidSubmit={handleSubmit}
                    onValid={enableButton}
                    onInvalid={disableButton}
                    ref={formRef}
                    className="flex flex-col justify-center w-full"
                >
                    <GridSystem className="mb-10">
                        <div hidden={files.includes('endorsed')}>
                            <Alert severity={(endorsedSuccess) ? "success" : "error"}>
                                <Typography variant='body1' className="mt-16 mb-8">Endorsed Trust Deed *</Typography>
                                <DropZone setValue={setEndorsed} allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false} />
                            </Alert>
                        </div>
                        <div hidden={files.includes('EmailIndemnity')}>
                            <Alert severity={(emailSuccess) ? "success": "error"}>
                                <Typography variant='body1' className="mt-16 mb-8">Email Indemnity Letter *</Typography>
                                <DropZone setValue={setEmailIndemnity}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
                            </Alert>
                        </div>
                        <div hidden={files.includes('boardResolution')}>
                            <Alert severity={(boardSuccess) ? "success" : "error"} className="mb-10">
                                <Typography variant='body1' className="mt-16 mb-8">Board Resolution of The Company *</Typography>
                                <DropZone setValue={setBoardResolution}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
                            </Alert>
                        </div>		
                    </GridSystem>
                    <ProgressBtn success={success} loading={loading} content="Send to Finance Manager" disable={!isFormValid || checkFiles()} />
                </Formsy>
            </div>
        </div>
	);
}

export default withReducer('additionalFileForm', reducer)(AdditionalFileForm);
