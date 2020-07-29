import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import withReducer from 'app/store/withReducer';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from './Breadcrumb';
import DetailSidebarContent from './DetailSidebarContent';
import DetailSidebarHeader from './DetailSidebarHeader';
import FileList from './FileList';
import MainSidebarContent from './MainSidebarContent';
import MainSidebarHeader from './MainSidebarHeader';
import FileModal from './FileModal';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function FileManagerApp() {
	const dispatch = useDispatch();
	const searchText = useSelector(({ fileManagerApp }) => fileManagerApp.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const pageLayout = useRef(null);

	
	return (
		<FusePageSimple
			classes={{
				root: 'bg-red',
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
							<span className="text-24 mx-16">Document Library</span>
						</FuseAnimate>
					{/* <div className="flex flex-1 items-center justify-center px-12">
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
					</div> */}
					</div>
						<div className="flex flex-1 items-end">
							<FuseAnimate animation="transition.expandIn" delay={600}>
								<FileModal />
							</FuseAnimate>
						</div>
					</div>
			</ThemeProvider>
			}
			content={<FileList pageLayout={pageLayout} />}
			leftSidebarVariant="temporary"
			leftSidebarHeader={<MainSidebarHeader />}
			leftSidebarContent={<MainSidebarContent />}
			rightSidebarHeader={<DetailSidebarHeader />}
			rightSidebarContent={<DetailSidebarContent />}
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('fileManagerApp', reducer)(FileManagerApp);
