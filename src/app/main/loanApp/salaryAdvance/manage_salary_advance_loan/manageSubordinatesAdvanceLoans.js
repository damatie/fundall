import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
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
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import SharedTable from 'app/shared/sharedTable';
import * as Actions from '../store/actions';
import reducers from '../store/reducers';
import { useAuth } from 'app/hooks/useAuth';

const useStyles = makeStyles(theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    productImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $productImageFeaturedStar': {
                opacity: 0.8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));


// Table rows
const rows = [
    {
        id: 'employeeLastName',
        align: 'left',
        disablePadding: false,
        label: 'Employee Last Name',
        sort: true,
        field: 'lastName'
    },
    {
        id: 'employeeFirstName',
        align: 'left',
        disablePadding: false,
        label: 'Employee First Name',
        sort: true,
        field: 'firstName'
    },
    {
        id: 'amountRequested',
        align: 'left',
        disablePadding: false,
        label: 'Amount Requested',
        sort: true,
        field: 'amount'
    },
    {
        id: 'requestDate',
        align: 'right',
        disablePadding: false,
        label: 'Request date',
        sort: true,
        field: 'createdAt',
        type: 'date'
    },
    {
        id: 'repaymentDate',
        align: 'right',
        disablePadding: false,
        label: 'Repayment date',
        sort: true,
        field: 'repaymentDate',
        type: 'date'
    },
];

//table click click event
const handleDelete = () => {

};

// filter data by status
const filterData = (data, status) => {
    const arr = [];
    for (const i of data) {
        if (i.status === status) {
            arr.push(i);
        }
    }
    return arr;
};

const userProfile = useAuth().getUserProfile;
function ManageSALoanForDirectSubordinates(props) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);

    const history = useHistory();

    // Redux store
    const profile = useSelector(({ profile }) => profile.data);
    const profileLoading = useSelector(({ profile }) => profile.loading);
    const salaryAdvance = useSelector(({ salaryAdvance }) => salaryAdvance.salaryAdvance);

    const classes = useStyles(props);

    function handleChangeTab(event, value) {
        setTabValue(value);
    }

    useEffect(() => {
        dispatch(Actions.getPendingSA());
        dispatch(Actions.getApprovedSA());
        dispatch(Actions.getOpenSA());
        dispatch(Actions.getClosedSA());
        dispatch(Actions.getReviewedSA());
        dispatch(Actions.getReviewed2SA());
        dispatch(Actions.getDisbursedSA());
    }, [dispatch]);

    useEffect(() => {
        // console.log(salaryAdvance)
    }, [salaryAdvance])

    const handleClick = e => {
        history.push(`/loan/review/salaryadvance/list/details/${e.loanId}`);
    }

    // useEffect(() => window.location.reload(false), [])
    if (/*loans.loading ||*/ profileLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <FusePageCarded
            classes={{
                toolbar: 'p-0',
                header: 'min-h-50 h-50 sm:h-136 sm:min-h-136'
            }}
            header={
                <div className="flex flex-1 w-full items-center justify-between">
                    <div className="flex justify-between w-full">
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Typography
                                className="normal-case flex items-center sm:mb-12"
                                component={Link}
                                role="button"
                                to="/loan/review/"
                                color="inherit"
                            >
                                <Icon className="text-20">
                                    arrow_back
								</Icon>
                                <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                                    Pending Loan Requests
                                </Typography>
                            </Typography>
                        </FuseAnimate>
                        <div className="flex items-center max-w-full">
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography
                                    className="normal-case flex items-center sm:mb-12"
                                    role="button"
                                    color="inherit"
                                >
                                    <Icon className="text-20">
                                        monetization_on
										</Icon>
                                    <span className="mx-4">Salary Advance Management</span>
                                </Typography>
                            </FuseAnimate>
                        </div>
                    </div>
                </div>
            }
            contentToolbar={
                (userProfile.role.name.toUpperCase() === 'LINE MANAGER') ?
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: 'w-full h-64' }}
                    >
                            <Tab className="h-64 normal-case" label="Pending Requests" />
                            <Tab className="h-64 normal-case" label="Reviewed Requests" />
                            <Tab className="h-64 normal-case" label="Approved Requests" />
                    </Tabs>
                : (userProfile.role.name.toUpperCase() === 'HR MANAGER') ?
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: 'w-full h-64' }}
                    >
                        <Tab className="h-64 normal-case" label="Pending Requests" />
                        <Tab className="h-64 normal-case" label="Reviewed Requests" />
                        <Tab className="h-64 normal-case" label="Approved Requests" />
                    </Tabs>
                :
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: 'w-full h-64' }}
                    >
                        <Tab className="h-64 normal-case" label="Pending Requests" />
                        <Tab className="h-64 normal-case" label="Approved Requests" />
                        <Tab className="h-64 normal-case" label="Disbursed Requests" />
                    </Tabs>

            }
            content={
                    (userProfile.role.name.toUpperCase() === 'LINE MANAGER') ? 
                        <div className=" sm:p-24 ">
                            {tabValue === 0 && (<SharedTable data={salaryAdvance?.pendingSA ?? []} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default' />)}
                            {tabValue === 1 && (<SharedTable data={salaryAdvance?.reviewedSA ?? []} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default' />)}
                            {tabValue === 2 && (<SharedTable data={salaryAdvance?.closedSA ?? []} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default' />)}
                        </div>
                    : (userProfile.role.name.toUpperCase() === 'HR MANAGER') ?
                        <div className=" sm:p-24 ">
                            {tabValue === 0 && (<SharedTable data={salaryAdvance?.reviewedSA ?? []} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default' />)}
                            {tabValue === 1 && (<SharedTable data={salaryAdvance?.reviewed2SA ?? []} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default' />)}
                            {tabValue === 2 && (<SharedTable data={salaryAdvance?.closedSA ?? []} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default' />)}
                        </div>
                    :
                        <div className=" sm:p-24 ">
                            {tabValue === 0 && (<SharedTable data={salaryAdvance?.reviewed2SA ?? []} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default' />)}
                            {tabValue === 1 && (<SharedTable data={salaryAdvance?.approvedSA ?? []} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default' />)}
                            {tabValue === 2 && (<SharedTable data={salaryAdvance?.disbursedSA ?? []} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default' />)}
                        </div>

            }
            innerScroll
        />
    );
};


export default withReducer('salaryAdvance', reducers)(ManageSALoanForDirectSubordinates);
