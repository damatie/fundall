import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import { amber, blue, blueGrey, green } from '@material-ui/core/colors';
import Moment from 'react-moment';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useAuth } from 'app/hooks/useAuth';
import { authRoles } from 'app/auth';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';
import SharedTable from 'app/shared/sharedTable';
import AddNewTrainingDialogue from '../components/addNewTraining';
import ViewTrainings from '../components/viewingTrainings';

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
        id: 'employeeName',
        field: 'employeeName',
        align: 'center',
        disablePadding: false,
        label: 'Employee Name',
        sort: true
    },
    {
        id: 'employeeMail',
        field: 'employeeMail',
        align: 'center',
        disablePadding: false,
        label: 'Employee Mail',
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
        id: 'trainingName',
        field: 'trainingName',
        align: 'center',
        disablePadding: false,
        label: 'Training Name',
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

const data = [
    {
        employeeName: "Adegoke Oluwafemi",
        employeeMail: "joshua@cbitindustries.com",
        category: "Certification",
        trainingName: "Introduction to Software Engineering",
        startDate: new Date(),
        endDate: new Date(),
        certification: "YES",
        status: "pending"
    },
    {
        employeeName: "Joshua Oluwafemi",
        employeeMail: "joshua@cbitindustries.com",
        category: "Technical",
        trainingName: "Introduction to Software Engineering",
        startDate: new Date(),
        endDate: new Date(),
        certification: "YES",
        status: "pending"
    },
    {
        employeeName: "Adegoe Oluwafemi",
        employeeMail: "joshua@cbitindustries.com",
        category: "Technical",
        trainingName: "Introduction to Software Engineering",
        startDate: new Date(),
        endDate: new Date(),
        certification: "NO",
        status: "pending"
    },
    {
        employeeName: "Adegoe Oluwafemi",
        employeeMail: "joshua@cbitindustries.com",
        category: "Technical",
        trainingName: "Introduction to Software Engineering",
        startDate: new Date(),
        endDate: new Date(),
        certification: "NO",
        status: "pending"
    },
    {
        employeeName: "Adegoe Oluwafemi",
        employeeMail: "joshua@cbitindustries.com",
        category: "Technical",
        trainingName: "Introduction to Software Engineering",
        startDate: new Date(),
        endDate: new Date(),
        certification: "YES",
        status: "pending"
    },
    {
        employeeName: "Adegoe Oluwafemi",
        employeeMail: "joshua@cbitindustries.com",
        category: "Technical",
        trainingName: "Introduction to Software Engineering",
        startDate: `${new Date().toLocaleDateString()}`,
        endDate: `${new Date().toLocaleDateString()}`,
        certification: "YES",
        status: "pending"
    }
]

function TrainingList(props) {
    const dispatch = useDispatch();
    const courses = useSelector(({ academyApp }) => academyApp.courses.courses);
    // const categories = useSelector(({ academyApp }) => academyApp.courses.categories);
    const categories = [{ name: "Technical", id: Math.random() }, {
        name: "Certification", id: Math.random()
    }]
    const employees = useSelector(({ academyApp }) => academyApp.employees.employees);
    const totalNo = useSelector(({ academyApp }) => academyApp.courses.totalNo);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

    const classes = useStyles(props);
    const theme = useTheme();
    const [_, setData] = useState(courses);
    const [open, setOpen] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [start, setStart] = useState(moment(new Date(), 'MM/DD/YYYY').add(1, 'days'));
    const [end, setEnd] = useState(moment(new Date(), 'MM/DD/YYYY').add(1, 'days'));
    const [duration, setDuration] = useState('');
    const [id, setId] = useState('');
    const [hod, setHod] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const userData = useAuth().getUserData;
    const profile = useSelector(({ profile }) => profile.data);
    const userId = useAuth().getId;
    const employeeHOD = useAuth().getUserDetails.department.departmentHeadId;
    const [filterEmployees, setFilterEmployees] = useState(
        employees
    );
    const [selectedData, setSelectedData] = useState({});


    // employees.filter(f => {
    // 	return (f.firstName !== null || f.lastName !== null || f?.role.name.toLowerCase() !== 'employee' || f?.roleId !== 8);
    // }).sort((a, b) => {
    // 	if (a.firstName + " " + a.lastName < b.firstName + " " + b.lastName) { return -1; }
    // 	if (a.firstName + " " + a.lastName > b.firstName + " " + b.lastName) { return 1; }
    // 	return 0;
    // })

    useEffect(() => {
        dispatch(Actions.getApprovedCourses());
        dispatch(Actions.getCourseCategories());
        dispatch(Actions.getEmployees());
    }, [dispatch]);
    console.log(profile);

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
        setFilter(event.target.value);
    }

    const handleChangePage = (event, value) => {
        console.log(value);
        let newPage = value - 1;
        dispatch(Actions.getApprovedCourses(rowsPerPage, newPage * rowsPerPage));
        setPage(value);
        window.scrollTo(0, 0);
        // alert('hello')
    };

    //Check if the logged in user has management role
    function checkRole() {
        return (authRoles.managers.includes(userData.role));
    }

    const goToPreviousRoute = () => {
        window.location = '/training/personal';
    }

    function handleClose() {
        setOpen(false);
    }

    function handleCloseNew() {
        setAddNew(false);
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
                            TRAINING LIST
						</Typography>
                    </FuseAnimate>
                    <Icon className={classes.headerIcon}> school </Icon>
                </div>
                <div className={classes.header + " flex justify-between w-full"}>
                    <IconButton className={classes.previousBtn} aria-label="go back" component="span" onClick={goToPreviousRoute}>
                        <ArrowBackIcon />
                    </IconButton>
                    {
                        profile && profile?.role?.name.toLowerCase() === "line manager" ?
                            <Button variant="contained" color="secondary" type="submit" className="m-12" onClick={() => setAddNew(true)}>
                                Add New Training
                            </Button>
                            :
                            <></>
                    }
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

                        {
                            profile && profile?.role?.name.toLowerCase() === "hr" &&
                            <>
                                <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                                    <InputLabel htmlFor="category-label-placeholder"> Department </InputLabel>
                                    <Select
                                        value={filter}
                                        onChange={handleFilter}
                                        input={
                                            <OutlinedInput labelWidth={'department'.length * 9} name="department" id="department-label-placeholder" />
                                        }
                                    >
                                        <MenuItem value="all">
                                            <em> All </em>
                                        </MenuItem>
                                        {["Software", "IT"].map(category => (
                                            <MenuItem value={category} key={Math.random()}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                                    <InputLabel htmlFor="category-label-placeholder"> Entity </InputLabel>
                                    <Select
                                        value={filter}
                                        onChange={handleFilter}
                                        input={
                                            <OutlinedInput labelWidth={'entity'.length * 9} name="entity" id="entity-label-placeholder" />
                                        }
                                    >
                                        <MenuItem value="all">
                                            <em> All </em>
                                        </MenuItem>
                                        {["SpringRock", "5cee", "CBit"].map(category => (
                                            <MenuItem value={category} key={Math.random()}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </>
                        }

                        <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                            <InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
                            <Select
                                value={filter}
                                onChange={handleFilter}
                                input={
                                    <OutlinedInput labelWidth={'category'.length * 9} name="category" id="category-label-placeholder" />
                                }
                            >
                                <MenuItem value="all">
                                    <em> All </em>
                                </MenuItem>
                                {categories.map(category => (
                                    <MenuItem value={category.name} key={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    {/* creating a new training request */}
                    <AddNewTrainingDialogue open={addNew} handleClose={handleCloseNew} viewer={profile?.role?.name} />

                    {/* opening up a training request */}
                    <ViewTrainings open={open} handleClose={handleClose} data={selectedData} viewer={profile?.role?.name} />

                    {/* End Dialog  */}
                    {useMemo(
                        () =>
                            data &&
                            (data.length > 0 ? (
                                <div>
                                    <FuseAnimateGroup
                                        enter={{
                                            animation: 'transition.slideUpBigIn'
                                        }}
                                        className="flex flex-wrap py-24"
                                    >
                                        <SharedTable data={data} rows={rows} type='default' handleClick={handleOpen} />
                                        {/* {data.map(course => {
                                            return (
                                                <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={course.id}>
                                                    <Card elevation={1} className="flex flex-col h-256">
                                                        <div
                                                            className="flex flex-shrink-0 items-center justify-between px-24 h-64"
                                                            style={{
                                                                background: blue[500],
                                                                color: theme.palette.getContrastText(blue[500])
                                                            }}
                                                        >
                                                            <Typography className="font-medium truncate" color="inherit">
                                                                {course.category}
                                                            </Typography>
                                                            <div className="flex items-center justify-center opacity-75">
                                                                <Icon className="text-20 mx-8" color="inherit">
                                                                    access_time
															</Icon>
                                                                <div className="text-16 whitespace-no-wrap">{course.duration}</div>
                                                            </div>
                                                        </div>
                                                        <CardContent className="flex flex-col flex-auto items-center justify-center">
                                                            <Typography className="text-center text-20 font-400">{course.name}</Typography>
                                                            <Typography className="text-center text-16 font-600" color="textSecondary">
                                                                {course.certification ? 'Certificate Available' : 'Certificate Not Available'}
                                                            </Typography>
                                                            <Typography className="text-center text-13 font-600 mt-4" color="textSecondary">
                                                                <Moment format="MMM DD, YYYY">{course.createdAt}</Moment>
                                                            </Typography>
                                                        </CardContent>
                                                        <Divider />

                                                        <CardActions className="justify-center">
                                                            <Button
                                                                type="button"
                                                                className="justify-start px-32"
                                                                color="secondary"
                                                                onClick={ev => {
                                                                    handleOpen();
                                                                    setId(course.id);
                                                                    setDuration(course.duration);
                                                                    setStart(moment(new Date(), 'MM/DD/YYYY').add(1, 'days'));
                                                                }}
                                                            >
                                                                START
                                                            </Button>
                                                        </CardActions>
                                                        <LinearProgress className="w-full" variant="determinate" value={100} color="secondary" />
                                                    </Card>
                                                </div>
                                            );
                                        })} */}
                                    </FuseAnimateGroup>
                                    <div className={classes.pagination}>
                                        <Pagination count={Math.round(totalNo / rowsPerPage)} page={page} onChange={handleChangePage} color="primary" />
                                    </div>
                                </div>
                            ) : (
                                    <div className="flex flex-1 items-center justify-center">
                                        <Typography color="textSecondary" className="text-24 my-24">
                                            No Training found!
									</Typography>
                                    </div>
                                )),
                        [categories, data, employees, filterEmployees, open, id, start, end, hod, page, theme.palette]
                    )}
                </div>
            </div>
        </ThemeProvider>
    );
}

export default withReducer('academyApp', reducer)(TrainingList);
