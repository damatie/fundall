import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import SharedTableHead from 'app/shared/sharedTableHead';
import ProgressBtn from 'app/shared/progressBtn';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import swal from 'sweetalert2';

const rows = [
	{
		id: 'first_name',
		align: 'left',
		disablePadding: false,
		label: 'Frist name',
		sort: true
  },
  {
		id: 'last_name',
		align: 'left',
		disablePadding: false,
		label: 'Last name',
		sort: true
  },
  {
		id: 'email',
		align: 'left',
		disablePadding: false,
		label: 'Email',
		sort: true
  },
  {
		id: 'role',
		align: 'left',
		disablePadding: false,
		label: 'Role',
		sort: true
  },
  {
		id: 'assign',
		align: 'right',
		disablePadding: false,
		label: 'Assign',
		sort: true
	}
];

function DepartmentDetailTable(props) {
	const dispatch = useDispatch();
  const employeeList = useSelector(({ employeeList }) => employeeList)

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(employeeList.data);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
    setData(employeeList.data)
	}, [dispatch]);

	function handleRequestSort(event, property) {
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

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(item) {
		// props.history.push(`/hr/roles/roles&permission/${item.id}`);
  }
  


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

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	const handleDelete = () => {
		// dispatch(Actions.deleteRoles(selected));
	};

	if(employeeList.loading) {
    return <div>Loading...</div>
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table className="min-w-xl" aria-labelledby="tableTitle">
				  <SharedTableHead
						numSelected={selected.length}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
            rowCount={data.length}
						rows={rows}
						handleDelete={handleDelete}
						success={true}
					/>
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
							.map(n => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
										onClick={event => handleClick(n)}
									>
                    <TableCell component="th" scope="row" align='left'>
                     
										</TableCell>

										<TableCell component="th" scope="row" align='left'>
                      {n.firstName}
										</TableCell>
                    <TableCell component="th" scope="row" align='left'>
                      {n.lastName}
										</TableCell>
                    <TableCell component="th" scope="row" align='left'>
                      {n.email}
										</TableCell>
                    <TableCell component="th" scope="row" align='left'>
                      {n.role ? n.role.name : ''}
										</TableCell>
                    <TableCell component="th" scope="row" align='right'>
                      <AssignLineManager id={n.id}/>
										</TableCell>

									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="overflow-hidden"
				component="div"
				count={data.length}
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
		</div>
	);
};

const header = fetchHeaders()

const AssignLineManager = ({ id })=> {
  const [isLineManager, setIsLineManager] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    fetch(`https://hris-cbit.herokuapp.com/api/v1/lineManager/${id}`, {
      ...header.getRegHeader()
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          setIsLineManager(true);
          setSuccess(true);
        } else {
          setIsLineManager(false);
          setSuccess(false);
        }
      }
    ).catch(e => console.error(e))
  }, [isLineManager]);


  const handleAssign = () => {
    setLoading(true);
    if(isLineManager) {
      fetch(`https://hris-cbit.herokuapp.com/api/v1/lineManager/${id}`, {
      ...header.reqHeader(
        'delete',
        {
          departmentId: params.id,
          employeeId: id
        }
      )
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          setLoading(false)
          setSuccess(true);
          setIsLineManager(false);
          swal.fire({
            title: 'Assign line manager',
            text: data.message,
            icon: 'success',
            timer: 3000
          })
        } else {
          setLoading(false)
        }
      }
    ).catch(e => console.error(e))
    } else {
      fetch(`https://hris-cbit.herokuapp.com/api/v1/lineManager/add`, {
      ...header.reqHeader(
        'post',
        {
          departmentId: params.id,
          employeeId: id
        }
      )
    }).then(res => res.json()).then(
      data => {
        if(data.success) {
          setLoading(false)
          setSuccess(true);
          setIsLineManager(true);
          swal.fire({
            title: 'Assign line manager',
            text: data.message,
            icon: 'success',
            timer: 3000
          })
        } else {
          setLoading(false)
        }
      }
    ).catch(e => console.error(e))
    }
  }

  return (
    <ProgressBtn loading={loading} success={success} content={isLineManager ? 'unassign line manager' : 'assign line manager'} onClick={handleAssign}/>
  );
};

export default withRouter(DepartmentDetailTable);
