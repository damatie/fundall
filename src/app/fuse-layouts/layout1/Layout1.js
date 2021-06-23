import FuseDialog from '@fuse/core/FuseDialog';
import FuseMessage from '@fuse/core/FuseMessage';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseSuspense from '@fuse/core/FuseSuspense';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from 'app/AppContext';
import SettingsPanel from 'app/fuse-layouts/shared-components/SettingsPanel';
import clsx from 'clsx';
import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
// import { Link, useHistory, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import FooterLayout1 from './components/FooterLayout1';
import LeftSideLayout1 from './components/LeftSideLayout1';
import NavbarWrapperLayout1 from './components/NavbarWrapperLayout1';
import RightSideLayout1 from './components/RightSideLayout1';
import ToolbarLayout1 from './components/ToolbarLayout1';
import * as Actions from 'app/store/actions';
import { useAuth } from 'app/hooks/useAuth';
import withReducer from 'app/store/withReducer';
import reducer from 'app/store/reducers';
// import ChangePasswordModal from '../shared-components/ChangePasswordModal';

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
		'&.boxed': {
			maxWidth: 1280,
			margin: '0 auto',
			boxShadow: theme.shadows[3]
		},
		'&.scroll-body': {
			'& $wrapper': {
				height: 'auto',
				flex: '0 0 auto',
				overflow: 'auto'
			},
			'& $contentWrapper': {},
			'& $content': {}
		},
		'&.scroll-content': {
			'& $wrapper': {},
			'& $contentWrapper': {},
			'& $content': {}
		},
		'& .navigation': {
			'& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		}
	},
	wrapper: {
		display: 'flex',
		position: 'relative',
		width: '100%',
		height: '100%',
		flex: '1 1 auto'
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		zIndex: 3,
		overflow: 'hidden',
		flex: '1 1 auto'
	},
	content: {
		position: 'relative',
		display: 'flex',
		overflow: 'auto',
		flex: '1 1 auto',
		flexDirection: 'column',
		width: '100%',
		'-webkit-overflow-scrolling': 'touch',
		zIndex: 2
	}
}));

const isUserLoggedin = (user) => {
	if(Object.entries(user).length <= 0) {
		return false;
	}
	return true;
}

const changePasswordCondition = (profileStateData) => {
	if (isUserLoggedin(profileStateData) && (profileStateData?.isActivated !== true)) {
		// route to change password
		return <Redirect to='/auth/changepassword' />;
	}
}

const completeRegCondition = () => {
	const dataResponse = localStorage.getItem('login_data');
	const data = JSON.parse(dataResponse);
	console.log('User Login Data: ', data);
	if (data?.role?.name === "hr admin") {
		if (data?.company?.hasEntities === true)  {
			// route to complete registration
			if (data?.company?.regStep < 4) {
				console.log('should Redirect to Complete Registration ');
				// window.location.href('/auth/complete-registration');
				return <Redirect to='/auth/complete-registration' />
			}
		} else {
			// route to complete registration
			if (data?.company?.regStep < 3) {
				console.log('should Redirect to Complete Registration 3 steps');
				return <Redirect to='/auth/complete-registration' />
			}
		}
	}
}

function Layout1(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const profileState = useSelector(({ profile }) => profile);
	const id = useAuth().getId;
	const token = useAuth().getToken;
	const dispatch = useDispatch();

	useEffect(() => {
		if(token && id ){
			dispatch(Actions.getEmployeeProfile(id))
		}
		
	}, [dispatch]);

	useEffect(() => {
		if(profileState.data?.department) {
			dispatch(Actions.getDepartmentEmployees(profileState.data.department.id))
		}
	}, [profileState.data]);
	
	useEffect(() => {
		changePasswordCondition(profileState.data);
		// completeRegCondition();
	}, []);



	const appContext = useContext(AppContext);
	const classes = useStyles(props);
	const { routes } = appContext;

	// console.warn('FuseLayout:: rendered');

	switch (config.scroll) {
		case 'body': {
			return (
				<div id="fuse-layout" className={clsx(classes.root, config.mode, `scroll-${config.scroll}`)}>
					{config.leftSidePanel.display && <LeftSideLayout1 />}

					<div className="flex flex-1 flex-col overflow-hidden relative">
						{config.toolbar.display &&
							config.toolbar.style === 'fixed' &&
							config.toolbar.position === 'above' && <ToolbarLayout1 />}

						<FuseScrollbars className="overflow-auto" scrollToTopOnRouteChange>
							{config.toolbar.display &&
								config.toolbar.style !== 'fixed' &&
								config.toolbar.position === 'above' && <ToolbarLayout1 />}

							<div className={classes.wrapper}>
								{config.navbar.display && config.navbar.position === 'left' && <NavbarWrapperLayout1 />}

								<div className={classes.contentWrapper}>
									{config.toolbar.display && config.toolbar.position === 'below' && (
										<ToolbarLayout1 />
									)}

									<div className={classes.content}>
										<FuseDialog />

										<FuseSuspense>{renderRoutes(routes)}</FuseSuspense>

										{props.children}
									</div>

									{config.footer.display && config.footer.position === 'below' && <FooterLayout1 />}

									<SettingsPanel />
								</div>

								{config.navbar.display && config.navbar.position === 'right' && (
									<NavbarWrapperLayout1 />
								)}
							</div>

							{config.footer.display &&
								config.footer.style !== 'fixed' &&
								config.footer.position === 'above' && <FooterLayout1 />}
						</FuseScrollbars>

						{config.footer.display &&
							config.footer.style === 'fixed' &&
							config.footer.position === 'above' && <FooterLayout1 />}
					</div>

					{config.rightSidePanel.display && <RightSideLayout1 />}

					<FuseMessage />
					{/* <ChangePasswordModal open={isUserLoggedin(profileState.data) ? profileState.data?.isActivated ? false : true : false}/> */}
				</div>
			);
		}
		case 'content':
		default: {
			return (
				<div id="fuse-layout" className={clsx(classes.root, config.mode, `scroll-${config.scroll}`)}>
					{config.leftSidePanel.display && <LeftSideLayout1 />}

					<div className="flex flex-1 flex-col overflow-hidden relative">
						{config.toolbar.display && config.toolbar.position === 'above' && <ToolbarLayout1 />}

						<div className={classes.wrapper}>
							{config.navbar.display && config.navbar.position === 'left' && <NavbarWrapperLayout1 />}

							<div className={classes.contentWrapper}>
								{config.toolbar.display &&
									config.toolbar.position === 'below' &&
									config.toolbar.style === 'fixed' && <ToolbarLayout1 />}

								<FuseScrollbars className={classes.content} scrollToTopOnRouteChange>
									{config.toolbar.display &&
										config.toolbar.position === 'below' &&
										config.toolbar.style !== 'fixed' && <ToolbarLayout1 />}

									<FuseDialog />

									<FuseSuspense>{renderRoutes(routes)}</FuseSuspense>

									{props.children}

									{config.footer.display &&
										config.footer.position === 'below' &&
										config.footer.style !== 'fixed' && <FooterLayout1 />}
								</FuseScrollbars>

								{config.footer.display &&
									config.footer.position === 'below' &&
									config.footer.style === 'fixed' && <FooterLayout1 />}

								<SettingsPanel />
							</div>

							{config.navbar.display && config.navbar.position === 'right' && <NavbarWrapperLayout1 />}
						</div>

						{config.footer.display && config.footer.position === 'above' && <FooterLayout1 />}
					</div>

					{config.rightSidePanel.display && <RightSideLayout1 />}

					<FuseMessage />
					{/* <ChangePasswordModal open={isUserLoggedin(profileState.data) ? profileState.data?.isActivated ? false : true : false}/> */}
				</div>
			);
		}
	}
}

withReducer('profile', reducer)(Layout1);
export default React.memo(Layout1);
