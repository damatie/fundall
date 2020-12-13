import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import * as UtilActions from 'app/store/actions';
import reducer from '../store/reducers';
import SubFolderTable from './subFolderTable';
import { useAuth } from 'app/hooks/useAuth';
import CreateFolder from './components/createFolder';
import { BurstModeOutlined } from '@material-ui/icons';

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
		id: 'icon',
		align: 'center',
		disablePadding: false,
		label: '',
		sort: false
	},
	{
		id: 'description',
		align: 'center',
		disablePadding: false,
		label: 'Description',
		sort: true
	},
	{
		id: 'uploaded',
		align: 'center',
		disablePadding: false,
		label: 'Uploaded',
		sort: true
	},
	{
		id: 'uploaded_by',
		align: 'center',
		disablePadding: false,
		label: 'Uploaded By',
		sort: true
	},
	{
		id: 'action',
		align: 'center',
		disablePadding: false,
		label: '',
		sort: true
	}
];

const userId = useAuth().getId;
const userProfile = useAuth().getUserProfile;

function SubFolder(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const mainFolder = (location.state) ? location.state.mainFolders : '';
    const subFolders = useSelector(({subFolder}) => subFolder.folders.subFolders);
    const success = useSelector(({subFolder}) => subFolder.folders.success);
	const roles = useSelector(({ roles }) => roles.roleList);
	const [open, setOpen] = React.useState(false);
	const roleId = userProfile.roleId;

	useEffect(() => {
        if(!mainFolder || mainFolder === ''){
            window.location = '/library/folders';
        }
        dispatch(UtilActions.getRoles())
        dispatch(Actions.getSubFolder(mainFolder.id));
        return (() => {
            dispatch(Actions.clearList());
        })
    }, [dispatch, mainFolder]);

    const handleOpenModal = () => {
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleCreate = (model) => {
        dispatch(Actions.createSubFolder(mainFolder.id, model));
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
				props={props}
				header={{
					icon: (mainFolder.id === 1) ? 'folder_shared' : 'folder',
                    title: `Document Library / ${(mainFolder) ? mainFolder.name : ''}`,
                    handleSearch: ({target: { value }}) => console.log(value),
                    showLink: true,
                    url: '/library/folders',
					isState: true
                }}
                button={{
                    showButton: getAccess(),
                    btnTitle: 'Create Folder',
                    onClick: handleOpenModal,
                    btnIconShow: true,
                    btnIcon: 'create_new_folder'
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
								<SubFolderTable
									title={(mainFolder) ? mainFolder.name.toUpperCase() : ''}
									allowClick={true}
									type="default"
									columns={columns}
									rows={(subFolders) ? subFolders.filter( folder => folder.access.includes(roleId.toString()) || folder.access.includes('*')) : []}
                                    props={props}
                                    mainFolder={mainFolder}
									roles={roles}
									userId={userId}
								/>
							</div>
                            <CreateFolder 
                                open={open}
                                handleCloseModal={handleCloseModal} 
                                handleCreate={handleCreate} 
                                mainFolder={mainFolder}
                                success={success}
                            />
						</FuseAnimateGroup>
					</div>
				}
			/>
	);
}

export default withReducer('subFolder', reducer)(SubFolder);
