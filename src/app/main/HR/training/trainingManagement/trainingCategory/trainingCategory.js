import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import _ from '@lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './../store/actions';
import reducer from './../store/reducers';
import CardWidget from 'app/shared/widgets/CardWidget';
import CategoryTableWidget from 'app/shared/widgets/CategoryTableWidget';
import FuseAnimate from '@fuse/core/FuseAnimate';
import AddCategoryModal from './addCategoryModal';

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	},
	selectedProject: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '8px 0 0 0'
	},
	projectMenuButton: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '0 8px 0 0',
		marginLeft: 1
    },
    root: {
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    }
}));

function TrainingCategory(props) {
	const dispatch = useDispatch();
	const rows = useSelector(({ TrainingCategory }) => TrainingCategory.categories.data);
	const loading = useSelector(({ TrainingCategory }) => TrainingCategory.categories.loading);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	const classes = useStyles(props);
	const pageLayout = useRef(null);
    const [tabValue, setTabValue] = useState(0);
	const [selectedProject, setSelectedProject] = useState({
		id: 1,
		menuEl: null
	});

	useEffect(() => {
        dispatch(Actions.getCategories());
	}, [dispatch]);

	function handleChangeTab(event, value) {
		setTabValue(value);
    }
    
    function handleDelete(event, id){
        dispatch(Actions.deleteCategory(id))
    }

    const columns = [
        {
            id: 's/n',
            align: 'center',
            disablePadding: false,
            label: 'S/N',
            sort: true
        },
        {
            id: 'name',
            align: 'center',
            disablePadding: false,
            label: 'Name',
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
        },
        {
            id: 'option',
            align: 'center',
            disablePadding: false,
            label: 'Option',
            sort: true
        }
    ];
	return (
        <ThemeProvider theme={mainTheme}>
		<FusePageSimple
			classes={{
				root: 'bg-red',
				header: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
				sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
                rightSidebar: 'w-320',
				toolbar: 'min-h-48 h-48',
				content: classes.content
			}}
			header={
				<ThemeProvider theme={mainTheme}>
					<div className="flex flex-col items-center justify-between flex-1 px-24 pt-24">
                        <div className="flex items-center w-full">
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Icon className="text-32">school</Icon>
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <span className="text-24 mx-16">Training Category</span>
                            </FuseAnimate>
						<div className="flex flex-1 items-center justify-between px-12">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<AddCategoryModal />
							</FuseAnimate>
						</div>
                        </div>
                    </div>
                </ThemeProvider>
			}
			content={
				<div className="p-12">
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
                            <div className="widget flex w-full p-12">
								<CategoryTableWidget title={"Category List"} type="default" handleDelete={handleDelete} columns={columns} rows={rows}/>
							</div>
						</FuseAnimateGroup>
				</div>
			}
			ref={pageLayout}
		/>
        </ThemeProvider>
	);
}

export default withReducer('TrainingCategory', reducer)(TrainingCategory);
