import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import SharedTable from 'app/shared/sharedTable';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import PersonalTrainingCalendar from './personalTrainingCalendar';
import EventDialog from './EventDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import CardWidget from 'app/shared/widgets/CardWidget';
import TableWidget from 'app/shared/widgets/TrainingTableWidget';
import { AppBar, Button, Dialog, DialogActions, DialogContent, Grid, MenuItem, Paper, Toolbar, Typography } from '@material-ui/core';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import LoanStatus from '../loanApp/LoanStatus';

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

const allViews = Object.keys(Views).map(k => Views[k]);

const rows = [
    {
        id: 'name',
        field: 'name',
        align: 'center',
        disablePadding: false,
        label: 'Course Name',
        sort: true
    },
    {
        id: 'category',
        field: 'category',
        align: 'center',
        disablePadding: false,
        label: 'Category',
        sort: true
    },
    {
        id: 'industrySenority',
        field: 'industrySenority',
        align: 'center',
        disablePadding: false,
        label: 'Industry Senority',
        sort: true
    },
    {
        id: 'grade',
        field: 'grade',
        align: 'center',
        disablePadding: false,
        label: 'Grade',
        sort: true
    },
    {
        id: 'startDate',
        type: 'date',
        align: 'center',
        disablePadding: false,
        label: 'Start Date',
        sort: true
    },
    {
        id: 'endDate',
        type: 'date',
        align: 'center',
        disablePadding: false,
        label: 'End Date',
        sort: true
    },
    {
        id: 'status',
        field: 'status',
        align: 'center',
        disablePadding: false,
        label: 'Status',
        sort: true
    }
];

function PersonalTraining(props) {
    const dispatch = useDispatch();
    const events = useSelector(({ personalTraining }) => personalTraining.events.entities);
    const trainings = useSelector(({ personalTraining }) => personalTraining.trainings.trainings);
    const [open, setOpen] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null)

    const headerEl = useRef(null);

    useEffect(() => {
        dispatch(Actions.getEvents());
    }, [dispatch]);

    function moveEvent({ event, start, end }) {
        dispatch(
            Actions.updateEvent({
                ...event,
                start,
                end
            })
        );
    }

    const data = [
        {
            name: "Introduction to Software Engineering",
            category: "Technical",
            industrySenority: "9 years",
            grade: "GL9",
            startDate: new Date(),
            endDate: new Date(),
            status: "pending"
        },
        {
            name: "Introduction to Software Engineering",
            category: "Technical",
            industrySenority: "9 years",
            grade: "GL9",
            startDate: new Date(),
            endDate: new Date(),
            status: "pending"
        },
        {
            name: "Introduction to Software Engineering",
            category: "Technical",
            industrySenority: "9 years",
            grade: "GL9",
            startDate: new Date(),
            endDate: new Date(),
            status: "pending"
        },
        {
            name: "Introduction to Software Engineering",
            category: "Technical",
            industrySenority: "9 years",
            grade: "GL9",
            startDate: new Date(),
            endDate: new Date(),
            status: "pending"
        },
        {
            name: "Introduction to Software Engineering",
            category: "Technical",
            industrySenority: "9 years",
            grade: "GL9",
            startDate: new Date(),
            endDate: new Date(),
            status: "pending"
        },
        {
            name: "Introduction to Software Engineering",
            category: "Technical",
            industrySenority: "9 years",
            grade: "GL9",
            startDate: `${new Date().toLocaleDateString()}`,
            endDate: `${new Date().toLocaleDateString()}`,
            status: "pending"
        }
    ]

    const handleDelete = () => {

    };

    const handleClick = n => {
        if (!n.status.toLowerCase() === "pending") return;
        handleOpen();
        setSelectedTraining(n);
    }

    function resizeEvent({ event, start, end }) {
        delete event.type;
        dispatch(
            Actions.updateEvent({
                ...event,
                start,
                end
            })
        );
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Actions.cancelTrainingRequest(selectedTraining?.id))
    }

    return (
        <div className="p-12">

            <FuseAnimateGroup>
                <Paper className="m-10 mt-24 p-12">
                    <Typography variant="subtitle1" color="inherit" id="ispFontPro" className="p-24">Training List</Typography>

                    {
                        false && //for only line managers and admins
                        <Grid container spacing={3} alignItems='center' className="mb-24">
                            <Grid item lg={2}>
                                <SelectTextField
                                    value={"Category"}
                                    size='small'
                                    label='Year'
                                >
                                    {["Technical", "Certification"].map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </SelectTextField>
                            </Grid>
                            <Grid item lg={2}>
                                <SelectTextField
                                    value={"SREL"}
                                    size='small'
                                    label='Entity'
                                >
                                    {["5C", "SREL", "SRMC", "C-BIT"].map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </SelectTextField>
                            </Grid>
                        </Grid>
                    }

                    <Dialog open={open} onClose={handleClose} fullWidth>
                        <AppBar position="static">
                            <Toolbar className="flex w-full">
                                <Typography variant="subtitle1" color="inherit">
                                    {'Training Details'}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>

                            <table className={'w-full text-justify my-24'}>
                                <tbody>
                                    <tr className="mb-24">
                                        <th>Course Title: </th>
                                        <td>{selectedTraining?.name}</td>
                                    </tr>
                                    <tr className="mb-24">
                                        <th>Description: </th>
                                        <td>{selectedTraining?.description}</td>
                                    </tr>
                                    <tr className="mb-24">
                                        <th>Category: </th>
                                        <td>{selectedTraining?.category}</td>
                                    </tr>
                                    <tr className="mb-24">
                                        <th>Employee Grade: </th>
                                        <td>{selectedTraining?.employeeGrade}</td>
                                    </tr>
                                    <tr className="mb-24">
                                        <th>Company Seniority: </th>
                                        <td>{selectedTraining?.companySeniority}</td>
                                    </tr>
                                    <tr className="mb-24">
                                        <th>Company Seniority: </th>
                                        <td>{selectedTraining?.industrySeniority}</td>
                                    </tr>

                                    <tr className="mb-48">
                                        <th>Status</th>
                                        <td><LoanStatus status={selectedTraining?.status} /></td>
                                    </tr>
                                </tbody>
                            </table>

                        </DialogContent>
                        <DialogActions className="justify-between m-10 px-24 pb-12 sm:px-16">
                            <Button variant="contained" color="secondary" onClick={handleClose}>
                                Close
                                </Button>
                            {
                                selectedTraining?.status === "pending" ?
                                    <Button variant="contained" color="primary" onClick={handleSubmit} >
                                        Cancel Request
                                        </Button>
                                    :
                                    <></>
                            }
                        </DialogActions>
                    </Dialog >


                    <SharedTable data={data ?? []} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default' />
                </Paper >
            </FuseAnimateGroup >
        </div >
    );
}

export default withReducer('personalTraining', reducer)(PersonalTraining);

/*
IE 11 Fix
*/
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = s => {
        let el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
