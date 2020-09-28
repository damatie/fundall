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
import { saveAs } from 'save-as';
import { formatBytes } from 'app/shared/formatFileSize';
import AdditionalFileForm from './additionalFileForm';
import ProgressBtn from 'app/shared/progressBtn';
import Button from '@material-ui/core/Button';
import * as Actions from '../store/actions';

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

function OtherFiles(props) {
	const dispatch = useDispatch();
	const { srepOtherFiles, employee, id, status } = props.srepData;

	const classes = useStyles();

	const downloadFile = url => {
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('target', '_blank');
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	};

	const downloadAll = () => {
		let zip = new JSZip();
		let zipFileName = `${employee.firstName}_${employee.lastName}_additional_documents.zip`;
		let urls = [];
		let count = 0;
		urls = srepOtherFiles.map(file => {
			return file.url;
		});
		console.log(urls.length);
		urls.forEach(function (url) {
			var filename = url.replaceAll('/', '').split('SREP_OTHER_DOC')[1];
			console.log(filename);
			// loading a file and add it in a zip file
			JSZipUtils.getBinaryContent(url, function (err, data) {
				if (err) {
					throw err; // or handle the error
				}
				zip.file(filename, data, { binary: true });
				count++;
				if (count == urls.length) {
					zip.generateAsync({ type: 'blob' }).then(function (content) {
						saveAs(content, zipFileName);
					});
				}
			});
		});
	};

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

	const getIcon = (url, title) => {
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
						<CardMedia
							className={classes.media}
							image="https://www.pngkey.com/png/detail/98-981538_icono-pdf-vector-pdf-icon-free.png"
							title={title}
						/>
					</div>
				);
				break;
			case 'document':
				return (
					<div>
						<CardMedia
							className={classes.media}
							image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrQbDWK6KryJ73eQehYkeqBzfHns7DL-WCmQ&usqp=CAU"
							title={title}
						/>
					</div>
				);
				break;
			case 'spreadsheet':
				return (
					<div>
						<CardMedia
							className={classes.media}
							image="https://www.vhv.rs/dpng/d/33-338244_microsoft-excel-logo-hd-png-download.png"
							title={title}
						/>
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
	};

	const sendToFinance = () => {
		dispatch(Actions.sendToFinance(parseInt(id)));
	};

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
										SpringRock Education Program Application Documents
									</Typography>
								</Toolbar>
							</AppBar>
							{srepOtherFiles && srepOtherFiles.length >= 3 ? (
								<CardContent>
									<div className="flex w-full">
										{srepOtherFiles.map((file, i) => {
											return (
												<Card className="w-1/2 mb-16 sm:w-full ml-16">
													<AppBar position="static" elevation={0}>
														<Toolbar className="px-8">
															<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
																{file.name}
															</Typography>
														</Toolbar>
													</AppBar>

													<CardContent>
														{file.url ? getIcon(file.url, file.name) : <SkeletonLoader height="400px" />}
														<CardActions>
															<Typography variant="body1" color="inherit">
																Size: {formatBytes(file.size)}
															</Typography>
															<IconButton
																aria-label="Download"
																onClick={ev => {
																	downloadFile(file.url);
																}}
															>
																<DownloadIcon />
															</IconButton>
														</CardActions>
													</CardContent>
												</Card>
											);
										})}
									</div>
									{status !== 'pending' ? (
										<CardActions className="mt-20 mb-20">
											<IconButton
												className={classes.downloadAll}
												aria-label="Download All"
												onClick={ev => {
													downloadAll();
												}}
											>
												<DownloadIcon /> &nbsp; Download All
											</IconButton>
										</CardActions>
									) : (
										<CardActions className="mt-20 mb-20">
											<Button
												variant="contained"
												color="primary"
												className={classes.downloadAll}
												onClick={ev => {
													sendToFinance();
												}}
											>
												Send to Finance Manager
											</Button>
										</CardActions>
									)}
								</CardContent>
							) : (
								<CardContent>
									<AdditionalFileForm employee={employee} srepOtherFiles={srepOtherFiles} srepId={id} />
								</CardContent>
							)}
						</Card>
					</div>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default OtherFiles;
