import FuseAnimate from '@fuse/core/FuseAnimate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import * as remote from 'remote-file-size';
import Moment from 'react-moment';

const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	},
	typeIcon: {
		'&.folder:before': {
			content: "'folder'",
			color: '#FFB300'
		},
		'&.document:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.spreadsheet:before': {
			content: "'insert_chart'",
			color: '#4CAF50'
		},
		'&.pdf:before': {
			content: "'picture_as_pdf'",
			color: '#F40F02'
		},
		'&.image:before': {
			content: "'image'",
			color: '#4CAF50'
		},
		'&.audio:before': {
			content: "'music_note'",
			color: '#4CAF50'
		},
		'&.video:before': {
			content: "'ondemand_video'",
			color: '#4CAF50'
		}
	}
});

function DetailSidebarContent(props) {
	const selectedItem = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId.selectedItem);
	const [fileSize, setFileSize] = useState('');

	const classes = useStyles();

	const getExt = (filename) =>{
		if(filename){
			let ext = filename.split('.').pop();
			if(ext.toUpperCase() === 'PDF'){
				return 'pdf';
			}else if (ext.toUpperCase() === 'DOC' || ext.toUpperCase() === 'DOCX'){
				return 'document';
			}else if (ext.toUpperCase() === 'JPG' || ext.toUpperCase() === 'PNG' || ext.toUpperCase() === 'SVG' || ext.toUpperCase() === 'JPEG'){
				return 'image';
			}else if (ext.toUpperCase() === 'MP3' || ext.toUpperCase() === 'WAV'){
				return 'audio';
			}else if (ext.toUpperCase() === 'MP4' || ext.toUpperCase() === 'OGG' || ext.toUpperCase() === '3GP'){
				return 'video';
			}else if (ext.toUpperCase() === 'XLSX' || ext.toUpperCase() === 'XLS' || ext.toUpperCase() === '3GP'){
				return 'spreadsheet';
			}
		}
	}

	function formatBytes(a,b=2){
		if(0===a)return"0 Bytes";
		const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));
		return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]
	}

	if (!selectedItem) {
		return null;
	}

	function getIcon(url){
		let ext = getExt(url);
		switch (ext) {
			case 'image':
				return (
					<div style={{height: "200px", width: "200px"}}>
						<img src={url}/>
					</div>
				);
				break;
			case 'pdf':
				return (
					<Icon className={clsx(classes.typeIcon, getExt('pdf'), 'text-48')} />
				);
				break;
			case 'document':
				return (
					<Icon className={clsx(classes.typeIcon, getExt('document'), 'text-48')} />
				);
				break;
			case 'spreadsheet':
				return (
					<Icon className={clsx(classes.typeIcon, getExt('spreadsheet'), 'text-48')} />
				);
				break;
		
			default:
				return (
					<Icon className={clsx(classes.typeIcon, getExt(url), 'text-48')} />
				);
				break;
		}
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={200}>
			<div className="file-details p-16 sm:p-24">
				<div className="preview h-128 sm:h-256 file-icon flex items-center justify-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						{/* <Icon className={clsx(classes.typeIcon, getExt(selectedItem.docUrl), 'text-48')} /> */}
						{getIcon(selectedItem.docUrl)}
					</FuseAnimate>
				</div>
				<Typography variant="subtitle1" className="py-16">
					Info
				</Typography>

				<table className={clsx(classes.table, 'w-full text-justify')}>
					<tbody>
						<tr className="type">
							<th>Type</th>
							<td>{selectedItem.fileType}</td>
						</tr>

						<tr className="size">
							<th>Size</th>
							<td>{formatBytes(selectedItem.size) === '' || (!formatBytes(selectedItem.size)) ? '-' : formatBytes(selectedItem.size)}</td>
						</tr>

						<tr className="location">
							<th>Location</th>
							<td><div style={{ 
								wordWrap: "break-word",
								wordBreak: "break-all" }}>{selectedItem.docUrl}</div></td>
						</tr>

						<tr className="owner">
							<th>Owner</th>
							<td>{selectedItem.employee.firstName +' '+selectedItem.employee.lastName}</td>
						</tr>

						<tr className="modified">
							<th>Modified</th>
							<td><Moment format="ddd MMM, YY | hh:mm:ss a">{selectedItem.updatedAt}</Moment></td>
						</tr>

						<tr className="created">
							<th>Created</th>
							<td><Moment format="ddd MMM, YY | hh:mm:ss a">{selectedItem.createdAt}</Moment></td>
						</tr>
					</tbody>
				</table>
			</div>
		</FuseAnimate>
	);
}

export default DetailSidebarContent;
