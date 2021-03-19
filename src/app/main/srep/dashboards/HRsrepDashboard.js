import React, { useEffect, useState } from 'react';
import withReducer from 'app/store/withReducer';
import SimplePage from 'app/shared/SimplePage';
import { makeStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import Paper from '@material-ui/core/Paper';
import * as Actions from '../store/actions';
import * as UtilActions from '../../../store/actions';
import reducer from '../store/reducers';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { AppBar, Toolbar } from '@material-ui/core';
import * as jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import EnrollmentListTable from './components/EnrollmentListTable';

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

    const columns = [
        {
            id: 'name',
            field: 'name',
            align: 'left',
            disablePadding: false,
            label: 'Name',
            sort: true
        },
        {
            id: 'employeeEmail',
            field: 'employeeEmail',
            align: 'left',
            disablePadding: false,
            label: 'Email',
            sort: true
        },
        {
            id: 'entity',
            field: 'entity',
            align: 'left',
            disablePadding: false,
            label: 'Entity',
            sort: true,
            Cell: ({ entity }) => {
                const result = entities.filter(e => {
                    return e.id === entity });
                const value = result.length !== 0 ? result[0].entityName : '';
                return <>{value}</>
            }
        },
        {
            id: 'department',
            field: 'department',
            align: 'left',
            disablePadding: false,
            label: 'Dept.',
            sort: true,
            Cell: ({ entity, department }) => {
                const result2 = entities.filter(e => {
                    return e.id === entity });
                const value2 = result2.length !== 0 ? result2[0].department : [];
                const depts = value2.filter(e => {
                    return e.id === department });
                const dept = depts.length !== 0 ? depts[0].departmentName : '';
                return <>{dept}</>
            }
        },
        {
            align: 'left',
            disablePadding: false,
            label: 'Capital',
            field: 'capitalFund',
            sort: true,
        },
        {
            align: 'left',
            disablePadding: false,
            label: 'Beneficiary',
            field: 'beneficiaryName',
            sort: true,
        },
        {
            align: 'left',
            disablePadding: false,
            label: 'Beneficiary Nationality',
            field: 'beneficiaryNationality',
            sort: true,
        },
        {
            align: 'left',
            disablePadding: false,
            label: 'Beneficiary Gender',
            field: 'beneficiaryGender',
            sort: true,
        },
        {
            align: 'left',
            disablePadding: false,
            label: 'Relationship',
            field: 'beneficiaryRelationship',
            sort: true,
        },
        {
            align: 'left',
            disablePadding: false,
            label: 'Beneficiary Email',
            field: 'beneficiaryEmail',
            sort: true,
        },
    ];


	
    function HRsrepDashboard(props) {
        const dispatch = useDispatch();
        const HRsrepDashboard = useSelector(({ HRsrepDashboard }) => HRsrepDashboard.HRsrepDashboard);
        let enrollmentList = [] 
        enrollmentList = (HRsrepDashboard !== undefined) ? ((HRsrepDashboard.data !== undefined) ? HRsrepDashboard.data.srepData : []) : [];
        let countEmployees = 0;
        countEmployees = (HRsrepDashboard !== undefined) ? ((HRsrepDashboard.data !== undefined) ? HRsrepDashboard.data.countEmployees : []) : [];
        const rejectedList = (HRsrepDashboard !== undefined) ? ((HRsrepDashboard.data !== undefined) ? HRsrepDashboard.data.rejectedList : []) : [];
        const approvedList = (HRsrepDashboard !== undefined) ? ((HRsrepDashboard.data !== undefined) ? HRsrepDashboard.data.approvedList : []) : [];
        const pendingList = (HRsrepDashboard !== undefined) ? ((HRsrepDashboard.data !== undefined) ? HRsrepDashboard.data.pendingList : []) : [];
        const [data, setData] = useState(enrollmentList);
        const [open, setOpen] = useState(false);
        const [search, setSearch] = useState('');
        const thisYear = (new Date).getFullYear();
        console.log('thisYear: ', thisYear);
        const years = ['all', `${thisYear}`,`${thisYear - 1}`, `${thisYear - 2}`, `${thisYear - 3}`, `${thisYear - 4}`];
        const entities = [{entityName: 'all'}, ...((useSelector(({ entities }) => entities.entityList)) ? useSelector(({ entities }) => entities.entityList) : [])];
        const departments =  [{departmentName: 'all'}, ...((useSelector(({ departments }) => departments.deparmentList)) ? useSelector(({ departments }) => departments.deparmentList) : [])];
        const [filter, setFilter] = useState('all');
        const [Entityfilter, setEntityFilter] = useState('all');
        const [Yearfilter, setYearFilter] = useState('all');
        const [Departmentfilter, setDepartmentFilter] = useState('all');
        const [selectedRow, setSelectedRow] = useState({});

        useEffect(() => {
            dispatch(Actions.getDashboardSrep());
            dispatch(UtilActions.getEntities());
        }, [dispatch]);

        useEffect(() => {
            console.log('Listening to Filter Changes: ', filter);
            // setChartData();
        }, [filter]);

        useEffect(() => {
            if ((Departmentfilter && Yearfilter && Entityfilter) === 'all') {
              setData(enrollmentList);
            } else {
              // setData(_.filter(enrollmentList, e => e.status.toLowerCase() === Departmentfilter.toLowerCase()));
            }
        }, [Departmentfilter, Yearfilter, Entityfilter]);
        
        const handleSearch = (event) => {
          setSearch(event.target.value);
          setDepartmentfilter('all'); 
          setYearfilter('all');
          setEntityfilter('all');
        }

        const handleFilter = (event) => {
            setFilter(event.target.value);
        }

        const handleYearFilter = (event) => {
            setYearFilter(event.target.value);
        }

        const handleEntityFilter = (event) => {
            setEntityFilter(event.target.value);
        }

        const handleDepartmentFilter = (event) => {
            setDepartmentFilter(event.target.value);
        }
        
        const handleClose = () => {
            setOpen(false);
        };

        
        const handleClickOpen = (n) => {
            setSelectedRow(n);
            console.log('row Clicked: ', selectedRow);
            setOpen(true);
        };

        const downloadPdf = () => {
            console.log('icon Clicked');
            const divId = 'hrpdf';
            const w = document.getElementById(divId).offsetWidth;
            const h = document.getElementById(divId).offsetHeight;
            const input = document.getElementById(divId);
            let doc = new jsPDF({ orientation: 'l', unit: 'pt', format: [w, h] });
            console.log('pdf should download: ', input);
            doc.fromHTML( input, 
                { callback: (doc) => { 
                    doc.save('enrollmentList.pdf');
                }
            });
            // doc.addHTML(input, () => {
            //     doc.save('enrollmentList.pdf');
            // })
        };

        return ( <SimplePage title='HR SREP DASHBOARD'>
                <section className="widget flex flex-row w-full" style={{ height: "320px" }}>
                <div className="widget flex w-full sm:w-2/3 p-12" >
                    <Paper className="w-full rounded-8 shadow-none border-1">
                        <div className="flex items-center justify-between px-16 h-64 border-b-1">
                            <Grid container spacing={1}>
                            <Grid item lg={4}>
                            <Typography className="text-16 font-semibold mt-8">SREP Statistics Breakdown</Typography>
                            </Grid>
                            <Grid item lg={2}>
                            <SelectTextField
                                value={'all'}
                                size='small'
                                label='Entity'
                                value={filter}
                                onChange={ev => handleFilter(ev)}
                            >
                                {entities.map(({id, entityName}) => (
                                <MenuItem value={entityName} key={id}>
                                {entityName}
                              </MenuItem>
                                ))}
                            </SelectTextField>
                            </Grid>
                            <Grid item lg={2}>
                            <SelectTextField
                                value={'all'}
                                value={filter} 
                                onChange={ev => handleFilter(ev)}
                                size='small'
                                label='Department'
                            >
                                {departments.map(({id, departmentName}) => (
                                <MenuItem value={departmentName} key={id}>
                                    {departmentName}
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
                                        <Typography className="text-32 text-center" style={{ color: "orange" }}>{(enrollmentList && (enrollmentList.length > 0)) ? pendingList.length : 0}</Typography>
                                    </div>
                                </div>
                                <div className="flex flex-col h-100 w-full text-center mt-10 p-8" style={{ marginTop: "10px"}}>
                                    <Typography className="text-14" color="textSecondary">
                                    Number Of  Approved Applications
                                    </Typography>
                                    <div className="items-center mt-5 text-center" style={{ marginTop: "5px"}}>
                                        <Typography className="text-32 text-center" style={{ color: "green" }}>{(enrollmentList && (enrollmentList.length > 0)) ? approvedList.length : 0}</Typography>
                                    </div>
                                </div>
                                
                            </div>
                    </Paper>
				</div>
                </section>

                <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'} aria-labelledby="form-dialog-title">
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                Enrollment Details
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <table className={'w-full text-justify'}>
                            <tbody>
                                <tr className="name">
                                    <th>Name</th>
                                    <td>{selectedRow?.name}</td>
                                </tr>

                                <tr className="status">
                                    <th>Status</th>
                                    <td>{selectedRow?.status}</td>
                                </tr>

                                <tr className="entity">
                                    <th>Entity</th>
                                    <td>{selectedRow?.entity}</td>
                                </tr>

                                <tr className="department">
                                    <th>Department</th>
                                    <td>{selectedRow?.department}</td>
                                </tr>

                                <tr className="capitalFund">
                                    <th>Capital Fund</th>
                                    <td>{selectedRow?.capitalFund}</td>
                                </tr>

                                <tr className="beneficiaryName">
                                    <th>Beneficiary Name</th>
                                    <td>{selectedRow?.beneficiaryName}</td>
                                </tr>

                                <tr className="beneficiaryRelationship">
                                    <th>Beneficiary Relationship</th>
                                    <td>{selectedRow?.beneficiaryRelationship}</td>
                                </tr>

                                <tr className="beneficiaryNationality">
                                    <th>Beneficiary Nationality</th>
                                    <td>{selectedRow?.beneficiaryNationality}</td>
                                </tr>

                                <tr className="beneficiaryNationality">
                                    <th>Beneficiary Nationality</th>
                                    <td>{selectedRow?.beneficiaryNationality}</td>
                                </tr>

                                <tr className="beneficiaryGender">
                                    <th>Beneficiary Gender</th>
                                    <td>{selectedRow?.beneficiaryGender}</td>
                                </tr>

                                <tr className="beneficiaryEmail">
                                    <th>Beneficiary Email</th>
                                    <td>{selectedRow?.beneficiaryEmail}</td>
                                </tr>

                            </tbody>
                        </table>
                        </DialogContent>
                        <DialogActions className="flex justify-between m-20">
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                </Dialog>

            <Paper className="mt-24 m-12">
            <div>
                <div className="flex flex-wrap w-full p-20">
                        <Grid container spacing={1} >
                            <Grid className="flex w-full flex-row" style={{ marginTop: "10px" }}>
                                <Grid item lg={9} md={6} sm={6} xs={6} className="font-semibold text-16">
                                Enrollment List
                                </Grid>

                                <Grid item lg={3} md={6} sm={6} xs={6} style={{ display: "flex", float: "right", color: "green" }}>
                                    <Grid style={{ marginLeft: "auto", cursor: "pointer" }} onClick = {downloadPdf}>
                                        <Icon>{'cloud_download'}</Icon>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} className="flex flex-row mb-20">
                                <Grid item lg={3} md={6} sm={6} xs={12}>
                                <Formsy>
                                    <Grid container spacing={1} className="flex flex-row">
                                        <Grid item style={{ marginTop: "20px" }} >
                                        Date: 
                                        <Typography style={{ color: "blue" }}>
                                            {new Date().toISOString().substring(0, 10)}
                                        </Typography>
                                        </Grid>
                                    </Grid>
                                </Formsy>
                                </Grid>
                                <Grid item lg={9} md={6} sm={12} xs={12} className="text-right flex-row" style={{ marginTop: "20px" }}>
                                    <Typography style={{ textAlign: "right" }}>
                                        Employees enrolled in SREP 
                                    </Typography>
                                    <Grid style={{ color: "blue" }}>
                                    {countEmployees ?? 0} Employee(s)
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} className="mt-6 mb-6" >
                                <Grid item lg={5} md={5} sm={5} xs={5}>
                                <div className="flex items-center">
                                        <Paper className="flex items-center w-full px-8 py-4 rounded-8">
                                            <Icon color="action">search</Icon>
                                            <Input
                                                placeholder="Filter SREP"
                                                className="flex flex-1 mx-8"
                                                disableUnderline
                                                fullWidth
                                                value={search}
                                                inputProps={{
                                                    'aria-label': 'Search'
                                                }}
                                                onChange={e => handleSearch(e)}
                                            />
                                        </Paper>
                                    </div>
                                </Grid>
                                <Grid item lg={2} md={2} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Year" size='small' value={Yearfilter} onChange={ev => handleYearFilter(ev)}>
                                        {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                                    </SelectTextField>
                                </Grid>
                                <Grid item lg={3} md={3} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Entity" size='small' value={Entityfilter} onChange={ev => handleEntityFilter(ev)} >
                                        {entities.map(({id, entityName}) => (<MenuItem key={id} value={entityName}> {entityName} </MenuItem>))}
                                    </SelectTextField>
                                </Grid>
                                <Grid item lg={2} md={3} sm={4} xs={4}>
                                    <SelectTextField value={'all'} label="Department" size='small' value={Departmentfilter} onChange={ev => handleDepartmentFilter(ev)}>
                                        {departments.map(({id, departmentName}) => (<MenuItem key={id} value={departmentName}> {departmentName}</MenuItem>))}
                                    </SelectTextField>
                                </Grid> 
                            </Grid>
                        </Grid>
                    </div>
                    <div id="hrpdf">
                        <EnrollmentListTable key={"HRsrepDashboard"} data={enrollmentList !== undefined ? enrollmentList : []} rows={columns} handleClick={handleClickOpen} type="default"/>
                    </div>
            </div>
            </Paper>
            </SimplePage>
            );
        }
    
    export default withReducer('HRsrepDashboard', reducer)(HRsrepDashboard);