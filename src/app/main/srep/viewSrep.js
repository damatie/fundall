import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import DetailsTab from './forms/viewForm';
import OtherFiles from './forms/otherFilesForm';
import { useAuth } from 'app/hooks/useAuth';
import ProgressBtn from 'app/shared/progressBtn';

const useStyles = makeStyles(theme => ({
}));

const userData = useAuth().getUserData;

	
function ViewSrep({ match }, props) {
	const dispatch = useDispatch();
	const theme = useTheme();

	const classes = useStyles(props);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const srepData = useSelector(({ ViewSrep }) => ViewSrep.srep.data);

    const [anchorEl, setAnchorEl] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const open = Boolean(anchorEl);
    
    const srepId = match.params.srepId;
	
	useEffect(() => {
		dispatch(Actions.getSrepByID(srepId));
	}, [dispatch])

	function handleChangeTab(event, value) {
		setTabValue(value);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleApprove = () => {
        dispatch(Actions.approveSrep(srepId));
        setAnchorEl(null);
    };

    const handleReject = () => {
        dispatch(Actions.rejectSrep(srepId));
        setAnchorEl(null);
    };

    const isHr = () => (userData.role.toUpperCase() === 'HR' || userData.role.toUpperCase() === 'FINANCE MANAGER');

    const isOnlyHr = () => (userData.role.toUpperCase() === 'HR');
    
    const isFinance = () => (userData.role.toUpperCase() === 'FINANCE MANAGER');

    const { loading, close } = useSelector(state => state.ViewSrep.srep);

    const status = ['approved', 'rejected', 'completed', 'pending'];

    const CheckStatus = (status) => {
        switch (status) {
            case "pending":
                return (
                    <Typography
                            className={'bg-blue text-white inline text-20 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;
            
            case "approved":
                return (
                    <Typography
                            className={'bg-green text-white inline text-20 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;
            
            case "rejected":
                return (
                    <Typography
                            className={'bg-red text-white inline text-20 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;
            case "reviewed":
                return (
                    <Typography
                            className={'bg-orange text-white inline text-20 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;
            case "completed":
                return (
                    <Typography
                            className={'bg-black text-white inline text-20 font-500 px-8 py-4 rounded-4'}
                        >
                            {status}
                    </Typography>
                )
                break;

            default:
                return (
                    <Typography>
                        {status}
                    </Typography>
                )
                break;
        }
    }
    

	return (
		<FusePageSimple
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<div className="flex flex-1 w-full items-center justify-between px-24">
					<div className="flex flex-col items-start max-w-full">
						<div className="flex items-center">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Icon
									className="text-24 text-black bg-white rounded-20"
									component={Link}
									to="/srep/all"
            			            role="button"
								>arrow_back</Icon>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
									Employee SpringRock Education Program Details
								</Typography>
							</FuseAnimate>
						</div>
					</div>

					<div className="flex items-center max-w-full">
						{ isFinance() && 
                        (!status.includes(srepData.status)) ? 
                        <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <div>
                                <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                                    <MenuIcon /> &nbsp; Options
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleApprove}>Approve</MenuItem>
                                    <MenuItem onClick={handleReject}>Reject</MenuItem>
                                </Menu>
                            </div>
							</FuseAnimate>
                        </div>
                        :
                        <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <div>
                                {CheckStatus(srepData.status)}
                            </div>
							</FuseAnimate>
						</div>
                    }
					</div>
				</div>
            }
            contentToolbar={
                <Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="off"
					className="w-full border-b-1 px-24"
				>
					<Tab className="text-14 font-600 normal-case" label="Details" />
					{isHr() ? <Tab className="text-14 font-600 normal-case" label="Other Files" /> : ''}
				</Tabs>
            }
			content={
                <div className=" sm:px-24 py-16 ">
                { tabValue === 0 && (
                    <DetailsTab srepData={srepData} />
                )}
                { tabValue === 1 && (
                    <OtherFiles srepData={srepData} isHr={isOnlyHr}/>
                )}
                </div>
			}
			innerScroll
		/>
	);
}

export default withReducer('ViewSrep', reducer)(ViewSrep);
