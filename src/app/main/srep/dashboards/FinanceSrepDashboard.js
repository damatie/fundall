import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import SimplePage from 'app/shared/SimplePage';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import Grid from '@material-ui/core/Grid';
import * as Actions from '../store/actions';
import * as UtilActions from '../../../store/actions';
import reducer from '../store/reducers';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { AppBar, Toolbar } from '@material-ui/core';
import SharedTable from 'app/shared/sharedTable';
import { jsPDF } from 'jspdf';

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

    const columns = [
        {
            id: 'name',
            field: 'name',
            align: 'left',
            disablePadding: false,
            label: 'Employee Name',
            sort: true
        },
        {
            id: 'employeeEmail',
            field: 'employeeEmail',
            align: 'left',
            disablePadding: false,
            label: 'Employee Email',
            sort: true
        },
        {
            id: 'entity',
            field: 'entity',
            align: 'left',
            disablePadding: false,
            label: 'Entity',
            sort: true,
            Cell: ({ row: { original: { entity }} }) => {
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
            label: 'Department',
            sort: true,
            Cell: ({ row: { original: { entity, department }} }) => {
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
            // disablePadding: false,
            label: 'Capital Funds',
            field: 'capitalFund',
            sort: true,
        },
        {
            align: 'left',
            // disablePadding: false,
            label: 'Beneficiary Name',
            field: 'beneficiaryName',
            sort: true,
        },
        {
            align: 'left',
            // disablePadding: false,
            label: 'Beneficiary Nationality',
            field: 'beneficiaryNationality',
            sort: true,
        },
        {
            align: 'left',
            // disablePadding: false,
            label: 'Beneficiary Gender',
            field: 'beneficiaryGender',
            sort: true,
        },
        {
            align: 'left',
            // disablePadding: false,
            label: 'Relationship',
            field: 'beneficiaryRelationship',
            sort: true,
        },
        {
            align: 'left',
            // disablePadding: false,
            label: 'Beneficiary Email',
            field: 'beneficiaryEmail',
            sort: true,
        },
    ];


	
    function FinanceSrepDashboard(props) {
        const dispatch = useDispatch();
        const HRsrepDashboard = useSelector(({ HRsrepDashboard }) => HRsrepDashboard.HRsrepDashboard);
        let enrollmentList = [] 
        enrollmentList = (HRsrepDashboard !== undefined) ? ((HRsrepDashboard.data !== undefined) ? HRsrepDashboard.data.srepData : []) : [];
        let approvedList = [];
        approvedList = enrollmentList ? enrollmentList.filter(t => t.status === 'approved') : [];
        let pendingList = [];
        pendingList = enrollmentList ? enrollmentList.filter(t => t.status === 'pending') : [];
        console.log('HRsrepDashboard Data: ', enrollmentList);
        const [data, setData] = useState(enrollmentList);
        const [open, setOpen] = useState(false);
        const [search, setSearch] = useState('');
        const thisYear = (new Date).getFullYear();
        console.log('thisYear: ', thisYear);
        const years = ['all', `${thisYear}`,`${thisYear - 1}`, `${thisYear - 2}`, `${thisYear - 3}`, `${thisYear - 4}`];
        const entities = [{entityName: 'all'}, ...((useSelector(({ entities }) => entities.entityList)) ? useSelector(({ entities }) => entities.entityList) : [])];
        const departments =  [{departmentName: 'all'}, ...((useSelector(({ departments }) => departments.deparmentList)) ? useSelector(({ departments }) => departments.deparmentList) : [])];
        const [Entityfilter, setEntityFilter] = useState('all');
        const [Yearfilter, setYearFilter] = useState('all');
        const [Departmentfilter, setDepartmentFilter] = useState('all');
        const [selectedRow, setSelectedRow] = useState({})

        useEffect(() => {
            dispatch(Actions.getDashboardSrep());
            dispatch(UtilActions.getEntities());
        }, [dispatch]);

        useEffect(() => {
            if ((Departmentfilter && Yearfilter && Entityfilter) === 'all') {
              setData(enrollmentList);
            } else {
              // setData(_.filter(enrollmentList, e => e.status.toLowerCase() === Departmentfilter.toLowerCase()));
            }
        }, [Departmentfilter, Yearfilter, Entityfilter]);
        
        function handleSearch(event) {
          setSearch(event.target.value);
          setDepartmentfilter('all'); 
          setYearfilter('all');
          setEntityfilter('all');
        }

        function formatTodayDate() {
          var d = new Date,
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
      
          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;
      
          return [year, month, day].join('-');
        }

        const employeesEnrolled = () => {
          let empList = [];
          let countEmployees = 0;
          data.forEach(e => {
            if (!empList.includes(e.employeeEmail)) {
              countEmployees++;
              empList.push(employeeEmail);
            }
            console.log('empCount: ', countEmployees);
          });
          return `${countEmployees} Employees`;  
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
            setOpen(true);
        };

        const downloadPdf = () => {
            console.log('icon Clicked');
            const doc = new jsPDF();
            const elementHTML = document.getElementById('financepdf');
            console.log('elementHTML: ', elementHTML);
            const specialElementHandlers = {
              '#elementH': function (element, renderer) {
                  return true;
              }
            };
            doc.fromHTML(elementHTML, 15, 15, {
                'width': 170,
                'elementHandlers': specialElementHandlers
            });
            
            // Save the PDF
            doc.save('enrollmentList.pdf');
        };

        return ( <SimplePage title='FINANCE SREP DASHBOARD'>
                <section>
                  <div className="flex flex-row w-full justify-between">
                    <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col justify-center items-center mr-10">
                      <div className="text-center pt-12">
                        <Typography className="text-16" color="textSecondary">
                          {"Number Of  Approved Applications"}
                        </Typography>
                        <Typography className="text-32" style={{ color: "green" }}>
                          {(enrollmentList && (enrollmentList.length > 0)) ? approvedList.length : 0}
                        </Typography>
                      </div>
                      <div className="pt-20"></div>
                    </Paper>
                    <Paper className="w-full rounded-8 shadow-none border-1 flex flex-col justify-center items-center mr-6">
                      <div className="text-center pt-12">
                        <Typography className="text-16" color="textSecondary">
                          {"Number of SREP Pending Applications"}
                        </Typography>
                        <Typography className="text-32" style={{ color: "orange" }} >
                          {(enrollmentList && (enrollmentList.length > 0)) ? pendingList.length : 0}
                        </Typography>
                      </div>
                      <div className="pt-20"></div>
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

            <Paper className="mt-24 mb-10 mr-10">
                <div className="flex flex-wrap w-full p-20">
                    <Grid container spacing={1} >
                        <Grid container spacing={1} className="flex w-full flex-row" style={{ marginTop: "10px" }}>
                            <Grid item lg={9} md={6} sm={6} xs={6} className="font-semibold text-16">
                            Enrollment List
                            </Grid>

                            <Grid item lg={3} md={6} sm={6} xs={6} className="ml-60" style={{ display: "flex", float: "right", color: "green" }}>
                                <Grid style={{ marginLeft: "auto" }} onClick = {downloadPdf}>
                                    <Icon>{'cloud_download'}</Icon>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className="flex flex-row mb-20">
                            <Grid item lg={3} md={6} sm={6} xs={12}>
                            <Formsy>
                                <Grid container spacing={1} className="flex flex-row" style={{ marginTop: "10px" }}>
                                    <Grid item style={{ marginTop: "15px" }} >
                                    Date: 
                                    </Grid>
                                    <Grid item lg={9} md={9} sm={9} xs={9}>
                                    <TextFieldFormsy
                                        className="w-full h-60"
                                        type="date"
                                        name="name"
                                        // value={formatTodayDate}
                                        variant="outlined"
                                        style={{height: "5px"}}
                                    />
                                    </Grid>
                                </Grid>
                            </Formsy>
                            </Grid>
                            <Grid item lg={9} md={6} sm={12} xs={12} className="text-right flex-row" style={{ marginTop: "20px" }}>
                                <Typography style={{ textAlign: "right" }}>
                                    Employees enrolled in SREP 
                                </Typography>
                                <Grid style={{ color: "blue" }}>
                                  {employeesEnrolled} {"10 Employees"}
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
                            <Grid item lg={2} md={3} sm={4} xs={4}>
                                <SelectTextField value={'all'} label="Department" size='small' value={Departmentfilter} onChange={ev => handleDepartmentFilter(ev)}>
                                    {departments.map(({id, departmentName}) => (<MenuItem key={id} value={departmentName}> {departmentName}</MenuItem>))}
                                </SelectTextField>
                            </Grid>
                            <Grid item lg={3} md={3} sm={4} xs={4}>
                                <SelectTextField value={'all'} label="Entity" size='small' value={Entityfilter} onChange={ev => handleEntityFilter(ev)} >
                                    {entities.map(({id, entityName}) => (<MenuItem key={id} value={entityName}> {entityName} </MenuItem>))}
                                </SelectTextField>
                            </Grid>
                            <Grid item lg={2} md={2} sm={4} xs={4}>
                                <SelectTextField value={'all'} label="Year" size='small' value={Yearfilter} onChange={ev => handleYearFilter(ev)}>
                                    {years.map((year) => (<MenuItem key={year} value={year}> {year} </MenuItem>))}
                                </SelectTextField>
                            </Grid> 
                        </Grid>
                    </Grid>
                </div>
                <div id="financepdf" className="widget flex w-full p-18 border-t-1">
                    <SharedTable data={enrollmentList !== undefined ? enrollmentList : []} rows={columns} handleClick={handleClickOpen} type="default" />
                </div>
            </Paper>
            </SimplePage>
            );
        }
    

export default withReducer('HRsrepDashboard', reducer)(FinanceSrepDashboard)
