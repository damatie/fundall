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
import DetailSidebarContent from './DetailSidebarContent';
import DetailSidebarHeader from './DetailSidebarHeader';
import FileList from './FileList';
import FileModal from './FileModal';
import { Link, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

function FileManagerApp(props) {
	const dispatch = useDispatch();
	const categories = useSelector(({ fileManagerApp }) => fileManagerApp.categories.categories);
	const searchText = useSelector(({ fileManagerApp }) => fileManagerApp.files.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const pageLayout = useRef(null);
	const categoryID = parseInt(props.match.params.id);
	const category = categories.find(cat => {
		return cat.id === parseInt(categoryID);
	});

	useEffect(() => {
		dispatch(Actions.getCategories());
	}, [dispatch]);

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
								<Icon className="text-32">folder</Icon>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<span className="text-24 mx-16">{category ? category.categoryName : 'Documents'} </span>
							</FuseAnimate>
							<div className="flex flex-1 items-center justify-center px-12">
								<FuseAnimate animation="transition.slideDownIn" delay={300}>
									<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
										<Icon color="action">search</Icon>

										<Input
											placeholder="Search"
											className="flex flex-1 mx-8"
											disableUnderline
											fullWidth
											value={searchText}
											inputProps={{
												'aria-label': 'Search'
											}}
											onChange={ev => dispatch(Actions.setFileSearchText(ev))}
										/>
									</Paper>
								</FuseAnimate>
							</div>
						</div>
						<Typography
							className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 mt-10 z-999"
							component={Link}
							role="button"
							to="/library/documents"
							color="inherit"
						>
							<span className="mx-10">
								<Icon className="text-20">{'arrow_back_ios'}</Icon> Back
							</span>
						</Typography>
					</div>
				</ThemeProvider>
			}
			content={<FileList pageLayout={pageLayout} props={props} />}
			leftSidebarVariant="temporary"
			// leftSidebarHeader={<MainSidebarHeader />}
			// leftSidebarContent={<MainSidebarContent />}
			rightSidebarHeader={<DetailSidebarHeader pageLayout={pageLayout} />}
			rightSidebarContent={<DetailSidebarContent pageLayout={pageLayout} />}
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('fileManagerApp', reducer)(FileManagerApp);
