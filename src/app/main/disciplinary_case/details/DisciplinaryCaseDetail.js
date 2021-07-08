import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import withReducer from 'app/store/withReducer';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import ActionTable from '../Actions/ActionTable';

function DisciplinaryCaseDetail(props) {
	const dispatch = useDispatch();
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const pageLayout = useRef(null);
	// const categoryID = parseInt(props.match.params.id);

	useEffect(() => {
		// dispatch(Actions.getCategories());
	}, [dispatch]);

	function handleDelete(event, id){
        // dispatch(Actions.DisciplinaryCase(id))
    }

    function handleEdit(event, model){
        console.log(model)
        // dispatch(Actions.updateDisciplinaryCase(model, model.id));
    }

    console.log(rows);

    const columns = [
        {
            id: 'action',
            align: 'center',
            disablePadding: false,
            label: 'Action',
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
            id: 'owner',
            align: 'center',
            disablePadding: false,
            label: 'Owner',
            sort: true
        },
        {
            id: 'createdAt',
            align: 'center',
            disablePadding: false,
            label: 'Created Time',
            sort: true
        },
        {
            id: 'updatedAt',
            align: 'center',
            disablePadding: false,
            label: 'Updated Time',
            sort: true
        }
	];
	
	const rows = [];

	return (
		<FusePageCarded
			classes={{
				// root: 'bg-red',
				header: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
				sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
				rightSidebar: 'w-320'
			}}
			header={
				<ThemeProvider theme={mainTheme}>
					<div className="flex flex-col flex-1 p-8 sm:p-12 relative">
						<div className="flex items-center w-full">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Icon className="text-32">assignment_late</Icon>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<span className="text-24 mx-16">{'Disciplinary Actions'} </span>
							</FuseAnimate>
							<div className="flex flex-1 items-center justify-center px-12">
							</div>
						</div>
						<Typography
							className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 mt-10 z-999"
							component={Link}
							role="button"
							to="/disciplinary/case"
							color="inherit"
						>
							<span className="mx-10">
								<Icon className="text-20">{'arrow_back_ios'}</Icon> Back
							</span>
						</Typography>
					</div>
				</ThemeProvider>
			}
			content={<ActionTable title={""} type="default" handleDelete={handleDelete} handleEdit={handleEdit} columns={columns} rows={rows} showEdit={true} showDesc={true}/>}
			leftSidebarVariant="temporary"
			// innerScroll
		/>
	);
}

export default DisciplinaryCaseDetail;