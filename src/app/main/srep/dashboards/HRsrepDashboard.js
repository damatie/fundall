import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import SimplePage from 'app/shared/SimplePage';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import EnhancedTable from 'app/shared/table/EnhancedTable';
import EnrollmentListTable from './components/EnrollmentListTable';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Actions from '../store/actions';
import * as UtilActions from '../../../store/actions';
import { useAuth } from 'app/hooks/useAuth';
import reducer from '../store/reducers';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';

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
        // const HRsrepDashboard = useSelector(({ HRsrepDashboard }) => HRsrepDashboard.srep.data);
        const HRsrepDashboard = useSelector(state => state);
        console.log('Before Use Effect');
        // console.log('HRsrepDashboard init Data: ', HRsrepDashboard);
        // // const roles = useSelector(({ roles }) => roles.roleList);
        // const departments = useSelector(({ departments }) => departments.deparmentList);
        // console.log('departments: ', departments);
        // const years = ["all","2018", "2019", "2020", "2021"];
        // const entities = useSelector(({ entities }) => entities.entityList) || [];
        // console.log('entities: ', entities);
        // const enrollmentList = React.useMemo(
        //     () => (HRsrepDashboard) ? ((HRsrepDashboard.data) ? HRsrepDashboard.data : []) : []);
        // console.log('HRsrepDashboard Data: ', enrollmentList);
        // const [filter, setFilter] = useState('all');
        // console.log('filter value: ', filter);
        // const [Entityfilter, setEntityFilter] = useState('all');
        // const [Yearfilter, setYearFilter] = useState('all');
        // const [Departmentfilter, setDepartmentFilter] = useState('all');
        // const search = "";
        // const [data, setData] = useState(enrollmentList);
        // console.log('Set Data 1: ', data);

        useEffect(() => {
            // dispatch(UtilActions.getRoles());
            dispatch(Actions.getDashboardSrep());
            dispatch(Actions.getEntities());
            // console.log('nnnntiti: ', entities);
            // if(userData.role.toUpperCase() === 'EMPLOYEE' || userData.role.toUpperCase() === 'LINE MANAGER'){
            //     dispatch(Actions.getSrepByEmployeeID(userId));
            // }else{
            //     dispatch(Actions.getSrep(userData.role.toUpperCase()));
            // }
            // if (Yearfilter !== '' || Yearfilter !== 'all') {
                //     setData(enrollmentList);
            //     setData(_.filter(enrollmentList, e => new Date(e.createdAt).getFullYear().toString().toLowerCase() === Yearfilter.toLowerCase()));
            // } else {
            // }
        }, []);

        const getValues = () => {
            const HRsrepDashboard2 = useSelector((state) => state);
            console.log('rrrrrrrr: ',  HRsrepDashboard2)
        };
        
        getValues();

        // useEffect(() => {
        //     if (filter !== '' || filter !== 'all') {
        //         setData([]);
        //     } else {
        //         setData([]);
        //     }
        // }, [filter]);

        // useEffect(() => {
        //     if (Entityfilter !== '' || Entityfilter !== 'all') {
        //         console.log('entities: ', entities);
        //         // const entity_arr = entities.filter(e => { return e.entityName === Entityfilter }) !== undefined ? entities.filter(e => { return e.entityName === Entityfilter }) : '';
        //         // const entity_filter_id = entity_arr !== undefined ? entity_arr[0].id : '';
        //         // console.log('entity_arr: ', entity_arr);
        //         // console.log('entity_filter_id: ', entity_filter_id);
        //         // setData(_.filter(enrollmentList, e => e.entityId === entity_filter_id));
        //     } else {
        //         setData(enrollmentList);
        //     }
        // }, [Entityfilter]);

        // useEffect(() => {
        //     if (Yearfilter !== '' || Yearfilter !== 'all') {
        //         setData(_.filter(enrollmentList, e => new Date(e.createdAt).getFullYear().toString().toLowerCase() === Yearfilter.toLowerCase()));
        //     } else {
        //         setData(enrollmentList);
        //     }
        // }, [Yearfilter]);

        // useEffect(() => {
        //     if (Departmentfilter !== '' || Departmentfilter !== 'all') {
        //         setData([]);
        //         // setData(_.filter(enrollmentList, e => e.status.toLowerCase() === Departmentfilter.toLowerCase()));
        //     } else {
        //         setData(enrollmentList);
        //     }
        // }, [Departmentfilter]);

        const columns = React.useMemo(
            () => [
                {
                    Header: 'Employee Name',
                    accessor: 'employee',
                    sortable: true,
                    Cell: ({ row: { original: { employee }} }) => {
                        return <>{`${employee.firstName} ${employee.lastName}`}</>
                    }
                },
                {
                    Header: 'Employee Email',
                    accessor: 'employee.email',
                    sortable: true
                },
                {
                    Header: 'Entity',
                    accessor: 'employee.entityId',
                    sortable: true,
                    Cell: ({ row: { original: { employee }} }) => {
                        const result = entities.filter(e => {
                            return e.id === employee.entityId });
                        const value = result.length !== 0 ? result[0].entityName : '';
                        return <>{ value }</>
                    }
                },
                {
                    Header: 'Department',
                    accessor: 'employee.departmentId',
                    sortable: true,
                    Cell: ({ row: { original: { employee }} }) => {
                        const result = departments.filter(e => {
                            return e.id === employee.departmentId });
                        console.log('departments: ', departments);
                        const value = result.length !== 0 ? result[0].departmentName : '';
                        return <>{ value }</>
                    }
                },
                {
                    Header: 'Capital Funds',
                    accessor: 'capitalFund',
                    sortable: true,
                    Cell: ({ row: { original: { capitalFund }} }) => {
                        return <>{capitalFund}</>
                    }
                },
                {
                    Header: 'Beneficiary Name',
                    accessor: 'beneficiaryName',
                    sortable: true,
                    Cell: ({ row: { original: { beneficiaryName }} }) => {
                        return <>{`${beneficiaryName}`}</>
                    }
                },
                {
                    Header: 'Beneficiary Nationality',
                    accessor: 'beneficiaryNationality',
                    sortable: true,
                    Cell: ({ row: { original: { beneficiaryNationality }} }) => {
                        return <>{beneficiaryNationality}</>
                    }
                },
                {
                    Header: 'Beneficiary Gender',
                    accessor: 'beneficiaryGender',
                    sortable: true,
                    Cell: ({ row: { original: { beneficiaryGender }} }) => {
                        return <>{beneficiaryGender}</>
                    }
                },
                {
                    Header: 'Relationship',
                    accessor: 'beneficiaryRelationship',
                    sortable: true,
                    Cell: ({ row: { original: { beneficiaryRelationship }} }) => {
                        return <>{beneficiaryRelationship}</>
                    }
                },{
                    Header: 'Beneficiary Email',
                    accessor: 'beneficiaryEmail',
                    sortable: true,
                    Cell: ({ row: { original: { beneficiaryEmail }} }) => {
                        return <>{beneficiaryEmail}</>
                    }
                },
            ],
        );
        
        function handleSearch(event) {
            setSearch(event.target.value);
        }

        const handleFilter = (event) => {
            console.log(event.target.value);
            setFilter(event.target.value);
        }

        const handleYearFilter = (event) => {
            console.log(event.target.value);
            setYearFilter(event.target.value);
        }

        const handleEntityFilter = (event) => {
            console.log(event.target.value);
            setEntityFilter(event.target.value);
        }

        const handleDepartmentFilter = (event) => {
            console.log(event.target.value);
            setDepartmentFilter(event.target.value);
        }
      
        // onClick = (row) => dispatch(openDialog());
            
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
                                value={"5C", "CBIT", "SREL"}
                                size='small'
                                label='Entity'
                            >
                                {["5C", "CBIT", "SREL"].map(item => (
                                <MenuItem value={item} key={item}>
                                {item}
                              </MenuItem>
                                ))}
                            </SelectTextField>
                            </Grid>
                            <Grid item lg={2}>
                            <SelectTextField
                                value={'filter'} 
                                onChange={ev => handleFilter(ev)}
                                size='small'
                                label='Department'
                            >
                                {["IT", "Finance", "HR"].map(item => (
                                <MenuItem value={item} key={item}>
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
                                        <Typography className="text-32 text-center" style={{ color: "orange" }}>{0}</Typography>
                                        {/* <Typography className="text-32 text-center" style={{ color: "orange" }}>{(enrollmentList.length > 0) ? enrollmentList.filter(t => t.status === 'pending').length : 0}</Typography> */}
                                    </div>
                                </div>
                                <div className="flex flex-col h-100 w-full text-center mt-10 p-8" style={{ marginTop: "10px"}}>
                                    <Typography className="text-14" color="textSecondary">
                                    Number Of  Approved Applications
                                    </Typography>
                                    <div className="items-center mt-5 text-center" style={{ marginTop: "5px"}}>
                                        {/* <Typography className="text-32 text-center" style={{ color: "green" }}>{(enrollmentList.length > 0) ? enrollmentList.filter(t => t.status === 'approved').length : 0}</Typography> */}
                                        <Typography className="text-32 text-center" style={{ color: "green" }}>{0}</Typography>
                                    </div>
                                </div>
                                
                            </div>
                    </Paper>
				</div>
                </section>

				<div className="widget flex w-full p-12">
                    {/* <EnrollmentListTable 
                        data={{ enrollmentList, entities, departments, years }} 
                    /> */}
                    <EnhancedTable
                        columns={columns}
                        // data={ (filter !== 'all') ? data : enrollmentList }
                        data={[]}
                        toolBar={
                        <Grid container spacing={1} alignItems='left'>
                            <Grid container spacing={1} alignItems='left' style={{ marginTop: "10px" }}>
                                <Grid item lg={3} md={4} sm={6} xs={6} className="font-semibold mt-10">
                                Enrollment List
                                </Grid>
                            </Grid>
                                <Formsy>
                            <Grid container spacing={1} alignItems='left' className="flex flex-row" style={{ marginTop: "10px" }}>
                                <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: "15px" }} >
                                Date: 
                                </Grid>
                                <Grid item lg={9} md={9} sm={9} xs={9}>
                                <TextFieldFormsy
                                    className="w-full"
                                    type="date"
                                    name="name"
                                    // label="Birth date"
                                    variant="outlined"
                                />
                                </Grid>
                            </Grid>
                                </Formsy>
                            <Grid container spacing={1} alignItems='left' style={{ marginTop: "10px", marginBottom: "10px" }}>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                Employees enrolled in SREP: {30} Employees
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems='left'>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                <div className="flex items-center">
                                        <Paper className="flex items-center w-full px-8 py-4 rounded-8">
                                            <Icon color="action">search</Icon>
                                            <Input
                                                placeholder="Filter SREP"
                                                className="flex flex-1 mx-8"
                                                disableUnderline
                                                fullWidth
                                                value={'search'}
                                                inputProps={{
                                                    'aria-label': 'Search'
                                                }}
                                                onChange={e => handleSearch(e)}
                                            />
                                        </Paper>
                                    </div>
                                </Grid>
                                {/* <Grid item lg={2} md={3} sm={4} xs={4}>
                                    <SelectTextField label="Department" size='small' value={Departmentfilter} onChange={ev => handleDepartmentFilter(ev)}>
                                        {departments.map(({id, departmentName}) => (<MenuItem key={id} value={id}> {departmentName}</MenuItem>))}
                                    </SelectTextField>
                                </Grid>
                                <Grid item lg={2} md={2} sm={4} xs={4}>
                                    <SelectTextField label="Entity" size='small' value={Entityfilter} onChange={ev => handleEntityFilter(ev)} >
                                        {entities.map(({id, entityName}) => (<MenuItem key={id} value={id}> {entityName} </MenuItem>))}
                                    </SelectTextField>
                                </Grid>
                                <Grid item lg={2} md={2} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Year" size='small' value={Yearfilter} onChange={ev => handleYearFilter(ev)}>
                                        {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                                    </SelectTextField>
                                </Grid>  */}
                            </Grid>
                        </Grid>
                        }
                    />
				</div>
            </SimplePage>
            );
        }
    
    export default withReducer('HRsrepDashboard', reducer)(HRsrepDashboard);