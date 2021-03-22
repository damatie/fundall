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
import EnrollmentListTable from './components/EnrollmentListTable';
import { filterByMonths } from './components/chartDataFilter';
import { updatedEnrollmentList } from './components/setEntityDeptName';

    const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December" ];

    const lineChartData = {
        labels: monthNames,
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
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
            newId: 'entityId',
            align: 'left',
            disablePadding: false,
            label: 'Entity',
            sort: true,
        },
        {
            id: 'department',
            field: 'department',
            newId: 'departmentId',
            align: 'left',
            disablePadding: false,
            label: 'Dept.',
            sort: true,
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
        const entities = [{id: 'all', entityName: 'all'}, ...((useSelector(({ entities }) => entities.entityList)) ? useSelector(({ entities }) => entities.entityList) : [])];
        let enrollmentList = HRsrepDashboard.data.length !== 0 ? HRsrepDashboard.data.srepData : [];
        enrollmentList = updatedEnrollmentList(enrollmentList, entities);
        const countEmployees = HRsrepDashboard.data.length !== 0 ? HRsrepDashboard.data.countEmployees : 0;
        const rejectedList = HRsrepDashboard.data.length !== 0 ? HRsrepDashboard.data.rejectedList : [];
        const approvedList = HRsrepDashboard.data.length !== 0 ? HRsrepDashboard.data.approvedList : [];
        const pendingList = HRsrepDashboard.data.length !== 0 ? HRsrepDashboard.data.pendingList : [];
        const [data, setData] = useState(enrollmentList ?? []);
        const [open, setOpen] = useState(false);
        const [search, setSearch] = useState('');
        const thisYear = (new Date).getFullYear();
        const thisYearString = (new Date).getFullYear().toString();
        const years = ['all', `${thisYear}`,`${thisYear - 1}`, `${thisYear - 2}`, `${thisYear - 3}`, `${thisYear - 4}`];
        const departmentList =  [{id: 'all', departmentName: 'all'}, ...((useSelector(({ departments }) => departments.deparmentList)) ? useSelector(({ departments }) => departments.deparmentList) : [])];
        const departmentList2 =  [{id: 'all', departmentName: 'all'}, ...((useSelector(({ departments }) => departments.deparmentList)) ? useSelector(({ departments }) => departments.deparmentList) : [])];
        const [filter, setFilter] = useState('all');
        const [filterNew, setFilterNew] = useState('all');
        const [chartYearfilter, setChartYearfilter] = useState(thisYearString);
        const [Entityfilter, setEntityFilter] = useState('all');
        const [Yearfilter, setYearFilter] = useState('all');
        const [Departmentfilter, setDepartmentFilter] = useState('all');
        const [selectedRow, setSelectedRow] = useState({});
        const [departments, setDepartments] = useState(departmentList);
        const [departmentsNew, setDepartmentsNew] = useState(departmentList2);
        lineChartData.labels = monthNames;
        lineChartData.datasets[0].data = filterByMonths(approvedList, chartYearfilter); // Approved
        lineChartData.datasets[2].data = filterByMonths(rejectedList, chartYearfilter); // Rejected
        lineChartData.datasets[1].data = filterByMonths(pendingList, chartYearfilter); // Pending
        let globalData = [];

        useEffect(() => {
            dispatch(Actions.getDashboardSrep());
            dispatch(UtilActions.getEntities());
        }, []);

        useEffect(() => {
            setData(globalData);
            console.log('Our Data status is: ', data);
        }, [Yearfilter, Entityfilter, Departmentfilter])

        const handleFilter = (event) => {
            setFilter(event.target.value);
            const value = entities.filter(e => {
                return e.entityName.toUpperCase() === event.target.value.toUpperCase();
            })
            const depts = value[0].department ?? [];
            let newDepts = [{departmentName: 'all'}];
            newDepts.push(...depts);
            setDepartmentsNew(newDepts);
            if (event.target.value === "all") {
                setFilterNew("all");
            };
        }

        const handleFilterNew = (event) => {
            setFilterNew(event.target.value);
        }

        const handleSearch = (event) => {
            setSearch(event.target.value);
            filterData();
        }

        const handleChartYearFilter = (event) => {
            setChartYearfilter(event.target.value);
        }

        const handleYearFilter = (event) => {
            setYearFilter(event.target.value);
            filterData();
        }

        const handleEntityFilter = (event) => {
            setEntityFilter(event.target.value);
            const value = entities.filter(e => {
                return e.entityName.toUpperCase() === event.target.value.toUpperCase();
            })
            const depts = value[0].department ?? [];
            let newDepts = [{departmentName: 'all'}];
            newDepts.push(...depts);
            setDepartments(newDepts);
            if (event.target.value === "all") {
                setDepartmentFilter("all");
            };
            filterData();
        }

        const handleDepartmentFilter = (event) => {
            setDepartmentFilter(event.target.value);
            filterData();
        }

        const filterData = () => {
            let searchArr = [];
            let yearArr = [];
            let entityArr = [];
            let departmentArr = [];
            let dataNew = [];
            if (search !== '' || Yearfilter !== 'all' || Entityfilter !== 'all' || Departmentfilter !== 'all') {
                if (search !== '') {
                    searchArr = searchfilterMethod(enrollmentList);
                    dataNew = searchArr;
                }
                if (Yearfilter !== 'all') {
                    yearArr = searchArr.length > 0 ? yearfilterMethod(searchArr) : yearfilterMethod(enrollmentList);
                    dataNew = yearArr;
                }
                if (Entityfilter !== 'all') {
                    if (Yearfilter === 'all') {
                        entityArr = searchArr.length > 0 ? entityfilterMethod(searchArr) : entityfilterMethod(enrollmentList);
                    } else {
                        entityArr = yearArr.length > 0 ? entityfilterMethod(yearArr) : entityfilterMethod(enrollmentList);
                    }
                    dataNew = entityArr;
                    
                    if (Departmentfilter !== 'all') {
                        if (entityArr.length > 0) {
                            departmentArr = departmentfilterMethod(entityArr);
                            dataNew = departmentArr;
                        }
                    }
                }
                globalData = dataNew;
            } else {
                globalData = enrollmentList;
            }
        }

        const searchfilterMethod = (arr) => {
            const results = arr.filter(obj => obj.employeeEmail === search);
            // Object.keys(obj)
            // .some(key => obj[key].indexOf(search) !== -1)
            // console.log('Search Result: ', results)
            return results;
        }

        const yearfilterMethod = (arr) => {
            const newYearArr = arr.filter(e => {
                return e.year.toUpperCase() === Yearfilter.toUpperCase();
            })
            return newYearArr;
        }

        const entityfilterMethod = (arr) => {
            const newEntityArr = arr.filter(e => {
                return e.entity.toUpperCase() === Entityfilter.toUpperCase();
            })
            return newEntityArr;
        }

        const departmentfilterMethod = (arr) => {
            const newDepartmentArr = arr.filter(e => {
                return e.department.toUpperCase() === Departmentfilter.toUpperCase();
            })
            return newDepartmentArr;
        }

        const ClickOpen = (n) => {
            setSelectedRow(n);
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const downloadPdf = () => {
            const divId = 'hrpdf';
            // const w = document.getElementById(divId).offsetWidth;
            // const h = document.getElementById(divId).offsetHeight;
            const input = document.getElementById(divId);
            console.log('pdf should download: ', input);
            const page = `<HTML>
                    <Head>
                    <title>EnrollmentList-${new Date().toISOString().substring(0, 16)}</title>
                        <Style type='text/css' media='print'> 
                            .container {  
                                display: grid;  
                                grid-template-columns: 1fr 1fr 1fr;  
                                grid-template-rows: 20px 20px;  
                            }
                            .container2 {  
                                display: grid;  
                                grid-template-columns: 1fr 1fr 1fr 1fr;  
                                grid-template-rows: 20px 20px;  
                            }
                            th {
                                white-space: nowrap !important;
                            }
                            #printSize {width : 670px} 
                            #printLink {display : none}
                            table th,
                            table td {
                                padding: 12px 15px;
                            }
                            table {
                                border-collapse: collapse;
                                margin: 25px 0;
                                font-size: 0.9em;
                                font-family: sans-serif;
                                min-width: 400px;
                                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                            }
                            table thead tr {
                                background-color: #666666;
                                color: #ffffff;
                                text-align: left;
                            }
                            table tr {
                                text-align: left;
                                border-collapse: collapse;
                            }
                            svg {
                                display: none !important;
                            }
                            .MuiTablePagination-root-321 {
                                display: none !important;
                            }
                        </Style>
                    </Head>
                    <Body>
                        <div style="text-align: center;" class="container">
                            <span>  </span>
                        </div>
                        <div class="container">
                            <div>ENROLLMENT LIST</div>
                            <div style="z-index: 10; position: absolute; right: 0;">
                                Total: ${enrollmentList.length} Application(s) 
                            </div>
                        </div>
                        <div class="container">
                            <div>Date: ${new Date().toISOString().substring(0, 10)}</div>
                            <div style="z-index: 10; position: absolute; right: 0;">
                                Employees enrolled in SREP: ${countEmployees ?? 0} Employee(s) 
                            </div>
                        </div>
                        <div class="container2">
                            <div>
                                FILTERS
                            </div>
                            <div class="container2" style="z-index: 10; position: absolute; right: 0;">
                                <div>
                                    Year: ${Yearfilter}
                                </div>
                                <div>
                                    Entity: ${Entityfilter}
                                </div>
                                <div>
                                    Department: ${Departmentfilter} 
                                </div>
                            </div>
                        </div>
                        <div class="container">${document.getElementById(divId).innerHTML}</div>
                    </Body>
                </HTML>`
            var mywindow = window.open('', 'PRINT', 'height=400,width=600');
            mywindow.document.write(page);
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10*/
            mywindow.print();
            mywindow.close();
            return true;
        };

        return ( <SimplePage id='HRSREPDASHBOARD' title='HR SREP DASHBOARD'>
                <section className="widget flex flex-row w-full" style={{ height: "320px" }}>
                <div className="widget flex w-full sm:w-2/3 p-12" >
                    <Paper className="w-full rounded-8 shadow-none border-1">
                        <div className="flex items-center justify-between px-16 h-64 border-b-1">
                            <Grid container spacing={1}>
                            <Grid item lg={4}>
                            <Typography className="text-16 font-semibold mt-8">SREP Statistics Breakdown</Typography>
                            </Grid>
                            <Grid item lg={2} md={2} sm={4} xs={4}>
                                <SelectTextField value={thisYearString} label="Year" size='small' value={chartYearfilter} onChange={ev => handleChartYearFilter(ev)}>
                                    {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                                </SelectTextField>
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
                                value={filterNew} 
                                onChange={ev => handleFilterNew(ev)}
                                size='small'
                                label='Department'
                            >
                                {departmentsNew.map(({id, departmentName}) => (
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

                                <tr className="employeeEmail">
                                    <th>Email</th>
                                    <td>{selectedRow?.employeeEmail}</td>
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

            <Paper className="mt-8 m-12">
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
                                    {departments.map(({id, departmentName}) => (<MenuItem key={departmentName} value={departmentName}> {departmentName}</MenuItem>))}
                                </SelectTextField>
                            </Grid> 
                        </Grid>
                    </Grid>
                </div>
                <div id="hrpdf">
                    <EnrollmentListTable data={enrollmentList} rows={columns} handleClick={ClickOpen} type="default"/>
                </div>
            </Paper>
            </SimplePage>
            );
        }
    
    export default withReducer('HRsrepDashboard', reducer)(HRsrepDashboard);