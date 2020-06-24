import DemoContent from '@fuse/core/DemoContent';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import LeftSideBar from './left-sidebar';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducer';
import SideBarContent from './sideBarContent';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
	layoutRoot: {}
});

function Onboarding() {
	const classes = useStyles();
  const pageLayout = useRef(null);
  const title = useSelector(({indexTab}) => indexTab.indexTab);

	return (
		<FusePageCarded
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="flex flex-col flex-1">
					<div className="flex items-center py-24">
						<Hidden lgUp>
							<IconButton
								onClick={ev => pageLayout.current.toggleLeftSidebar()}
								aria-label="open left sidebar"
							>
								<Icon>menu</Icon>
							</IconButton>
						</Hidden>
						<div className="flex-1">
              <div className="flex items-center flex-1">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <Icon className="text-32">check_box</Icon>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <span className="text-24 mx-16">Onboarding forms</span>
                </FuseAnimate>
              </div>
						</div>
					</div>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>{title.title}</h4>
				</div>
			}
			content={
				<div className="p-24">
					{/* <h4>Content</h4> */}
					<br />
					<SideBarContent />
				</div>
			}
			leftSidebarHeader={
				<div className="p-24">
					<></>
				</div>
			}
			leftSidebarContent={
				<div className="p-24">
				<h4>Onboarding forms list</h4>
					<br />
					<LeftSideBar />
				</div>
			}
			ref={pageLayout}
		/>
	);
};

export default withReducer('indexTab', reducer)(Onboarding);

