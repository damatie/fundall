import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { useAuth } from 'app/hooks/useAuth';
import AttendanceTable from './shared/table';
import { Tab } from '@material-ui/core';
import withReducer from 'app/store/withReducer';

const columns = [
    {
        id: 'name',
        // align: 'center',
        disablePadding: false,
        label: 'Activity Name',
        sort: true
    },
    {
        id: 'description',
        // align: 'center',
        disablePadding: false,
        label: 'Description',
        sort: true
    },
    {
        id: 'code',
        // align: 'center',
        disablePadding: false,
        label: 'Activity Code',
        sort: true
    },
    {
        id: 'type',
        // align: 'center',
        disablePadding: false,
        label: 'Activity Type',
        sort: true
    },
    {
        id: 'createdAt',
        // align: 'center',
        disablePadding: false,
        label: 'Creation Date',
        sort: true
    },
    {
        id: 'actions',
        // align: 'center',
        disablePadding: false,
        label: 'Actions',
        sort: true
    },
];

function ActivityList(props) {

    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const rows = useSelector(({ activity }) => activity.activities.activities);

    const userData = useAuth().getUserData;
    const isAdmin = () => userData.role.toUpperCase() === "HR MANAGER";

    useEffect(() => {
        dispatch(Actions.fetchActivities());
    }, [dispatch]);

    useEffect(() => {
    }, [rows]);

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
                            <Icon className="text-32">shopping_basket</Icon>
                            <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                                Attendance Activity
								</Typography>
                        </div>
                    </div>

                    <div className="flex flex-1 items-center justify-center px-12">
                        <ThemeProvider theme={mainTheme}>
                            <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
                                <Icon color="action">search</Icon>
                                <Input
                                    placeholder="Search"
                                    className="flex flex-1 mx-8"
                                    disableUnderline
                                    fullWidth
                                    value={search}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={ev => setSearch(ev.target.value)}
                                />
                            </Paper>
                        </ThemeProvider>
                    </div>

                    {isAdmin() &&
                        <div className="flex items-center max-w-full">
                            <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                                <Button
                                    component={Link}
                                    to="/attendance/activity/new"
                                    role='button'
                                    variant="contained"
                                    color="secondary"
                                    disableElevation
                                >
                                    Create New Activity
									</Button>
                            </div>
                        </div>
                    }
                </div>
            }
            contentToolbar={
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="off"
                    className="w-full border-b-1 px-24"
                >
                    <Tab className="text-14 font-600 normal-case" label="Activity List" />
                </Tabs>
            }
            content={
                <Paper className="m-20">
                    <AttendanceTable
                        columns={columns}
                        rows={rows}
                        search={search}
                    />
                </Paper>
            }
            innerScroll
        />
    );
}


export default withReducer('activity', reducer)(ActivityList);