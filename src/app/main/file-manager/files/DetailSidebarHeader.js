import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import * as Actions from '../store/actions';
import FileUpdateModal from './FileUpdateModal';
import { useAuth } from 'app/hooks/useAuth';

function DetailSidebarHeader(props) {
	const dispatch = useDispatch();
	const selectedItem = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId.selectedItem);
	const userId = useAuth().getId;

	if (!selectedItem) {
		return null;
	}

	function deleteFile() {
		dispatch(Actions.deleteDocument(selectedItem.id, selectedItem.documentCategoryId));
	}

	function downloadFile() {
		const link = document.createElement('a');
		link.href = selectedItem.docUrl;
		link.setAttribute('target', '_blank');
		link.download = selectedItem.docName;
		link.setAttribute('download', selectedItem.docName);
		document.body.appendChild(link);
		link.click();
		link.parentNode.removeChild(link);
	}

	function HiddenBtn() {
		if (userId === selectedItem.employeeId) {
			return (
				<IconButton onClick={deleteFile}>
					<Icon>delete</Icon>
				</IconButton>
			);
		} else {
			return <i></i>;
		}
	}

	return (
		<div className="flex flex-col justify-between h-full p-4 sm:p-12">
			<div className="toolbar flex align-center justify-end">
				<FuseAnimate animation="transition.expandIn" delay={200}>
					<HiddenBtn />
				</FuseAnimate>
				<FuseAnimate animation="transition.expandIn" delay={200}>
					<IconButton onClick={downloadFile}>
						<Icon>cloud_download</Icon>
					</IconButton>
				</FuseAnimate>
				<FuseAnimate animation="transition.expandIn" delay={200}>
					<FileUpdateModal pageLayout={props.pageLayout}/>
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
						<span>
							: <Moment format="ddd MMM, YY | hh:mm:ss a">{selectedItem.updatedAt}</Moment>
						</span>
					</Typography>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default DetailSidebarHeader;
