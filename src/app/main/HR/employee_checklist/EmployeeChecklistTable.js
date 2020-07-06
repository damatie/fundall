import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import EmployeeChecklistHead from './EmployeeChecklistHead';
import FileInput from '../../../shared/fileInput/FileInput';
import { InputField } from '../../../shared/TextInput/TextInput';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  show: {
    visibility: 'hidden',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  title: {
    textAlign: 'center',
    margin: '4rem 0 0 0',
  },
  btn: {
    margin: '2rem auto',
    textAlign: 'center',
    width: '80%',
  }
}));

function EmployeeChecklistTable(props) {
  const classes = useStyles();

  const [selected, setSelected] = useState([]);

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <div style={{ width: '80%', margin: '2rem auto' }}>
          <Grid container spacing="3" alignItems="center">
            <Grid item xs="12" sm="12" md="2" lg="2" xl="2">
              <p><b>EMPLOYEE NAME:</b></p>
            </Grid>
            <Grid item xs="12" sm="12" md="10" lg="10" xl="10">
              <InputField options={{ variant: 'outlined' }} handleChange="" />
            </Grid>
          </Grid>

          <Grid container spacing="3" alignItems="center">
            <Grid item xs="12" sm="12" md="2" lg="2" xl="2">
              <p><b>OFFICE MOBILE NUMBER:</b></p>
            </Grid>
            <Grid item xs="12" sm="12" md="10" lg="10" xl="10">
              <InputField options={{ variant: 'outlined' }} handleChange="" />
            </Grid>
          </Grid>

          <Grid container spacing="3" alignItems="center">
            <Grid item xs="12" sm="12" md="2" lg="2" xl="2">
              <p><b>JOB TITLE/ DEPARTMENT:</b></p>
            </Grid>
            <Grid item xs="12" sm="12" md="10" lg="10" xl="10">
              <InputField options={{ variant: 'outlined' }} handleChange="" />
            </Grid>
          </Grid>

          <Grid container spacing="3" alignItems="center">
            <Grid item xs="12" sm="12" md="2" lg="2" xl="2">
              <p><b>DATE OF HIRE:</b></p>
            </Grid>
            <Grid item xs="12" sm="12" md="3" lg="3" xl="3">
              <InputField options={{ type: 'date' }} handleChange="" />
            </Grid>
          </Grid>
        </div>

        <div className={classes.title}>
          <p><strong>EMPLOYEE ONBOARDING CHECKLIST (OPERATIONS/EXPAT)</strong></p>
        </div>

        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <EmployeeChecklistHead />
          <TableBody>
            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ visibility: 'hidden' }}
              >
                1
              </TableCell>

              <TableCell
                component="th"
                scope="row"
                align="center"
                style={{ background: '#00B0F0' }}
                colSpan="3"
              >
                <strong>Before Arrival</strong>
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>

              <TableCell component="th" scope="row">
                After interview, send successful Candidate For Pre-employment Medical
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                2
              </TableCell>

              <TableCell component="th" scope="row">
                Review Medical Report , If successful, send employment letter/contract to sign
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                3
              </TableCell>

              <TableCell component="th" scope="row">
                Carry out Employee Reference/ Guarantor Check
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                4
              </TableCell>

              <TableCell component="th" scope="row">
                Carry out OSP verification/registration (for all Rig personnel.)
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                5
              </TableCell>

              <TableCell component="th" scope="row">
                Send out notification of mobilization and SpringRock formatted CV to client (where applicable, 3 days before arrival).
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                6
              </TableCell>

              <TableCell component="th" scope="row">
                Share SREL Malaria Orientation Power Point slide, Visitor Orientation and Axa mansard form
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                7
              </TableCell>

              <TableCell component="th" scope="row">
                Inform new staff to resume with 2 passports, credentials, personal details, filled guarantor form (attach the form in email)
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                8
              </TableCell>

              <TableCell component="th" scope="row">
                Send out communication informing all relevant parties (supervisor(s), hr etc.) of the new staff
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                9
              </TableCell>

              <TableCell component="th" scope="row">
                Ensure onboarding pack is ready (forms, biro, book, mug, water, juice, snack and malaria drug etc.)
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                10
              </TableCell>

              <TableCell component="th" scope="row">
                Schedule & email all directors concerning the onboarding meeting with the new staff
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                11
              </TableCell>

              <TableCell component="th" scope="row">
                Ensure the new employee’s work tools (computer, internet, call card/sim, office desk, seat, locker etc.) and supplies are ready before the day of resumption
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                ADMIN
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                12
              </TableCell>

              <TableCell component="th" scope="row">
                Confirm Crew Change Date (if required)
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                ADMIN
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                13
              </TableCell>

              <TableCell component="th" scope="row">
                Confirm Protocol and Employee Arrival (if required)
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                ADMIN
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                15
              </TableCell>

              <TableCell component="th" scope="row">
                Make Hotel/Guest House Reservations, Dietary, Laundry etc. (Liaise with Expat Mgt Staff)
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                ADMIN
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ visibility: 'hidden' }}
              >
                1
              </TableCell>

              <TableCell
                component="th"
                scope="row"
                align="center"
                style={{ background: '#705A87' }}
                colSpan="3"
              >
                <strong>ON ARRIVAL - HR/ADMIN</strong>
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>

              <TableCell component="th" scope="row">
                Have new staff meet with HR Manager with their cv and employee checklist, immediately on arrival
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                2
              </TableCell>

              <TableCell component="th" scope="row">
                Send out Welcome Document(s) to Employee (including email signature, staff contacts, handbook, policies etc)
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                3
              </TableCell>

              <TableCell component="th" scope="row">
                Take new employee through the induction presentation / summary of the handbook.
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                4
              </TableCell>

              <TableCell component="th" scope="row">
                QHSE Induction & Malaria Training
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                QHSE
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                5
              </TableCell>

              <TableCell component="th" scope="row">
                Guidance on completion of timesheets and invoice template
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                6
              </TableCell>

              <TableCell component="th" scope="row">
                Completion of all onboarding forms (Data form, Policy signing) alongside Certificate verification & Mandatory Rig Permit
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                7
              </TableCell>

              <TableCell component="th" scope="row">
                Collect new employee documents (credentials, passports, including filled guarantor form)
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                8
              </TableCell>

              <TableCell component="th" scope="row">
                Have the new employee meet with the Directors for brief meetings if scheduled
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                9
              </TableCell>

              <TableCell component="th" scope="row">
                Send out Email to all Staff Introducing the new employee, their position, unit and supervisor
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                10
              </TableCell>

              <TableCell component="th" scope="row">
                Send signed contract letter & 2nd sheet of data form (with salary & statutory details) to Finance
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                10
              </TableCell>

              <TableCell component="th" scope="row">
                Send signed contract letter & 2nd sheet of data form (with salary & statutory details) to Finance
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                11
              </TableCell>

              <TableCell component="th" scope="row">
                Include employee details in directory, staff list and salary list collation
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                HR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>


            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ visibility: 'hidden' }}
              >
                1
              </TableCell>

              <TableCell
                component="th"
                scope="row"
                align="center"
                style={{ background: '#F79646' }}
                colSpan="3"
              >
                <strong>ON ARRIVAL - SUPERVISOR</strong>
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>

              <TableCell component="th" scope="row">
                Assign an Office Buddy to the new employee to answer any question regarding work and office navigation.
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                SUPERVISOR
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                2
              </TableCell>

              <TableCell component="th" scope="row">
                Show the new employee around the office (lavatories, coffee and/or break areas, facilities, clock-in machine etc),
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                OFFICE BUDDY
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                3
              </TableCell>

              <TableCell component="th" scope="row">
                Introduce the new employee to his/her co-workers and their functions, Indicate to each co-worker what the new employee’s position will be.
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                OFFICE BUDDY
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                4
              </TableCell>

              <TableCell component="th" scope="row">
                Introduce and paint a wholistic picture of the department to the employee
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                Supervisor
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                5
              </TableCell>

              <TableCell component="th" scope="row">
                Review the job description with the employee including responsibilities & working relationships
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                Supervisor
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                6
              </TableCell>

              <TableCell component="th" scope="row">
                Assign meaningful task to employee and discuss their expected 1, 3 and 6 months deliverables
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                Supervisor
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                7
              </TableCell>

              <TableCell component="th" scope="row">
                Begin a one month practical training of the new hires core functions. Supervisors are expected to ‘patiently’ train, monitor and work with the new staff closely on projects during this period.
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                Supervisor
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>

            <TableRow
              className="h-64 cursor-pointer"
              hover
              role="checkbox"
              // aria-checked={isSelected}
              tabIndex={-1}
            // selected={isSelected}
            >
              <TableCell component="th" scope="row">
                8
              </TableCell>

              <TableCell component="th" scope="row">
                Send new employee completely ticked form back to the HR Manager
              </TableCell>

              <TableCell className="truncate" component="th" scope="row">
                Supervisor
              </TableCell>

              <TableCell className="w-64 text-center" padding="none">
                <Checkbox
                  // checked={isSelected}
                  onClick={event => event.stopPropagation()}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div style={{ width: '80%', margin: '2rem auto' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs >
              <FileInput />
              <span>New Hire (Sign/Date)</span>
            </Grid>
            <Grid item xs >
              <FileInput />
              <span>HR Representative (Sign/Date)</span>
            </Grid>
            <Grid item xs >
              <FileInput />
              <span>Administrative Officer (Sign/Date)</span>
            </Grid>
          </Grid>

          <div style={{ margin: '3rem 0 0 0' }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs >
                <FileInput />
                <span>Supervisor (Sign/Date)</span>
              </Grid>
              <Grid item xs className={classes.show} >
                <FileInput />
                <span>HR Representative (Sign/Date)</span>
              </Grid>
              <Grid item xs >
                <FileInput />
                <span>HR Manager (Sign/Date)</span>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={classes.btn}>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </FuseScrollbars>
    </div>
  );
}

export default withRouter(EmployeeChecklistTable);
