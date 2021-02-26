import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import withReducer from 'app/store/withReducer';
import React, { useEffect } from 'react';
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
	const pathName = location.pathname.split('/').pop().replace('_', ' ');
	const mainFolders = useSelector(({subFolder}) => subFolder.folders.mainFolders);
    let mainFolder = (location.state) ? location.state.mainFolders : '';
    const subFolders = useSelector(({subFolder}) => subFolder.folders.subFolders);
    const success = useSelector(({subFolder}) => subFolder.folders.success);
	const roles = useSelector(({ roles }) => roles.roleList);
	const [open, setOpen] = React.useState(false);
	const roleId = userProfile.roleId;
	const roleName = userProfile.role.name;

	useEffect(() => {
        if(!mainFolder){
            window.location = '/library/folders';
        }
        dispatch(UtilActions.getRoles())
        dispatch(Actions.getSubFolder(mainFolder.id));
        return (() => {
            dispatch(Actions.clearList());
        })
    }, [dispatch, mainFolder]);

	console.log(mainFolders)
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
	
	// const getAccess = () => {
	// 	if((mainFolder && mainFolder.id === 2) || (mainFolder && mainFolder.name.toUpperCase().includes("PRIVATE"))){
	// 		return mainFolder.access.includes(roleId.toString());
	// 	}
	// 	return true
    // }

	return (
		<PageLayout
                noSearch
                noPrevious
				prev={true}
				props={props}
				header={{
					icon: (mainFolder.id === 1 || (mainFolder && mainFolder.name.toUpperCase().includes('PUBLIC'))) ? 'folder_shared' : 'folder',
                    title: `Document Library / ${(mainFolder) ? mainFolder.name : pathName}`,
                    handleSearch: ({target: { value }}) => console.log(value),
                    showLink: true,
                    url: '/library/folders',
					isState: true
                }}
                button={{
                    showButton: true,
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
									userRole={roleName}
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
