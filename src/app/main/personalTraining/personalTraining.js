// import FuseAnimate from '@fuse/core/FuseAnimate';
// import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
// import Fab from '@material-ui/core/Fab';
// import Icon from '@material-ui/core/Icon';
// import { makeStyles } from '@material-ui/core/styles';
// import withReducer from 'app/store/withReducer';
// import clsx from 'clsx';
// import SharedTable from 'app/shared/sharedTable';
// import moment from 'moment';
// import React, { useEffect, useRef, useState } from 'react';
// import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import * as ReactDOM from 'react-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import PersonalTrainingCalendar from './personalTrainingCalendar';
// import EventDialog from './EventDialog';
// import * as Actions from './store/actions';
// import reducer from './store/reducers';
// import CardWidget from 'app/shared/widgets/CardWidget';
// import TableWidget from 'app/shared/widgets/TrainingTableWidget';
// import { AppBar, Button, Dialog, DialogActions, DialogContent, Grid, MenuItem, Paper, Toolbar, Typography } from '@material-ui/core';
// import SelectTextField from 'app/shared/TextInput/SelectTextField';
// import LoanStatus from '../loanApp/LoanStatus';

// const localizer = momentLocalizer(moment);

// const DragAndDropCalendar = withDragAndDrop(Calendar);

// const allViews = Object.keys(Views).map(k => Views[k]);

// const rows = [
//     {
//         id: 'name',
//         field: 'name',
//         align: 'center',
//         disablePadding: false,
//         label: 'Course Name',
//         sort: true
//     },
//     {
//         id: 'category',
//         field: 'category',
//         align: 'center',
//         disablePadding: false,
//         label: 'Category',
//         sort: true
//     },
//     {
//         id: 'industrySenority',
//         field: 'industrySenority',
//         align: 'center',
//         disablePadding: false,
//         label: 'Industry Senority',
//         sort: true
//     },
//     {
//         id: 'grade',
//         field: 'grade',
//         align: 'center',
//         disablePadding: false,
//         label: 'Grade',
//         sort: true
//     },
//     {
//         id: 'startDate',
//         type: 'date',
//         align: 'center',
//         disablePadding: false,
//         label: 'Start Date',
//         sort: true
//     },
//     {
//         id: 'endDate',
//         type: 'date',
//         align: 'center',
//         disablePadding: false,
//         label: 'End Date',
//         sort: true
//     },
//     {
//         id: 'status',
//         field: 'status',
//         align: 'center',
//         disablePadding: false,
//         label: 'Status',
//         sort: true
//     }
// ];

// function PersonalTraining(props) {
//     const dispatch = useDispatch();
//     const events = useSelector(({ personalTraining }) => personalTraining.events.entities);
//     const trainings = useSelector(({ personalTraining }) => personalTraining.trainings.trainings);
//     const [open, setOpen] = useState(false);
//     const [selectedTraining, setSelectedTraining] = useState(null)

//     const headerEl = useRef(null);

//     useEffect(() => {
//         dispatch(Actions.getEvents());
//     }, [dispatch]);

//     function moveEvent({ event, start, end }) {
//         dispatch(
//             Actions.updateEvent({
//                 ...event,
//                 start,
//                 end
//             })
//         );
//     }

//     const data = [
//         {
//             name: "Introduction to Software Engineering",
//             category: "Technical",
//             industrySenority: "9 years",
//             grade: "GL9",
//             startDate: new Date(),
//             endDate: new Date(),
//             status: "pending"
//         },
//         {
//             name: "Introduction to Software Engineering",
//             category: "Technical",
//             industrySenority: "9 years",
//             grade: "GL9",
//             startDate: new Date(),
//             endDate: new Date(),
//             status: "pending"
//         },
//         {
//             name: "Introduction to Software Engineering",
//             category: "Technical",
//             industrySenority: "9 years",
//             grade: "GL9",
//             startDate: new Date(),
//             endDate: new Date(),
//             status: "pending"
//         },
//         {
//             name: "Introduction to Software Engineering",
//             category: "Technical",
//             industrySenority: "9 years",
//             grade: "GL9",
//             startDate: new Date(),
//             endDate: new Date(),
//             status: "pending"
//         },
//         {
//             name: "Introduction to Software Engineering",
//             category: "Technical",
//             industrySenority: "9 years",
//             grade: "GL9",
//             startDate: new Date(),
//             endDate: new Date(),
//             status: "pending"
//         },
//         {
//             name: "Introduction to Software Engineering",
//             category: "Technical",
//             industrySenority: "9 years",
//             grade: "GL9",
//             startDate: `${new Date().toLocaleDateString()}`,
//             endDate: `${new Date().toLocaleDateString()}`,
//             status: "pending"
//         }
//     ]

//     const handleDelete = () => {

//     };

//     const handleClick = n => {
//         if (!n.status.toLowerCase() === "pending") return;
//         handleOpen();
//         setSelectedTraining(n);
//     }

//     function resizeEvent({ event, start, end }) {
//         delete event.type;
//         dispatch(
//             Actions.updateEvent({
//                 ...event,
//                 start,
//                 end
//             })
//         );
//     }

//     const handleClose = () => {
//         setOpen(false)
//     }

//     const handleOpen = () => {
//         setOpen(true);
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(Actions.cancelTrainingRequest(selectedTraining?.id))
//     }

//     return (
//         <div className="p-12">

//             <FuseAnimateGroup>
//                 <Paper className="m-10 mt-24 p-12">
//                     <Typography variant="subtitle1" color="inherit" id="ispFontPro" className="p-24">Training List</Typography>

//                     {
//                         false && //for only line managers and admins
//                         <Grid container spacing={3} alignItems='center' className="mb-24">
//                             <Grid item lg={2}>
//                                 <SelectTextField
//                                     value={"Category"}
//                                     size='small'
//                                     label='Year'
//                                 >
//                                     {["Technical", "Certification"].map((item, index) => (
//                                         <MenuItem value={item} key={index}>
//                                             {item}
//                                         </MenuItem>
//                                     ))}
//                                 </SelectTextField>
//                             </Grid>
//                             <Grid item lg={2}>
//                                 <SelectTextField
//                                     value={"SREL"}
//                                     size='small'
//                                     label='Entity'
//                                 >
//                                     {["5C", "SREL", "SRMC", "C-BIT"].map((item, index) => (
//                                         <MenuItem value={item} key={index}>
//                                             {item}
//                                         </MenuItem>
//                                     ))}
//                                 </SelectTextField>
//                             </Grid>
//                         </Grid>
//                     }

//                     <Dialog open={open} onClose={handleClose} fullWidth>
//                         <AppBar position="static">
//                             <Toolbar className="flex w-full">
//                                 <Typography variant="subtitle1" color="inherit">
//                                     {'Training Details'}
//                                 </Typography>
//                             </Toolbar>
//                         </AppBar>
//                         <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>

//                             <table className={'w-full text-justify my-24'}>
//                                 <tbody>
//                                     <tr className="mb-24">
//                                         <th>Course Title: </th>
//                                         <td>{selectedTraining?.name}</td>
//                                     </tr>
//                                     <tr className="mb-24">
//                                         <th>Description: </th>
//                                         <td>{selectedTraining?.description}</td>
//                                     </tr>
//                                     <tr className="mb-24">
//                                         <th>Category: </th>
//                                         <td>{selectedTraining?.category}</td>
//                                     </tr>
//                                     <tr className="mb-24">
//                                         <th>Employee Grade: </th>
//                                         <td>{selectedTraining?.employeeGrade}</td>
//                                     </tr>
//                                     <tr className="mb-24">
//                                         <th>Company Seniority: </th>
//                                         <td>{selectedTraining?.companySeniority}</td>
//                                     </tr>
//                                     <tr className="mb-24">
//                                         <th>Company Seniority: </th>
//                                         <td>{selectedTraining?.industrySeniority}</td>
//                                     </tr>

//                                     <tr className="mb-48">
//                                         <th>Status</th>
//                                         <td><LoanStatus status={selectedTraining?.status} /></td>
//                                     </tr>
//                                 </tbody>
//                             </table>

//                         </DialogContent>
//                         <DialogActions className="justify-between m-10 px-24 pb-12 sm:px-16">
//                             <Button variant="contained" color="secondary" onClick={handleClose}>
//                                 Close
//                                 </Button>
//                             {
//                                 selectedTraining?.status === "pending" ?
//                                     <Button variant="contained" color="primary" onClick={handleSubmit} >
//                                         Cancel Request
//                                         </Button>
//                                     :
//                                     <></>
//                             }
//                         </DialogActions>
//                     </Dialog >


//                     <SharedTable data={data ?? []} rows={rows} handleClick={handleClick} handleDelete={handleDelete} type='default' />
//                 </Paper >
//             </FuseAnimateGroup >
//         </div >
//     );
// }

// export default withReducer('personalTraining', reducer)(PersonalTraining);

// /*
// IE 11 Fix
// */
// if (!Element.prototype.matches) {
//     Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
// }

// if (!Element.prototype.closest) {
//     Element.prototype.closest = s => {
//         let el = this;

//         do {
//             if (el.matches(s)) return el;
//             el = el.parentElement || el.parentNode;
//         } while (el !== null && el.nodeType === 1);
//         return null;
//     };
// }

import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { useAuth } from 'app/hooks/useAuth';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';
import SharedTable from 'app/shared/sharedTable';
import * as hodActions from 'app/main/line_manager/training/deptTraining/store/actions';
import ViewTrainings from './components/viewingTrainings';

const useStyles = makeStyles(theme => ({
    header: {
        background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: theme.palette.getContrastText(theme.palette.primary.main)
    },
    headerIcon: {
        position: 'absolute',
        top: -64,
        left: 0,
        opacity: 0.04,
        fontSize: 512,
        width: 512,
        height: 512,
        pointerEvents: 'none'
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '32px',
        marginTop: '30px'
    },
    previousBtn: {
        marginBottom: 10,
        alignSelf: 'left',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        color: 'white',
        fontSize: 20
    },
}));

const rows = [
    {
        id: 'trainingName',
        field: 'trainingName',
        align: 'center',
        disablePadding: false,
        label: 'Training Name',
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
        id: 'employeeGrade',
        field: 'employeeGrade',
        align: 'center',
        disablePadding: false,
        label: 'Grade',
        sort: true
    },
    {
        id: 'companySeniority',
        field: 'companySeniority',
        align: 'center',
        disablePadding: false,
        label: 'Company Seniority',
        sort: true
    },
    {
        id: 'industrySeniority',
        field: 'industrySeniority',
        align: 'center',
        disablePadding: false,
        label: 'Industry Seniority',
        sort: true
    },
    {
        id: 'startDate',
        type: 'date',
        field: "startDate",
        align: 'center',
        disablePadding: false,
        label: 'Start Date',
        sort: true
    },
    {
        id: 'endDate',
        type: 'date',
        field: "endDate",
        align: 'center',
        disablePadding: false,
        label: 'End Date',
        sort: true
    },
    {
        id: 'certification',
        field: 'certification',
        align: 'center',
        disablePadding: false,
        label: 'Certification',
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
    const courses = useSelector(({ academyApp }) => academyApp.courses.courses);

    const trainings = useSelector(({ academyApp }) => academyApp.trainings);
    const entities = useSelector(({ academyApp }) => academyApp.trainings.entities);
    const department = useSelector(({ academyApp }) => academyApp.trainings.department);
    const categories = useSelector(({ academyApp }) => academyApp.courses.categories.rows);

    const employees = useSelector(({ academyApp }) => academyApp.employees.employees);
    const totalNo = useSelector(({ academyApp }) => academyApp.courses.totalNo);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

    const [tabValue, setTabValue] = React.useState(0);

    function handleChangeTab(event, value) {
        setTabValue(value);
    }

    const classes = useStyles(props);
    const theme = useTheme();
    const [_, setData] = useState(courses);
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState({
        department: "all",
        entity: "all",
        category: "all"
    });
    const [search, setSearch] = useState('');
    // const [start, setStart] = useState(moment(new Date(), 'MM/DD/YYYY').add(1, 'days'));
    // const [end, setEnd] = useState(moment(new Date(), 'MM/DD/YYYY').add(1, 'days'));
    // const [duration, setDuration] = useState('');
    const [id, setId] = useState('');
    const [hod, setHod] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    // const userData = useAuth().getUserData;
    const profile = useSelector(({ profile }) => profile.data);
    // const userId = useAuth().getId;
    // const [filterEmployees, setFilterEmployees] = useState(
    //     employees.filter(f => {
    //         return (f.firstName !== null || f.lastName !== null || f?.role.name.toLowerCase() !== 'employee' || f?.roleId !== 8);
    //     }).sort((a, b) => {
    //         if (a.firstName + " " + a.lastName < b.firstName + " " + b.lastName) { return -1; }
    //         if (a.firstName + " " + a.lastName > b.firstName + " " + b.lastName) { return 1; }
    //         return 0;
    //     }));

    const [selectedData, setSelectedData] = useState([]);

    const changeDepartment = (id) => {
        dispatch(Actions.getDepartments(id));
    }


    useEffect(() => {
        dispatch(Actions.getPendingTrainingPersonal());
        dispatch(Actions.getReviewedTrainingPersonal());
        dispatch(Actions.getApprovedTrainingPersonal());
        dispatch(Actions.getCompletedTrainingPersonal());
        dispatch(Actions.getRejectedTrainingPersonal());

        dispatch(Actions.getCourseCategories());
        dispatch(Actions.getCategories());
        dispatch(Actions.getEntities());
        // dispatch(Actions.getDepartments(1));

        dispatch(Actions.getRoles());

    }, [dispatch])

    useEffect(() => {
    }, [department, trainings]);

    // useEffect(() => {
    //     if (search.length >= 2) {
    //         setData(_.filter(courses, row => row.name.toLowerCase().includes(search.toLowerCase())));
    //     } else {
    //         setData(courses);
    //     }
    // }, [courses, search]);

    // useEffect(() => {
    //     if (filter !== 'all') {
    //         setData(_.filter(courses, row => row.category.toLowerCase() === filter.toLowerCase()));
    //     } else {
    //         setData(courses);
    //     }
    // }, [courses, filter]);

    // useEffect(() => {
    //     if (employees.length > 0) {
    //         setFilterEmployees(_.filter(employees, em => em.id !== userId && em.firstName !== null));
    //     }
    // }, [employees]);

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    function handleFilter(event) {
        if (event.target.name === "entity") {
            let id = entities.find(element => element.name = event.target.value);
            changeDepartment(id.id);
        }
        setFilter({ ...filter, [event.target.name]: event.target.value });
    }

    const handleChangePage = (event, value) => {
        let newPage = value - 1;

        switch (tabValue) {
            case 0:
                dispatch(Actions.getPendingTrainingPersonal(rowsPerPage, newPage * rowsPerPage));
                break;
            case 1:
                dispatch(Actions.getReviewedTrainingPersonal(rowsPerPage, newPage * rowsPerPage));
                break;
            case 2:
                dispatch(Actions.getApprovedTrainingPersonal(rowsPerPage, newPage * rowsPerPage));
                break;
            case 3:
                dispatch(Actions.getCompletedTrainingPersonal(rowsPerPage, newPage * rowsPerPage));
                break;
            case 3:
                dispatch(Actions.getRejectedTrainingPersonal(rowsPerPage, newPage * rowsPerPage));
                break;
            default:
                break;
        }
        setPage(value);
        window.scrollTo(0, 0);
        // alert('hello');
    };

    function handleApproveTraining(id, role) {
        if (role === "lm") {
            dispatch(hodActions.approveTraining(id))
        } else {

        }
    }

    function handleRejectraining(id, role) {
        if (role === "lm") {
            dispatch(hodActions.rejectTraining(id))
        } else {

        }
    }

    const goToPreviousRoute = () => {
        window.location = '/training/personal';
    }

    function handleClose() {
        setOpen(false);
    }

    function handleOpen(values) {
        setOpen(true);
        setSelectedData(values);
    }

    return (
        <ThemeProvider theme={mainTheme}>
            <div className="flex flex-col flex-auto flex-shrink-0 w-full">
                <div
                    className={clsx(
                        classes.header,
                        'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-100 sm:h-188'
                    )}
                >
                    <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                        <Typography color="inherit" className="text-24 sm:text-40 font-light">
                            PERSONAL TRAINING LIST
						</Typography>
                    </FuseAnimate>
                    <Icon className={classes.headerIcon}> school </Icon>
                </div>
                <div className={classes.header + " flex justify-between w-full"}>
                    <IconButton className={classes.previousBtn} aria-label="go back" component="span" onClick={goToPreviousRoute}>
                        <ArrowBackIcon />
                    </IconButton>

                </div>
                <div className="flex flex-col flex-1 w-full mx-auto px-8 sm:px-16 py-24">
                    <div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
                        <TextField
                            label="Search for a course"
                            placeholder="Enter a keyword..."
                            className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
                            value={search}
                            inputProps={{
                                'aria-label': 'Search'
                            }}
                            onChange={handleSearch}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />

                        <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                            <InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
                            <Select
                                value={filter.category}
                                onChange={handleFilter}
                                input={
                                    <OutlinedInput labelWidth={'category'.length * 9} name="category" id="category-label-placeholder" />
                                }
                            >
                                <MenuItem value="all">
                                    <em> All </em>
                                </MenuItem>
                                {categories?.map(category => (
                                    <MenuItem value={category.id} key={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {/* opening up a training request */}
                    <ViewTrainings
                        open={open}
                        handleClose={handleClose}
                        data={selectedData}
                        viewer={profile?.role?.name}
                        approveTraining={handleApproveTraining}
                        rejectTraining={handleRejectraining}
                    />
                    {/* End Dialog  */}

                    {useMemo(
                        () =>
                            trainings &&
                            ((
                                //     trainings?.pendingTrainings.length > 0 ||
                                //     trainings?.approvedTrainings.length > 0 ||
                                //     trainings?.completedTrainings.length > 0 ||
                                trainings
                            )
                                ? (
                                    <div>
                                        <FuseAnimateGroup
                                            enter={{
                                                animation: 'transition.slideUpBigIn'
                                            }}
                                            className="flex flex-wrap py-24"
                                        >
                                            <Tabs
                                                value={tabValue}
                                                onChange={handleChangeTab}
                                                indicatorColor="primary"
                                                textColor="primary"
                                                variant="scrollable"
                                                scrollButtons="auto"
                                                classes={{ root: 'w-full h-64' }}
                                            >
                                                <Tab className="h-64 normal-case" label="Pending Trainings" />
                                                <Tab className="h-64 normal-case" label="Reviewed Trainings" />
                                                <Tab className="h-64 normal-case" label="Approved Trainings" />
                                                <Tab className="h-64 normal-case" label="Completed Trainings" />
                                                <Tab className="h-64 normal-case" label="Rejected Trainings" />
                                            </Tabs>

                                            <div className="w-full">
                                                {tabValue === 0 && (<SharedTable data={trainings?.pendingPersonalTrainings.rows ?? []} rows={rows} type='default' handleClick={handleOpen} />)}
                                                {tabValue === 1 && (<SharedTable data={trainings?.reviewedPersonalTrainings.rows ?? []} rows={rows} type='default' handleClick={handleOpen} />)}
                                                {tabValue === 2 && (<SharedTable data={trainings?.approvedPersonalTrainings.rows ?? []} rows={rows} type='default' handleClick={handleOpen} />)}
                                                {tabValue === 3 && (<SharedTable data={trainings?.completedPersonalTrainings?.rows ?? []} rows={rows} type='default' handleClick={handleOpen} />)}
                                                {tabValue === 4 && (<SharedTable data={trainings?.rejectedPersonalTrainings.rows ?? []} rows={rows} type='default' handleClick={handleOpen} />)}
                                            </div>


                                        </FuseAnimateGroup>
                                        <div className={classes.pagination}>
                                            <Pagination count={Math.round(totalNo / rowsPerPage)} page={page} onChange={handleChangePage} color="primary" />
                                        </div>
                                    </div>
                                )
                                : (
                                    <div className="flex flex-1 items-center justify-center">
                                        <Typography color="textSecondary" className="text-24 my-24">
                                            No Training found!
                                        </Typography>
                                    </div>
                                ))
                        , [categories, employees, open, id, hod, page, theme.palette, trainings.pendingPersonalTrainings, trainings.completedPersonalTrainings, trainings.reviewedPersonalTrainings, trainings.approvedPersonalTrainings, trainings.rejectedPersonalTrainings, tabValue]
                    )}
                </div>
            </div>
        </ThemeProvider >
    );
}

export default withReducer('academyApp', reducer)(PersonalTraining);