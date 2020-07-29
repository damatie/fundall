import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import * as Actions from './store/actions';
import FileUpdateModal from './FileUpdateModal';
import DownloadLink from "react-download-link";

function DetailSidebarHeader(props) {
	const dispatch = useDispatch();
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files);
	const selectedItem = useSelector(({ fileManagerApp }) => files[fileManagerApp.selectedItemId]);
	const linkRef = React.createRef();

	if (!selectedItem) {
		return null;
	}

	function deleteFile(){
		dispatch(Actions.deleteDocument(selectedItem.id));
	}

	function downloadFile(){
		// Actions.downloadDocument(selectedItem.docUrl, selectedItem.docName);
		// const url = window.URL.createObjectURL(new Blob([blob]));
		const link = document.createElement('a');
		link.href = selectedItem.docUrl;
		link.setAttribute('target', '_blank');
		link.download = selectedItem.docName;
		link.setAttribute('download', selectedItem.docName);
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	}

	return (
		<div className="flex flex-col justify-between h-full p-4 sm:p-12">
			<div className="toolbar flex align-center justify-end">
				<FuseAnimate animation="transition.expandIn" delay={200}>
					<IconButton>
						<Icon onClick={deleteFile}>delete</Icon>
					</IconButton>
				</FuseAnimate>
				<FuseAnimate animation="transition.expandIn" delay={200}>
					<IconButton>
						<Icon onClick={downloadFile}>cloud_download</Icon>
					</IconButton>
				</FuseAnimate>
				<FuseAnimate animation="transition.expandIn" delay={200}>
					<FileUpdateModal/>
				</FuseAnimate>
			</div>

			<div className="p-12">
				<FuseAnimate delay={200}>
					<Typography variant="subtitle1" className="mb-8">
						{selectedItem.docName}
					</Typography>
				</FuseAnimate>
				<FuseAnimate delay={300}>
					<Typography variant="caption" className="">
						<span>Edited</span>
						<span>: <Moment format="ddd MMM, YY | hh:mm:ss a">{selectedItem.updatedAt}</Moment></span>
					</Typography>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default DetailSidebarHeader;
