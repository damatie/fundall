import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import _ from '@lodash';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Slide from '@material-ui/core/Slide';
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import * as Actions from './store/actions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RecruitmentDialog from './RecruitmentDialog';
import UpdatePositionTab from './tabs/updatePositionTab';
import AssignRecruiterTab from './tabs/assignRecruiterTab';
import Moment from 'react-moment';
import { useAuth } from 'app/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
	table: {
		'& th': {
			padding: '16px 0'
		}
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const userData = useAuth().getUserData;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const TableWidget = (props) =>{
  const dispatch = useDispatch();
  const classes = useStyles();
  const [data, setData] = useState(props.rows);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [openHr, setOpenHr] = useState(false);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
  });
  const [selected, setSelected] = useState({});

	const createSortHandler = property => event =>  {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

  function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
  }

  function handleFilter(event){
    console.log(event.target.value);
    setFilter(event.target.value);
  }
  
  function handleItemClick(event, item){
    console.log(item);
    setSelected(item);
    setOpen(true);
  }

  function handleAssignRecruiter(hrId) {
    dispatch(Actions.assignRecruiter(hrId))
  }
    
  function CheckStatus(status){
      switch (status) {
        case "assigned to recruiter":
          return (
            <Typography className={'bg-green text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
              {status}
            </Typography>
          )
          break;
          
        case "open":
          return (
            <Typography className={'bg-blue text-white inline text-11 font-500 px-8 py-4 rounded-4'}>
              {status}
            </Typography>
          )
          break;
          
        default:
          return (
            status
          )
          break;
      }
  }

  const handleCloseHr = () => {
    setOpenHr(false);
  };

  const handleUpdateOpening = (hrId) => {
    dispatch(Actions.updateOpening(hrId));
  }

  const handleDeleteOpening = (event, hrId) => {
    event.stopPropagation();
    setOpen(false);
    dispatch(Actions.deleteOpening(hrId));
  }

  const isHr = () => userData.role.toUpperCase() === 'HR';

  const displayButton = () => {
    return (
      <Grid container className="items-center w-full">
        <Typography variant='body2' component='span'>Not assigned</Typography>
        { isHr() && <Typography
          onClick={() => setOpenHr(true)}
          className={'bg-green text-white inline text-11 font-500 px-8 py-4 ml-32 rounded-4'}
          style={{cursor: 'pointer'}}
        >
          Assign a recruiter
        </Typography>
        }
      </Grid>
    )
  }

  useEffect(() => {
		if (props.search.length >= 2) {
      setData(_.filter(props.rows, row => row.entity.entityName.toLowerCase().includes(props.search.toLowerCase())
      || row.jobTitle.toLowerCase().includes(props.search.toLowerCase())
      || row.createdAt.toLowerCase().includes(props.search.toLowerCase())
      || row.employeeStatus.toLowerCase().includes(props.search.toLowerCase())));
			setPage(0);
		} else {
			setData(props.rows);
		}
  }, [props.rows, props.search]);
        
	return (
		<Paper className="w-full rounded-8 shadow-none border-1">
      <React.Fragment>
        {/* Details Dialog */}
        <RecruitmentDialog
          title='Detail of Opening'
          open={open}
          update='Update Position'
          onClose={value => setOpen(value)}
          onUpdate={value => setUpdateOpen(value)}
        >
          <table className={clsx(classes.table, 'w-full text-justify')}>
            <tbody>
              <tr className="entity">
                <th>Entity Name</th>
                <td>{(selected.entity) ? selected.entity.entityName : ''}</td>
              </tr>
              <tr className="department">
                <th>Department</th>
                <td>{(selected.department) ? selected.department.departmentName : ''}</td>
              </tr>
              <tr className="jobTitle">
                <th>Job title</th>
                <td>{(selected.jobTitle) ? selected.jobTitle : ''}</td>
              </tr>
              <tr className="assignedRecruiter">
                <th>Recruiter</th>
                <td>{selected.recruiter ? selected.recruiter : displayButton() }
                </td>
              </tr>
              <tr className="employeeStatus">
                <th>Employee Status</th>
                <td>{(selected.employeeStatus) ? selected.employeeStatus : ''}</td>
              </tr>
              <tr className="urgency">
                <th>Urgency</th>
                <td>{ (selected.urgency) ? selected.urgency : '' } </td>
              </tr>
              <tr className="dueDate">
                <th>Due date</th>
                <td>{(selected.dueDate) ? selected.dueDate : '' }</td>
              </tr>
              <tr className="state">
                <th>State</th>
                <td>{ (selected.state) ? selected.state : '' } </td>
              </tr>
              <tr className="country">
                  <th>Country</th>
                  <td>{(selected.country) ? selected.country : '' }</td>
              </tr>
            </tbody>
          </table>
          {!selected.recruiter && 
            <Grid container className="items-center w-full pt-20" justify="center" alignItems="center">
              <Typography
                component={Link}
                to={`/recruitment/position_details/${selected.id}`}
                className={'inline text-14 font-500 px-8 py-4 rounded-4'}
                style={{cursor: 'pointer', background: '#192d3e', color: '#fff'}}
              >
                View full detail
              </Typography>
            </Grid>
          }
        </RecruitmentDialog>
        {/* Assign Reecruiter Dialog */}
        <RecruitmentDialog
          transition={Transition}
          title='Assign Recruiter'
          open={openHr}
          onClose={value => setOpenHr(value)}
          onAssign={value => setOpenHr(value)}
        >
          <AssignRecruiterTab selectedPosition={selected} />
        </RecruitmentDialog>
        {/* Update Dialog */}
        <RecruitmentDialog
          open={updateOpen}
          transition={Transition}
          title='Update Opening'
          onClose={value => setUpdateOpen(value)}
        >
          <UpdatePositionTab selectedPosition={selected} />
        </RecruitmentDialog>
      </React.Fragment>

			<div className="table-responsive">
				<Table className="w-full min-w-full">
					<TableHead>
            <TableRow className="h-64">
                {props.columns.map(column => {
                  if (!isHr() && column.label.toLowerCase() === 'actions') return;
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      padding={column.disablePadding ? 'none' : 'default'}
                      sortDirection={order.id === column.id ? order.direction : false}
                    >
                      {column.sort && (
                        <Tooltip
                          title="Sort"
                          placement={column.align === 'right' ? 'bottom-end' : 'bottom-start'}
                          enterDelay={300}
                        >
                          <TableSortLabel
                            active={order.id === column.id}
                            direction={order.direction}
                            onClick={createSortHandler(column.id)}
                          >
                            {column.label}
                          </TableSortLabel>
                        </Tooltip>
                      )}
                    </TableCell>
                  );
                }, this)}
            </TableRow>
					</TableHead>
					<TableBody>
						{_.orderBy(
								data,
								[
									o => {
										switch (order.id) {
											case 'categories': {
												return o.categories[0];
											}
											default: {
												return o[order.id];
											}
										}
									}
								],
								[order.direction]
							)
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n, i) => {
								return (
									<TableRow
										key={i}
										hover
										onClick={event => {handleItemClick(event, n); setOpen(true) }}
										// selected={n.id === selectedItemId}
                    className="cursor-pointer"
									>
										<TableCell className="text-center" style={{padding: '0 16px'}}>
											{n.entity.entityName}
										</TableCell>
										<TableCell>{n.jobTitle}</TableCell>
										<TableCell className="text-center" style={{padding: '0 16px'}}>{n.employeeStatus}</TableCell>
										<TableCell className="text-center" style={{padding: '0 16px'}}>{n.urgency}</TableCell>
										<TableCell className="text-center"><Moment format="ddd Do MMM, YY | hh:mm:ss a">{n.createdAt}</Moment></TableCell>
                    <TableCell className="text-center" style={{padding: '0 16px'}}>
                        {CheckStatus(n.status)}
                    </TableCell>
                    { isHr() && <TableCell className="text-center" style={{padding: '0 16px'}}>
                      <IconButton aria-label="delete" onClick={(event) => handleDeleteOpening(event, n.id)}>
                        <DeleteIcon style={{color: 'red'}} />
                      </IconButton>
                    </TableCell>}
									</TableRow>
								);
							})}
						</TableBody>
          <TableFooter>
              <TableRow>
                <TablePagination
                    className="overflow-hidden"
                    // component="div"
                    count={data.length}
                    colSpan={props.columns.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
				</Table>
			</div>
		</Paper>
	);
}

export default React.memo(TableWidget);
