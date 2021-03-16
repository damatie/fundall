import DemoContent from '@fuse/core/DemoContent';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import withReducer from 'app/store/withReducer';
import { useSelector } from 'react-redux';
import OnboardingFormList from './OnboardingFormList';
import formList from '../formList';
import FormContainer from './FormContainer';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
	layoutRoot: {}
});

const { useState, useRef } = React;

const OnboardingBase = () => {
	const classes = useStyles();
  const pageLayout = useRef(null);

	const { formName } = useParams();

  const [title, setTitle] = useState(formName);

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
					<h4>{title}</h4>
				</div>
			}
			content={
				<div className="p-24">
					{/* <h4>Content</h4> */}
					<br />
					<FormContainer />
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
        <OnboardingFormList setTitle={setTitle} />
				</div>
			}
			ref={pageLayout}
		/>
	);
};

export default OnboardingBase;

