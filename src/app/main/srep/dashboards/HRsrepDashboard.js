import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { Component, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import SimplePage from 'app/shared/SimplePage';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import EnrollmentListTable from './components/EnrollmentListTable';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Actions from '../store/actions';
import * as UtilActions from '../../../store/actions';
import { useAuth } from 'app/hooks/useAuth';
import reducer from '../store/reducers';

    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Approved',
                fill: false,			
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'Pending',
                fill: false,			
                lineTension: 0.1,
                backgroundColor: '#FFAB00',
                borderColor: '#FFAB00',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#FFAB00',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#FFAB00',
                pointHoverBorderColor: '#FFAB00',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [85, 49, 20, 71, 36, 75, 70]
            },
            {
                label: 'Rejected',
                fill: false,			
                lineTension: 0.1,
                backgroundColor: '#FF5F5F',
                borderColor: '#FF5F5F',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#FF5F5F',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#FF5F5F',
                pointHoverBorderColor: '#FF5F5F',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [75, 39, 60, 51, 86, 45, 60]
            }
        ]
    };

    const userId = useAuth().getId;
    const userData = useAuth().getUserData;
	
    function HRsrepDashboard(props) {
        const dispatch = useDispatch();
        const HRsrepDashboard = useSelector(({ HRsrepDashboard }) => HRsrepDashboard.srep.data);
        const roles = useSelector(({ roles }) => roles.roleList);
        const departments = useSelector(({ departments }) => departments.deparmentList);
        const years = ["2018", "2019", "2020"];
        const entities = useSelector(({ entities }) => entities.entityList);
        const data = (HRsrepDashboard) ? ((HRsrepDashboard.data) ? HRsrepDashboard.data : []) : [];
        const enrollmentList = data;
        console.log('HRsrepDashboard Data: ', data);

        useEffect(() => {
            dispatch(UtilActions.getRoles());
            dispatch(UtilActions.getEntities());
            dispatch(UtilActions.getDepartments());
            if(userData.role.toUpperCase() === 'EMPLOYEE' || userData.role.toUpperCase() === 'LINE MANAGER'){
                dispatch(Actions.getSrepByEmployeeID(userId));
            }else{
                dispatch(Actions.getSrep(userData.role.toUpperCase()));
            }
        }, [dispatch]);
            
        return ( <SimplePage title='HR SREP DASHBOARD'>
                <section className="widget flex flex-row w-full" style={{ height: "320px" }}>
                <div className="widget flex w-full sm:w-2/3 p-12" >
                    <Paper className="w-full rounded-8 shadow-none border-1">
                        <div className="flex items-center justify-between px-16 h-64 border-b-1">
                            <Grid container spacing={1} alignItems='left'>
                            <Grid item lg={4}>
                            <Typography className="text-16 font-semibold mt-8">SREP Statistics Breakdown</Typography>
                            </Grid>
                            <Grid item lg={2}>
                            <SelectTextField
                                value={"5C", "C-BIT", "SREL"}
                                size='small'
                                label='Entity'
                            >
                                {["5C", "C-BIT", "SREL"].map(item => (
                                <MenuItem value={item}>
                                    {item}
                                </MenuItem>
                                ))}
                            </SelectTextField>
                            </Grid>
                            <Grid item lg={2}>
                            <SelectTextField
                                value={"IT", "Finance", "HR"}
                                size='small'
                                label='Department'
                            >
                                {["IT", "Finance", "HR"].map(item => (
                                <MenuItem value={item}>
                                    {item}
                                </MenuItem>
                                ))}
                            </SelectTextField>
                            </Grid>
                            </Grid>
                        </div>
                        <div className="flex h-128 w-full p-32">
                            <Line options={{ legend: { position: "right", labels: {boxWidth: 10,
        fontSize: 12, padding: 10 } } }} height={220} width={870} data={lineChartData} />
                        </div>
                    </Paper>
				</div>
				<div className="widget flex w-full sm:w-1/3 p-12">
                    <Paper className="w-full h-full rounded-8 shadow-none border-1">
                        <div className="flex flex-wrap items-center h-full w-full pb-20 pt-20 pl-8 pr-8">
                                <div className="flex flex-col text-center h-100 w-full mt-10 p-8 border-b-1" style={{ marginTop: "10px"}}>
                                    <Typography className="text-14 text-center" color="textSecondary">
                                    Number of SREP Pending Applications
                                    </Typography>
                                    <div className="items-center mt-5 mb-10 text-center" style={{ marginTop: "5px"}}>
                                        {/* <Typography className="text-32 text-center" style={{ color: "orange" }}>{0}</Typography> */}
                                        <Typography className="text-32 text-center" style={{ color: "orange" }}>{(data.length > 0) ? data.filter(t => t.status === 'pending').length : 0}</Typography>
                                    </div>
                                </div>
                                <div className="flex flex-col h-100 w-full text-center mt-10 p-8" style={{ marginTop: "10px"}}>
                                    <Typography className="text-14" color="textSecondary">
                                    Number Of  Approved Applications
                                    </Typography>
                                    <div className="items-center mt-5 text-center" style={{ marginTop: "5px"}}>
                                        <Typography className="text-32 text-center" style={{ color: "green" }}>{(data.length > 0) ? data.filter(t => t.status === 'approved').length : 0}</Typography>
                                    </div>
                                </div>
                                
                            </div>
                    </Paper>
				</div>
                </section>

				<div className="widget flex w-full p-12">
                    <EnrollmentListTable data={{ enrollmentList, entities, departments, years }} />
				</div>
            </SimplePage>
            );
        }
    
    export default withReducer('HRsrepDashboard', reducer)(HRsrepDashboard);