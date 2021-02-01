
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DropZone from '../../../shared/sharedDropZone';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

function UploadTrustDeed(props){
    
    let fileUrls = (props.srepOtherFiles) ? props.srepOtherFiles.filter((f, id, self)=>{return self.indexOf(f) === id;} ).map(d => {return {fieldName: d.fieldName, url:d.url}}) : [];
    const {
        beneficiaryIdentityUrl,
        beneficiaryPhotoUrl,
        employeePhotoUrl,
        residentialProofUrl,
        identityUrl
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


    return(
        <div>
        <Card className="sm:w-full mb-24">
        
            <CardContent>
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
                        Download International Passport
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
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="mb-24 w-auto rounded-lg"
                        onClick={() => {downloadFile('trustDeed', '')}}
                    >
                        Download Trust Deed
                    </Button>
                </div>
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="mb-24 w-auto rounded-lg"
                        onClick={() => {downloadFile('trustAccDetail', '')}}
                    >
                        Download Trust Account Details
                    </Button>
                </div>
            </CardContent>
        </Card>
        </div>
    );
}

export default UploadTrustDeed;