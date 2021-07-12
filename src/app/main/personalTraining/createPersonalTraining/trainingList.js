import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
// import Button from '@material-ui/core/Button';
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
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import { useAuth } from 'app/hooks/useAuth';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
import Pagination from '@material-ui/lab/Pagination';
import ViewTrainings from '../components/viewingTrainings';
import SharedTable from 'app/shared/sharedTable';
import * as hodActions from 'app/main/line_manager/training/deptTraining/store/actions';

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
        id: 'email',
        field: 'email',
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
    // {
    //     id: 'certification',
    //     field: 'certification',
    //     align: 'center',
    //     disablePadding: false,
    //     label: 'Certification',
    //     sort: true
    // },
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

    const trainings = useSelector(({ academyApp }) => academyApp.trainings);
    const entities = useSelector(({ academyApp }) => academyApp.trainings.entities);
    const department = useSelector(({ academyApp }) => academyApp.trainings.department);
    const categories = useSelector(({ academyApp }) => academyApp.courses.categories.rows);

    const employees = useSelector(({ academyApp }) => academyApp.employees.employees);
    const totalNo = useSelector(({ academyApp }) => academyApp.courses.totalNo);
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

    const [tabValue, setTabValue] = React.useState(0);

    function handleChangeTab(event, value) {
        console.log(event, value)
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
    const [start, setStart] = useState(moment(new Date(), 'MM/DD/YYYY').add(1, 'days'));
    const [end, setEnd] = useState(moment(new Date(), 'MM/DD/YYYY').add(1, 'days'));
    // const [duration, setDuration] = useState('');
    const [id, setId] = useState('');
    const [hod, setHod] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const userData = useAuth().getUserData;
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
        dispatch(Actions.getPendingTrainingHR());
        dispatch(Actions.getReviewedTrainingHR());
        dispatch(Actions.getApprovedTrainingHR());
        dispatch(Actions.getCompletedTrainingHR());
        dispatch(Actions.getRejectedTrainingHR());

        dispatch(Actions.getCourseCategories());
        dispatch(Actions.getCategories());
        dispatch(Actions.getEntities());
        // dispatch(Actions.getDepartments(1));

        dispatch(Actions.getRoles());

    }, [dispatch])

    useEffect(() => {
        // console.log(trainings);
    }, [department, trainings])

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
            // console.log(id.id)
            changeDepartment(id.id);
        }
        console.log(event)
        setFilter({ ...filter, [event.target.name]: event.target.value });
    }

    const handleChangePage = (event, value) => {
        let newPage = value - 1;
        dispatch(Actions.getAllCourses(rowsPerPage, newPage * rowsPerPage));
        setPage(value);
        window.scrollTo(0, 0);
        // alert('hello')
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
                            TRAINING LIST
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
                        {
                            userData.role === "Hr Manager" ?

                                <>
                                    <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                                        <InputLabel htmlFor="category-label-placeholder"> Entity </InputLabel>
                                        <Select
                                            value={filter.entity}
                                            onChange={handleFilter}
                                            input={
                                                <OutlinedInput labelWidth={'entity'.length * 9} name="entity" id="entity-label-placeholder" />
                                            }
                                        >
                                            <MenuItem value="all">
                                                <em> All </em>
                                            </MenuItem>
                                            {entities.map(entity => (
                                                <MenuItem value={entity.id} key={Math.random()}>
                                                    {entity.entityName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                                        <InputLabel htmlFor="category-label-placeholder"> Department </InputLabel>
                                        <Select
                                            value={filter.department}
                                            onChange={handleFilter}
                                            input={
                                                <OutlinedInput labelWidth={'department'.length * 9} name="department" id="department-label-placeholder" />
                                            }
                                        >
                                            <MenuItem value="all">
                                                <em> All </em>
                                            </MenuItem>
                                            {department.map(dept => (
                                                <MenuItem value={dept.id} key={Math.random()}>
                                                    {dept.departmentName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </>
                                :
                                <></>
                        }
                        {/* 
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
                        </FormControl> */}

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
                            // ((
                            //     trainings.pendingTrainings.length > 0 ||
                            //     trainings.approvedTrainings.length > 0 ||
                            //     trainings.completedTrainings.length > 0 ||
                            //     trainings.rejectedTrainings.length > 0
                            // )
                            //     ? (
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
                                        {tabValue === 0 && (<SharedTable data={trainings?.pendingTrainings?.rows ?? []} rows={rows} type='default' handleClick={handleOpen} />)}
                                        {tabValue === 1 && (<SharedTable data={trainings?.reviewedTrainings?.rows ?? []} rows={rows} type='default' handleClick={handleOpen} />)}
                                        {tabValue === 2 && (<SharedTable data={trainings?.approvedTrainings?.rows ?? []} rows={rows} type='default' handleClick={handleOpen} />)}
                                        {tabValue === 3 && (<SharedTable data={trainings?.completedTrainings?.rows ?? []} rows={rows} type='default' handleClick={handleOpen} />)}
                                        {tabValue === 4 && (<SharedTable data={trainings?.rejectedTrainings?.rows ?? []} rows={rows} type='default' handleClick={handleOpen} />)}
                                    </div>


                                </FuseAnimateGroup>
                                <div className={classes.pagination}>
                                    <Pagination count={Math.round(totalNo / rowsPerPage)} page={page} onChange={handleChangePage} color="primary" />
                                </div>
                            </div>
                        // )
                        //     : (
                        //         <div className="flex flex-1 items-center justify-center">
                        //             <Typography color="textSecondary" className="text-24 my-24">
                        //                 No Training found!
                        // </Typography>
                        //         </div>
                        //     ))
                        , [categories, data, employees, open, id, start, end, hod, page, theme.palette, trainings, tabValue]
                    )}
                </div>
            </div>
        </ThemeProvider >
    );
}

export default withReducer('academyApp', reducer)(TrainingList);