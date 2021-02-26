import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import * as UtilActions from 'app/store/actions';
import reducer from '../store/reducers';
import { useLocation } from "react-router-dom";
import FolderFilesTable from './folderFilesTable';
import UploadDocument from './components/uploadDocument';
import { useAuth } from 'app/hooks/useAuth';

const columns = [
	{
		id: 'iconM',
		align: 'center',
		disablePadding: false,
		label: '',
		sort: false
	},
	{
		id: 'name',
		align: 'center',
		disablePadding: false,
		label: 'Name',
		sort: true
	},
	{
		id: 'modified',
		align: 'center',
		disablePadding: false,
		label: 'Modified',
		sort: true
	},
	{
		id: 'modified_by',
		align: 'center',
		disablePadding: false,
		label: 'Modified By',
		sort: true
	},
	{
		id: 'action',
		align: 'center',
		disablePadding: false,
		label: 'Action',
		sort: false
	}
];

const userId = useAuth().getId;
const userProfile = useAuth().getUserProfile;

function FolderFiles(props) {
	const dispatch = useDispatch();
    const location = useLocation();
	const pathName = location.pathname.split('/').pop().replace('_', ' ');
    const mainFolder = (location.state) ? location.state.mainFolders : '';
    const subFolder = (location.state) ? location.state.subFolders : '';
    const subFoldersFile = useSelector(({folderFiles}) => folderFiles.folders.files);
	const roles = useSelector(({ roles }) => roles.roleList);
    const progress = useSelector(({folderFiles}) => folderFiles.folders.progress);
    const loading = useSelector(({folderFiles}) => folderFiles.folders.uploadLoading);
    const success = useSelector(({folderFiles}) => folderFiles.folders.uploadSuccess);
    const [open, setOpen] = React.useState(false);
    const roleId = userProfile.roleId;
	useEffect(() => {
        if(!subFolder || subFolder === ''){
            window.location = `/library/folders/${convertText(mainFolder.name)}`;
            return;
        }
        if(!mainFolder || mainFolder === ''){
            window.location = '/library/folders';
            return;
        }
        dispatch(UtilActions.getRoles())
        dispatch(Actions.getSubFolderFiles(subFolder.id));
        return (() => {
            dispatch(Actions.clearList());
        })
    }, [dispatch, mainFolder, subFolder]);


    const convertText = (text) => {
        if(text){
            return text.replaceAll(' ', '_');
        }
        return text;
    }

    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleUpload = (model) => {
        dispatch(Actions.uploadDocument(mainFolder.id, subFolder.id, model));
        handleCloseModal();
    }

    const getAccess = () => {
		console.log(roleId);
		console.log(mainFolder.access);
		if(mainFolder.id === 2){
			return mainFolder.access.includes(roleId.toString());
		}
		return true
    }

	return (
		<PageLayout
            noSearch
            noPrevious
            prev={true}
            props={props}
            header={{
                icon: ((subFolder) && subFolder.folderId === 1) ? 'folder_shared' : 'folder',
                title: `Document Library / ${mainFolder.name} / ${subFolder.name}`,
                showLink: true,
                url: `/library/folders/${convertText(mainFolder.name)}`,
                isState: true
            }}
            button={{
                showButton: true,
                btnTitle: 'Upload Document',
                onClick: handleOpenModal,
                btnIconShow: true,
                btnIcon: 'cloud_upload'
            }}
            content={
                <div className="p-12">
                    <FuseAnimateGroup
                        className="flex flex-wrap"
                        enter={{
                            animation: 'transition.slideUpBigIn'
                        }}
                    >
                        <div className="widget flex w-full p-12">
                            <FolderFilesTable
                                title={`${(mainFolder) ? mainFolder.name.toUpperCase() : ''} / ${(subFolder) ? subFolder.name.toUpperCase() : ''}`}
                                allowClick={true}
                                type="default"
                                userId={userId}
                                columns={columns}
                                rows={subFoldersFile}
                                props={props}
                                roles={roles}
                                mainFolder = {mainFolder}
                                subFolder = {subFolder}
                            />
                        </div>
                        <UploadDocument 
                            open={open}
                            showProgress={loading}
                            value={progress}
                            handleCloseModal={handleCloseModal} 
                            handleCreate={handleUpload} 
                            mainFolder={mainFolder}
                            subFolder={subFolder}
                        />
                    </FuseAnimateGroup>
                </div>
            }
        />
	);
}

export default withReducer('folderFiles', reducer)(FolderFiles);
