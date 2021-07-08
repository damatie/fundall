import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
// import * as UtilActions from '../../store/actions';
import reducer from '../store/reducers';
import CardWidget from 'app/shared/widgets/CardWidget';
import MainFolderTable from './mainFolderTable';
import { useAuth } from 'app/hooks/useAuth';

const columns = [
	{
		id: 'icon',
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
		id: 'description',
		align: 'center',
		disablePadding: false,
		label: 'Description',
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
		id: 'option',
		align: 'center',
		disablePadding: false,
		label: '',
		sort: true
	}
];

const userId = useAuth().getId;
const userData = useAuth().getUserData;

function MainFolder(props) {
	const dispatch = useDispatch();
    const mainFolder = useSelector(({mainFolder}) => mainFolder.folders.mainFolders);
    console.log(mainFolder)
	// const roles = useSelector(({ roles }) => roles.roleList);
	// const departments = useSelector(({ departments }) => departments.deparmentList);
	// const entities = useSelector(({ entities }) => entities.entityList);
	useEffect(() => {
		dispatch(Actions.getMainFolder());
		
	}, [dispatch]);

	return (
		<PageLayout
            noSearch
            header={{
                icon: 'folder',
                title: 'Document Library',
                handleSearch: ({target: { value }}) => console.log(value),
            }}
            button={{
                showButton: false
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
                            <MainFolderTable
                                title={'Main Folder'}
                                allowClick={true}
                                type="default"
                                columns={columns}
                                rows={mainFolder}
                                props={props}
                            />
                        </div>
                    </FuseAnimateGroup>
                </div>
            }
        />
	);
}

export default withReducer('mainFolder', reducer)(MainFolder);
