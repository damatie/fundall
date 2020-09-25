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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import {saveAs} from 'save-as';
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

function Details(props) {
	const {
		employeePhotoUrl,
		employeePhotoSize,
		identityType,
        identityUrl,
        identitySize,
        residentialProofUrl,
        residentialProofSize,
        signedForm,
        signedFormSize,
		beneficiaryIdentityType,
        beneficiaryIdentityUrl,
        beneficiaryIdentitySize,
        beneficiaryPhotoUrl,
        beneficiaryPhotoSize,
		updatedAt,
		createdAt,
		employee
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
    
    const downloadAll = () => {
        let zip = new JSZip();
        let zipFileName = `${employee.firstName}_${employee.lastName}_application_documents.zip`;
        let urls = [];
        let count = 0;
        urls.push(employeePhotoUrl);
        urls.push(identityUrl);
        urls.push(residentialProofUrl);
        urls.push(signedForm);
        urls.push(beneficiaryIdentityUrl);
        urls.push(beneficiaryPhotoUrl);

        console.log(urls.length);
        urls.forEach(function(url){
            var filename = url.replaceAll('/','').split('SREP_VALIDATION_DOC')[1];
            console.log(filename);
            // loading a file and add it in a zip file
            JSZipUtils.getBinaryContent(url, function (err, data) {
               if(err) {
                  throw err; // or handle the error
               }
               zip.file(filename, data, {binary:true});
               count++;
               if (count == urls.length) {
                 zip.generateAsync({type:'blob'}).then(function(content) {
                    saveAs(content, zipFileName);
                 });
              }
            });
          });
    }

	const getExt = filename => {
		if (filename) {
			let ext = filename.split('.').pop();
			if (ext.toUpperCase() === 'PDF') {
				return 'pdf';
			} else if (ext.toUpperCase() === 'DOC' || ext.toUpperCase() === 'DOCX') {
				return 'document';
			} else if (
				ext.toUpperCase() === 'JPG' ||
				ext.toUpperCase() === 'PNG' ||
				ext.toUpperCase() === 'SVG' ||
				ext.toUpperCase() === 'JPEG'
			) {
				return 'image';
			} else if (ext.toUpperCase() === 'XLSX' || ext.toUpperCase() === 'XLS' || ext.toUpperCase() === '3GP') {
				return 'spreadsheet';
			}
		}
	};

	function getIcon(url, title) {
		let ext = getExt(url);
		switch (ext) {
			case 'image':
				return (
					<div>
						<CardMedia className={classes.media} image={url} title={title} />
					</div>
				);
				break;
			case 'pdf':
				return (
					<div>
						<Icon className={(classes.media, clsx(classes.typeIcon, getExt('pdf'), 'text-48'))} />
					</div>
				);
				break;
			case 'document':
				return (
					<div>
						<Icon className={clsx(classes.typeIcon, getExt('document'), 'text-48')} />
					</div>
				);
				break;
			case 'spreadsheet':
				return (
					<div>
						<Icon className={clsx(classes.typeIcon, getExt('spreadsheet'), 'text-48')} />
					</div>
				);
				break;

			default:
				return (
					<div>
						<Icon className={clsx(classes.typeIcon, getExt(url), 'text-48')} />
					</div>
				);
				break;
		}
	}

	return (
		<div className="md:flex w-full">
			<div className="flex sm:flex-col w-full">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<div className="w-full mb-20">
						<Card className="sm:w-full">
							<AppBar position="static" elevation={0}>
								<Toolbar className="px-8">
									<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
										General Information
									</Typography>
								</Toolbar>
							</AppBar>

							<CardContent>
								<div className="flex w-full">
									<div className="mb-24 w-1/3 sm:w-full">
										<Typography className="font-bold mb-4 text-15">Employee Name</Typography>
										<Typography>
											{employee ? (
												`${employee.firstName} ${employee.lastName}`
											) : (
												<SkeletonLoader height="3em" width="60%" />
											)}
										</Typography>
									</div>

									<div className="mb-24 w-2/3 sm:w-full">
										<Typography className="font-bold mb-4 text-15">Created Date</Typography>
										<Typography>
											{createdAt ? (
												<Moment format="ddd Do MMM, YY | hh:mm:ss a">{createdAt}</Moment>
											) : (
												<SkeletonLoader height="3em" width="60%" />
											)}
										</Typography>
									</div>

									<div className="mb-24 w-3/3 sm:w-full">
										<Typography className="font-bold mb-4 text-15">Updated Date</Typography>
										<Typography>
											{updatedAt ? (
												<Moment format="ddd Do MMM, YY | hh:mm:ss a">{updatedAt}</Moment>
											) : (
												<SkeletonLoader height="3em" width="60%" />
											)}
										</Typography>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="w-full mb-20">
						<Card className="sm:w-full">
							<AppBar position="static" elevation={0}>
								<Toolbar className="px-8">
									<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
										SpringRock Education Program Application Documents
									</Typography>
								</Toolbar>
							</AppBar>

							<CardContent>
								<div className="flex w-full">
									<Card className="w-1/2 mb-16 sm:w-full">
										<AppBar position="static" elevation={0}>
											<Toolbar className="px-8">
												<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
													SREP Signed Form
												</Typography>
											</Toolbar>
										</AppBar>

										<CardContent>
											{signedForm ? getIcon(signedForm, 'SREP Signed Form') : <SkeletonLoader height="300px" />}
											<CardActions>
												<Typography variant="body1" color="inherit">
													Size: {formatBytes(signedFormSize)}
												</Typography>
												<IconButton aria-label="Download" onClick={ev => {downloadFile(signedForm)}}>
													<DownloadIcon />
												</IconButton>
											</CardActions>
										</CardContent>
									</Card>

									<Card className="w-1/2 mb-16 sm:w-full ml-16">
										<AppBar position="static" elevation={0}>
											<Toolbar className="px-8">
												<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
													Employee Passport Photo
												</Typography>
											</Toolbar>
										</AppBar>

										<CardContent>
											{employeePhotoUrl ? (
												getIcon(employeePhotoUrl, 'Employee Passport Photo')
											) : (
												<SkeletonLoader height="300px" />
											)}
											<CardActions>
												<Typography variant="body1" color="inherit">
													Size: {formatBytes(employeePhotoSize)}
												</Typography>
												<IconButton aria-label="Download" onClick={ev => {downloadFile(employeePhotoUrl)}}>
													<DownloadIcon />
												</IconButton>
											</CardActions>
										</CardContent>
									</Card>
								</div>

								<div className="flex w-full">
									<Card className="w-1/2 mb-16 sm:w-full">
										<AppBar position="static" elevation={0}>
											<Toolbar className="px-8">
												<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
													{identityType ? (
														'Identity Type: ' + identityType
													) : (
														'Identity Type: '
													)}
												</Typography>
											</Toolbar>
										</AppBar>

										<CardContent>
											{identityUrl ? (
												getIcon(identityUrl, identityType ? identityType : '')
											) : (
												<SkeletonLoader height="300px" />
											)}

											<CardActions>
												<Typography variant="body1" color="inherit">
													Size: {formatBytes(identitySize)}
												</Typography>
												<IconButton aria-label="Download" onClick={ev => {downloadFile(identityUrl)}}>
													<DownloadIcon />
												</IconButton>
											</CardActions>
										</CardContent>
									</Card>

									<Card className="w-1/2 mb-16 sm:w-full ml-16">
										<AppBar position="static" elevation={0}>
											<Toolbar className="px-8">
												<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
													Employee's Residential Proof
												</Typography>
											</Toolbar>
										</AppBar>

										<CardContent>
											{residentialProofUrl ? (
												getIcon(residentialProofUrl, "Employee's Residential Proof")
											) : (
												<SkeletonLoader height="300px" />
											)}
											<CardActions>
												<Typography variant="body1" color="inherit">
													Size: {formatBytes(residentialProofSize)}
												</Typography>
												<IconButton aria-label="Download" onClick={ev => {downloadFile(residentialProofUrl)}}>
													<DownloadIcon />
												</IconButton>
											</CardActions>
										</CardContent>
									</Card>
								</div>

								<div className="flex w-full">
									<Card className="w-1/2 mb-16 sm:w-full">
										<AppBar position="static" elevation={0}>
											<Toolbar className="px-8">
												<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
													{beneficiaryIdentityType ? (
														'Beneficiary Identity Type: ' + beneficiaryIdentityType
													) : (
														'Beneficiary Identity Type:'
													)}
												</Typography>
											</Toolbar>
										</AppBar>

										<CardContent>
											{beneficiaryIdentityUrl ? (
												getIcon(beneficiaryIdentityUrl, beneficiaryIdentityType ? beneficiaryIdentityType : '')
											) : (
												<SkeletonLoader height="300px" />
											)}
											<CardActions>
												<Typography variant="body1" color="inherit">
													Size: {formatBytes(beneficiaryIdentitySize)}
												</Typography>
												<IconButton aria-label="Download" onClick={ev => {downloadFile(beneficiaryIdentityUrl)}}>
													<DownloadIcon />
												</IconButton>
											</CardActions>
										</CardContent>
									</Card>

									<Card className="w-1/2 mb-16 sm:w-full ml-16">
										<AppBar position="static" elevation={0}>
											<Toolbar className="px-8">
												<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
													Beneficiary Passport Photo
												</Typography>
											</Toolbar>
										</AppBar>

										<CardContent>
											{beneficiaryPhotoUrl ? (
												getIcon(beneficiaryPhotoUrl, 'Beneficiary Residential Proof')
											) : (
												<SkeletonLoader height="300px" />
											)}
											<CardActions>
												<Typography variant="body1" color="inherit">
													Size: {formatBytes(beneficiaryPhotoSize)}
												</Typography>
												<IconButton aria-label="Download" onClick={ev => {downloadFile(beneficiaryPhotoUrl)}}>
													<DownloadIcon />
												</IconButton>
											</CardActions>
										</CardContent>
									</Card>
								</div>
								<CardActions className='mt-20 mb-20'>
									<IconButton className={classes.downloadAll} aria-label="Download All" onClick={ev => {downloadAll()}}>
										<DownloadIcon /> &nbsp; Download All
									</IconButton>
								</CardActions>
							</CardContent>
						</Card>
					</div>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default Details;
