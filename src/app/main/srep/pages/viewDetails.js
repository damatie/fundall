import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import {saveAs} from 'save-as';
import AdditionalForm from '../forms/uploadTrustDeed';
import {formatBytes} from 'app/shared/formatFileSize';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
    },
    downloadAll: {
        textAlign: 'center',
        position: 'absolute',
        left: '40%'
    },
    approveBtn: {
        textAlign: 'center',
        position: 'absolute',
        left: '30%'
    },
	typeIcon: {
		'&.document:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.pdf:before': {
			content: "'picture_as_pdf'",
			color: '#F40F02'
		},
		'&.spreadsheet:before': {
			content: "'insert_chart'",
			color: '#4CAF50'
		}
	}
}));

function AddTrustDeed(props) {
	const {
		employeePhotoUrl,
        identityUrl,
        residentialProofUrl,
        beneficiaryIdentityUrl,
        beneficiaryPhotoUrl,
        employee,
        info
	} = props.srepData;

	const classes = useStyles();
    
    const downloadFile = (url) => {
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('target', '_blank');
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
    }
    
    const getRole = (roleId) =>{
        let roles = props.roles;
        if(roles){
            const role = roles.find(role => {return parseInt(role.id) === parseInt(roleId)});
            return (role) ? role.name : '';
        }
        return '';
    }

    const getEntity = (entityId) =>{
        // console.log(entityId)
        let entities = props.entities;
        if(entities){
            const entity = entities.find(entity => {return parseInt(entity.id) === parseInt(entityId)});
            return (entity) ? entity.entityName : '';
        }
        return '';
    }

    const getDepartment = (deptId) =>{
        let departments = props.departments;
        if(departments){
            const dept = departments.find(dept => {return parseInt(dept.id) === parseInt(deptId)});
            return (dept) ? dept.departmentName : '';
        }
        return '';
    }
    
    // const downloadAll = () => {
    //     let zip = new JSZip();
    //     let zipFileName = `${employee.firstName}_${employee.lastName}_application_documents.zip`;
    //     let urls = [];
    //     let count = 0;
    //     urls.push(employeePhotoUrl);
    //     urls.push(identityUrl);
    //     urls.push(residentialProofUrl);
    //     urls.push(signedForm);
    //     urls.push(beneficiaryIdentityUrl);
    //     urls.push(beneficiaryPhotoUrl);

    //     // console.log(urls.length);
    //     urls.forEach(function(url){
    //         var filename = url.replaceAll('/','').split('SREP_VALIDATION_DOC')[1];
    //         // console.log(filename);
    //         // loading a file and add it in a zip file
    //         JSZipUtils.getBinaryContent(url, function (err, data) {
    //            if(err) {
    //               throw err; // or handle the error
    //            }
    //            zip.file(filename, data, {binary:true});
    //            count++;
    //            if (count == urls.length) {
    //              zip.generateAsync({type:'blob'}).then(function(content) {
    //                 saveAs(content, zipFileName);
    //              });
    //           }
    //         });
    //       });
    // }

	return (
		<div className="md:flex w-full">
			<div className="flex sm:flex-col w-full">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
                    <div className="grid grid-flow-col grid-rows-1 grid-cols-3 gap-4">
                        <div className="col-start-1 col-span-2 mb-20">
                            <Card className="sm:w-full">
                                <CardContent>
                                    <div className="flex w-full">
                                        <div className="mb-24 w-1/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Employee Name</Typography>
                                            <Typography>
                                                {employee ? (
                                                    <div>{`${employee.firstName} ${employee.lastName}`}</div>
                                                ) : (
                                                    <div><SkeletonLoader height="3em" width="60%" /></div>
                                                )}
                                            </Typography>
                                        </div>

                                        <div className="mb-24 w-2/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Employment ID</Typography>
                                            <Typography>
                                                {info ? (
                                                    <div>{info.employeeNumber}</div>
                                                ) : (
                                                    <div><SkeletonLoader height="3em" width="60%" /></div>
                                                )}
                                            </Typography>
                                        </div>
                                    </div>
                                        
                                    <div className="flex w-full">
                                        <div className="mb-24 w-1/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Department</Typography>
                                            <Typography>
                                                {employee ? (
                                                    <div>{getDepartment(employee.departmentId)}</div>
                                                ) : (
                                                    <div><SkeletonLoader height="3em" width="60%" /></div>
                                                )}
                                            </Typography>
                                        </div>
                                        <div className="mb-24 w-2/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Job Role</Typography>
                                            <Typography>
                                                {employee ? (
                                                    <div>{getRole(employee.roleId)}</div>
                                                ) : (
                                                    <div><SkeletonLoader height="3em" width="60%" /></div>
                                                )}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="flex w-full">
                                        <div className="mb-24 w-1/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Entity</Typography>
                                            <Typography>
                                                {employee ? (
                                                    <div>{getEntity(employee.entityId)}</div>
                                                ) : (
                                                    <div><SkeletonLoader height="3em" width="60%" /></div>
                                                )}
                                            </Typography>
                                        </div>
                                        <div className="mb-24 w-2/2 sm:w-full">
                                            <Typography className="font-bold mb-4 text-15">Employee Grade</Typography>
                                            <Typography>
                                                {info ? (
                                                    info.gradeLevel
                                                ) : (
                                                    <SkeletonLoader height="3em" width="60%" />
                                                )}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="mt-24">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className="mb-24 w-auto rounded-lg"
                                            onClick={() => {downloadFile(employeePhotoUrl)}}
                                        >
                                            Download Employee Photograph
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className="mb-24 w-auto rounded-lg"
                                            onClick={() => {downloadFile(beneficiaryPhotoUrl)}}
                                        >
                                            Download Beneficiary Photograph
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className="mb-24 w-auto rounded-lg"
                                            onClick={() => {downloadFile(identityUrl)}}
                                        >
                                            Download International Passport
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className="mb-24 w-auto rounded-lg"
                                            onClick={() => {downloadFile(residentialProofUrl)}}
                                        >
                                            Download Proof of Address
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className="mb-24 w-auto rounded-lg"
                                            onClick={() => {downloadFile(beneficiaryIdentityUrl)}}
                                        >
                                            Download Employee Parentship to Beneficiary
                                        </Button>
                                    </div>
                                </CardContent>
                                <CardActions className="mt-20 mb-20 text-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.approveBtn}
                                        onClick={(ev)=>{props.goBack()}}
                                    >
                                        Close
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    </div>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default AddTrustDeed;
