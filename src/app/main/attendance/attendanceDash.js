import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useMemo, useState } from 'react';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import AttendanceTable from './shared/attendancetable';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputAdornment, makeStyles, MenuItem, Select, Tab } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import ProgressBtn from 'app/shared/progressBtn';

const columns = [
    {
        id: 'activities',
        disablePadding: false,
        label: 'Activities',
        sort: true
    },
    {
        id: 'date',
        disablePadding: false,
        label: 'Date',
        sort: true
    },
    {
        id: 'status',
        disablePadding: false,
        label: 'Status',
        sort: true
    }
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

function AttendanceDashboard(props) {

    const classes = useStyles();

    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({});


    const activities = useSelector(({ activity }) => activity.activities.activities)
    const attendanceHistory = useSelector(({ activity }) => activity.activities.attendanceHistory?.rows ?? [])

    const [defaultValue, setDefaultValue] = useState("")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(Actions.fetchOwnAttendance());
        dispatch(Actions.fetchActivities());
    }, [dispatch]);

    useEffect(() => {
    }, [selected]);

    useEffect(() => {
        // console.log(activities, attendanceHistory)
    }, [activities, attendanceHistory])

    const handleSubmit = () => {
        if (selected.length < 2) {
            Swal.fire("Must select 2 activities!");
            return;
        };
        setOpen(false);
        dispatch(Actions.markAttendance(payload));
        
        setSelected([]);
        setPayload({});
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange2 = (value) => {

        let exist = selected.includes(value);

        if (!value) return;

        if (!exist) {
            if (selected.length === 2) return Swal.fire("Cannot select more than 2 activities!", "please unselect before re-selecting");

            setSelected([].concat(selected).concat(value));

            let tempActivities = payload?.activities;
            let newActivity = activities.filter(element => element.name === value);

            setPayload({
                activities: tempActivities ? [].concat(newActivity).concat(tempActivities) : newActivity,
                date: new Date().toLocaleDateString()
            });
            setDefaultValue("");

        } else {

            let newArr = selected;
            let oldActivities = payload.activities;

            let index = newArr.findIndex(element => element === value);

            oldActivities.splice(newArr.indexOf(value), 1);
            newArr.splice(index, 1);

            setSelected([].concat(newArr));;
            setPayload({
                activities: oldActivities,
                date: new Date().toLocaleDateString()
            });

            setDefaultValue("");
        }
    }

    const handleChange = (event, value) => {
        handleChange2(value);
    }

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
                    >
                        <DialogTitle>
                            <span>Activities for today</span>
                        </DialogTitle>

                        <DialogContent>
                            <div className={"p-40"}>
                                <FormControl required error={selected.length < 2} component="fieldset" className={classes.formControl}>
                                    <FormLabel>Select 2 activities for attendance</FormLabel>
                                    <FormGroup>
                                        {
                                            activities.length > 0 ?
                                                activities.map(item => (
                                                    <FormControlLabel
                                                        control={<Checkbox checked={selected.includes(item.name)} onChange={(e) => handleChange(e, item.name)} name="gilad" />}
                                                        label={`${item.name}: ${item.type}`}
                                                        key={item.id}
                                                    />
                                                )) :
                                                <Typography variant={"h3"}>Loading</Typography>
                                        }
                                    </FormGroup>
                                </FormControl>
                            </div>
                        </DialogContent>

                        <DialogActions className={"bg-white"}>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                            <ProgressBtn content={"Submit"} onClick={handleSubmit} color={"primary"} />
                        </DialogActions>
                    </Dialog>
                </>
            }
            content={
                <Paper className="m-20">
                    {
                        useMemo(() =>
                        (
                            <AttendanceTable
                                columns={columns}
                                rows={attendanceHistory}
                            />)
                            , [columns, attendanceHistory])
                    }
                </Paper>
            }
            innerScroll
        />
    );
};

export default withReducer('activity', reducer)(AttendanceDashboard);