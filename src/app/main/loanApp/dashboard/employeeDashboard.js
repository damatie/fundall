import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import IconButton from '@material-ui/core/IconButton';
import CardWidget from 'app/shared/widgets/CardWidget';
import useLMTrainingDashboard from './hooks/customHook';
import Widget from './components/widget';
import widgets from "./data.json";
import CardWidgetWithChart from 'app/shared/widgets/CardWidgetWithChart';


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

function EmployeeDashboard(props) {
    const dispatch = useDispatch();
    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

    const classes = useStyles(props);
    const [search, setSearch] = useState('');

    const { doughnutChartData, employeeData } = useLMTrainingDashboard();

    // useEffect(() => {
    // }, [dispatch]);

    // function handleSearch(event) {
    //     setSearch(event.target.value);
    // }

    const goToPreviousRoute = () => {
        window.location = '/training/personal';
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
                            EMPLOYEE LOAN DASHBOARD
						</Typography>
                    </FuseAnimate>
                    <Icon className={classes.headerIcon}> school </Icon>
                </div>
                <div className={classes.header}>
                    <IconButton className={classes.previousBtn} aria-label="go back" component="span" onClick={goToPreviousRoute}>
                        <ArrowBackIcon />
                    </IconButton>
                </div>

                <div className="p-12">
                    <FuseAnimateGroup
                        className="flex-column"
                        enter={{
                            animation: 'transition.slideUpBigIn'
                        }}
                    >
                        <div className="widget flex w-full p-12 m-10 justify-between">
                            <div style={{ width: "58%" }}>
                                <Widget widget={widgets} />
                            </div>
                            <div style={{ width: "40%" }} className="flex justify-center align-center">
                                <CardWidgetWithChart
                                    data={doughnutChartData
                                    }
                                    doughnutStyle={"justify-center"}
                                    customStyle={"flex justify-center align-center"}
                                />
                            </div>
                        </div>
                    </FuseAnimateGroup>
                </div>
            </div>
        </ThemeProvider >
    );
}

export default withReducer('personalTraining', null)(EmployeeDashboard);
