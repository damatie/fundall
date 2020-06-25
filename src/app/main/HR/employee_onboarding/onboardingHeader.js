import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';
// import * as Actions from './store/actions';

function OnboardingHeader(props) {
	const dispatch = useDispatch();
	// const searchText = useSelector(({ mailApp }) => mailApp.mails.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const { t } = useTranslation('mailApp');

	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-1">
      <div className="flex items-center w-full">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">mail</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<span className="text-24 mx-16">Employee Onboarding List</span>
				</FuseAnimate>
			</div>
				<Paper
					className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 rounded-8"
					elevation={1}
				>
					<Hidden lgUp>
						<IconButton
							onClick={ev => props.pageLayout.current.toggleLeftSidebar()}
							aria-label="open left sidebar"
						>
							<Icon>menu</Icon>
						</IconButton>
					</Hidden>

					<Icon color="action">search</Icon>

					<Input
						placeholder={'search'}
						className="px-16"
						disableUnderline
						fullWidth
						// value={searchText}
						inputProps={{
							'aria-label': 'Search'
						}}
						// onChange={ev => dispatch(Actions.setSearchText(ev))}
					/>
				</Paper>
			</div>
		</ThemeProvider>
	);
}

export default OnboardingHeader;
