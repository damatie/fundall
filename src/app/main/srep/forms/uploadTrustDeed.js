
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import withReducer from 'app/store/withReducer';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DropZone from '../../../shared/sharedDropZone';
import Button from '@material-ui/core/Button';
import moment from 'moment';

function UploadTrustDeed(props){
    const dispatch = useDispatch();
    const trustDeedSuccess = useSelector(({ uploadTrustDeed }) => uploadTrustDeed.additionalFiles.trustDeedSuccess);
    const trustDeedLoading = useSelector(({ uploadTrustDeed }) => uploadTrustDeed.additionalFiles.trustDeedLoading);
    const trustAccDetailSuccess = useSelector(({ uploadTrustDeed }) => uploadTrustDeed.additionalFiles.trustAccDetailSuccess);
    const trustAccDetailLoading = useSelector(({ uploadTrustDeed }) => uploadTrustDeed.additionalFiles.trustAccDetailLoading);
    const trustDeedId = useSelector(({ uploadTrustDeed }) => uploadTrustDeed.additionalFiles.trustDeedId);
    const trustAccDetailId = useSelector(({ uploadTrustDeed }) => uploadTrustDeed.additionalFiles.trustAccDetailId);
    
	const [trustDeed, setTrustDeed] = useState('');
    const [trustAccDetail, setTrustAccDetail] = useState('');
    
    let srepId = props.srepId;
    
    const files = (props.srepOtherFiles) ? props.srepOtherFiles.filter((f, id, self)=>{return self.indexOf(f) === id;} ).map(d => {return d.fieldName}) : [];
    let fileUrls = (props.srepOtherFiles) ? props.srepOtherFiles.filter((f, id, self)=>{return self.indexOf(f) === id;} ).map(d => {return {fieldName: d.fieldName, url:d.url}}) : [];
    
    const {
        beneficiaryIdentityUrl,
        beneficiaryPhotoUrl,
        employeePhotoUrl,
        residentialProofUrl,
        identityUrl,
        identityType
    } = props.srepData;

    const downloadFile = (fieldName, fileUrl) => {
        let url = '';
        if(!fileUrl){
            console.log(fileUrls);
            url = fileUrls.find(file => {return file.fieldName === fieldName});
            url = url.url;
        }else{
            url = fileUrl
        }

		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('target', '_blank');
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
    }

    function checkFiles(){
        return ((!trustDeedSuccess && !files.includes('trustDeed')) || 
        (!trustAccDetailSuccess && !files.includes('trustAccDetail')));
    }

    useEffect(()=>{
        props.setHideBtn(checkFiles());
    }, [checkFiles, props])

    useEffect(()=> {
        if(trustDeed.length > 0){
            // console.log("trustDeed File Loaded");
            let payload = new FormData();
            payload.append("id", (trustDeedId) ? trustDeedId : 0);
            payload.append("srepId", srepId);
            payload.append("name", "Trust Deed");
            payload.append("fieldname", "trustDeed");
            if(props.employee){
                payload.append("trustDeed", trustDeed[0], `${props.employee.firstName}${props.employee.lastName}_trustDeedTrustDeed${moment(new Date()).format('DDMMYY')}.${trustDeed[0].name.split('.').pop()}`);
            }else{
                payload.append("trustDeed", trustDeed[0], `TrustDeed${moment(new Date()).format('DDMMYY')}.${trustDeed[0].name.split('.').pop()}`);
            }
            dispatch(Actions.addTrustDeed(payload, srepId));
        } 

    }, [trustDeed]);

    useEffect(()=> {
        if(trustAccDetail.length > 0){
            // console.log("trustAccDetail File Loaded");
            let payload = new FormData();
            payload.append("id", (trustAccDetailId) ? trustAccDetailId : 0);
            payload.append("srepId", srepId);
            payload.append("name", "Trust Account Details");
            payload.append("fieldname", "trustAccDetail");
            if(props.employee){
                payload.append("trustAccDetail", trustAccDetail[0], `${props.employee.firstName}${props.employee.lastName}_TrustDeed${moment(new Date()).format('DDMMYY')}.${trustAccDetail[0].name.split('.').pop()}`);
            }else{
                payload.append("trustAccDetail", trustAccDetail[0], `TrustAccountDetails${moment(new Date()).format('DDMMYY')}.${trustAccDetail[0].name.split('.').pop()}`);
            }
            dispatch(Actions.addTrustAccDetails(payload, srepId));
        } 

    }, [trustAccDetail]);

    return(
        <div>
            <Card className="sm:w-full mb-24">
                <AppBar position="static" elevation={0}>
                    <Toolbar className="px-8">
                        <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                            Action
                        </Typography>
                    </Toolbar>
                </AppBar>

                <CardContent>
                    <div>
                        {(files.includes('trustDeed') || trustDeedSuccess ) ?
                            <div>
                                <Button variant="outlined" onClick={() => {downloadFile('trustDeed', '')}} color="primary" className="mt-24 w-auto rounded-lg" >
                                    Download Trust Deed
                                </Button>
                            </div>
                        :
                            <div>
                                <Typography variant='body1' className="mt-16 mb-8">Upload Trust Deed *</Typography>
                                <DropZone setValue={setTrustDeed}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
                                <LinearProgress color="secondary" hidden={!trustDeedLoading}/>
                            </div>
                        }
                    </div>
                    <div>
                        {(files.includes('trustAccDetail') || trustAccDetailSuccess ) ?
                            <div>
                                <Button variant="outlined"  onClick={() => {downloadFile('trustAccDetail', '')}} color="primary" className="mt-24 w-auto rounded-lg" >
                                    Download Trust Account Details
                                </Button>
                            </div>
                        :
                            <div>
                                <Typography variant='body1' className="mt-16 mb-8">Upload Trust Account Details *</Typography>
                                <DropZone setValue={setTrustAccDetail}  allowedTypes='.pdf, .doc, .jpg, .png, .docx, .jpeg' allowMutliple={false}/>
                                <LinearProgress color="secondary" hidden={!trustAccDetailLoading}/>
                            </div>
                        }
                    </div>
                    <div className="mt-24">
                    <Button
                        variant="outlined"
                        color="primary"
                        className="mb-24 w-auto rounded-lg"
                        onClick={() => {downloadFile('', employeePhotoUrl)}}
                    >
                        Download Employee Photograph
                    </Button>
                </div>
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="mb-24 w-auto rounded-lg"
                        onClick={() => {downloadFile('', beneficiaryPhotoUrl)}}
                    >
                        Download Beneficiary Photograph
                    </Button>
                </div>
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="mb-24 w-auto rounded-lg"
                        onClick={() => {downloadFile('', identityUrl)}}
                    >
                        Download {identityType} document
                    </Button>
                </div>
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="mb-24 w-auto rounded-lg"
                        onClick={() => {downloadFile('', residentialProofUrl)}}
                    >
                        Download Proof of Address
                    </Button>
                </div>
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="mb-24 item-justify w-auto rounded-lg"
                        onClick={() => {downloadFile('', beneficiaryIdentityUrl)}}
                    >
                        Download Employee Parentship to Beneficiary
                    </Button>
                </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default withReducer('uploadTrustDeed', reducer)(UploadTrustDeed);