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
import { useParams, useHistory } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import CustomIconButton from 'app/shared/button/CustomIconButton';
import { useDispatch } from 'react-redux';
import { submitForms } from '../store/actions';
import useUserID from '../hooks/useUserID';


const useStyles = makeStyles({
	layoutRoot: {}
});

const { useState, useRef } = React;

const OnboardingBase = () => {
	const classes = useStyles();
	const pageLayout = useRef(null);

	const { formName, id } = useParams();

	const employeeId = useUserID();

	const { push } = useHistory();

	const dispatch = useDispatch();

	const [title, setTitle] = useState(formName);

	const {
		employeeInfo: { loading },
		onboardingForms: {
			checkForms,
			forms,
		}
	} = useSelector(state => state.onboardingForms);

	return (
		<FusePageCarded
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="flex flex-col flex-1">
					<div className="flex items-center py-24 w-full justify-between">
						<div className="flex items-center">
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
									{!!id && (<FuseAnimate animation="transition.expandIn" delay={300}>
										<IconButton
											onClick={ev => push('/onboarding/list')}
											aria-label="open left sidebar"
										>
											<Icon className="text-32">arrow_back</Icon>
										</IconButton>

									</FuseAnimate>)}
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<span className="text-24 mx-16">Onboarding forms</span>
									</FuseAnimate>
								</div>
							</div>
						</div>
						{
							(Object.entries(forms).length < 0 && !id) && (
								<CustomIconButton type='success' icon='check' onClick={() => dispatch(submitForms(employeeId.id))}>
									Submit Onboarding Forms
								</CustomIconButton>
							)
						}
					</div>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					{
						loading || checkForms.loading ? (
							<Skeleton variant="rect" width={100} height={20} animation="wave" className='my-16' />
						) : (
							<h4>{title}</h4>
						)
					}
				</div>
			}
			content={
				<div className="p-24 h-full">
					{/* <h4>Content</h4> */}
					<br />
					{
						loading || checkForms.loading ? (
							<Skeleton variant="rect" width={'100%'} height={'100%'} animation="wave" className='my-16' />
						) : (
							<FormContainer />
						)
					}
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
					<OnboardingFormList loading={loading || checkForms.loading} setTitle={setTitle} />
				</div>
			}
			ref={pageLayout}
		/>
	);
};

export default OnboardingBase;

