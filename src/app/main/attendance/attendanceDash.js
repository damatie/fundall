import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
// import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
// import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { ThemeProvider } from '@material-ui/core/styles';
import * as Actions from './store/actions';
import reducer from './store/reducers';
// import Table from '../RecruitmentTable';
// import { useAuth } from 'app/hooks/useAuth';
import AttendanceTable from './shared/table';
import { Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, MenuItem, Select, Tab } from '@material-ui/core';
// import RecruitmentDialog from '../recruitment/RecruitmentDialog';
// import { SelectFormsy, TextFieldFormsy } from '@fuse/core/formsy';
// import Select from '@material-ui/core/Select';
import Formsy from 'formsy-react';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const columns = [
    {
        id: 'entityName',
        // align: 'center',
        disablePadding: false,
        label: 'Activity Name',
        sort: true
    },
    {
        id: 'activityCode',
        // align: 'center',
        disablePadding: false,
        label: 'Activity Code',
        sort: true
    },
    {
        id: 'activityType',
        // align: 'center',
        disablePadding: false,
        label: 'Activity Type',
        sort: true
    },
    {
        id: 'modified',
        // align: 'center',
        disablePadding: false,
        label: 'Modified By',
        sort: true
    },
    {
        id: 'status',
        // align: 'center',
        disablePadding: false,
        label: 'Status',
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

function AttendanceDashboard(props) {

    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {

    }

    const handleChange = (value) => {
        let exist = selected.includes(value);

        if (!value) return;

        if (!exist) {
            console.log(selected)
            if (selected.length === 2) return Swal.fire("Cannot select more than 2 activities!");
            setSelected([].concat(selected).concat(value));
        } else {
            console.log("i run: ", selected)
            let newArr = selected;
            newArr.splice(selected.indexOf(value), 1);
            console.log("i run too: ", newArr)
            setSelected([].concat(newArr));
        }
    }

    // const dispatch = useDispatch();

    // const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const rows = [];

    const activities = useSelector(({ activity }) => activity.activities.activities)
    // const userData = useAuth().getUserData;

    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(Actions.fetchActivities());
    }, [dispatch])

    useEffect(() => {
        console.log(activities)
    }, [activities])

    return (
        <FusePageSimple
            classes={{
                toolbar: 'p-0',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={
                <>
                    <div className="flex flex-1 w-full items-center justify-between px-24">
                        <div className="flex flex-col items-start max-w-full">
                            <div className="flex items-center">
                                <Icon className="text-32">shopping_basket</Icon>
                                <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                                    Personal Attendance
								</Typography>
                            </div>
                        </div>

                        <div className="flex items-center max-w-full">
                            <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                                <Button
                                    className="mb-16"
                                    // component={Link}
                                    // to="/attendance/activity/new"
                                    role='button'
                                    onClick={() => setOpen(!open)}
                                    variant="contained"
                                    color="secondary"
                                    disableElevation
                                >
                                    Mark Attendance
                            </Button>
                            </div>
                        </div>
                    </div>

                    <Dialog
                        title='Activity for today'
                        open={open}
                        onClose={value => setOpen(value)}
                        TransitionComponent={props.transition && props.transition}
                        fullWidth={true}
                        maxWidth={'sm'}
                    // onUpdate={value => setUpdateOpen(value)}
                    >
                        <DialogTitle>
                            <span>Activity for today</span>
                        </DialogTitle>

                        <DialogContent>
                            <div className={"p-40"}>
                                <Formsy
                                    onSubmit={handleSubmit}
                                    className="flex flex-col justify-center w-full"
                                >
                                    <label>{selected.join(", ")}</label>
                                    <Select
                                        id="demo-mutiple-chip"
                                        className="mb-16 w-full"
                                        name="status"
                                        label="Status"
                                        // multiple
                                        // value={[]}
                                        // disabled={userCheck}
                                        // value={otherDetails.duration}
                                        onChange={(e) => handleChange(e.target.value)}
                                        // validations="not-equals:none"
                                        // validationError="requried"
                                        variant="outlined"
                                        // disabled={userCheck}
                                        required
                                    >
                                        <MenuItem value={""}>Select activities</MenuItem>
                                        {activities.map(item => (
                                            <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>

                                </Formsy>
                            </div>
                        </DialogContent>

                        <DialogActions className={"bg-white"}>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                            <Button onClick={handleSubmit} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
            contentToolbar={
                <Tabs
                    // value={tabValue}
                    // onChange={handleChangeTab}
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

export default withReducer('activity', reducer)(AttendanceDashboard);