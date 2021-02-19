import _ from '@lodash';
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
// import Typography from '@material-ui/core/Typography';
// import { Link } from 'react-router-dom';
// import Slide from '@material-ui/core/Slide';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import { useDispatch, useSelector } from 'react-redux';
// import * as Actions from '../store/actions';
// import Grid from '@material-ui/core/Grid';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
// import RecruitmentDialog from './RecruitmentDialog';
// import UpdatePositionTab from './tabs/updatePositionTab';
// import AssignRecruiterTab from './tabs/assignRecruiterTab';
// import Moment from 'react-moment';
import { useAuth } from 'app/hooks/useAuth';
import { useHistory } from 'react-router';
// import RecruitmentDialog from 'app/main/recruitment/RecruitmentDialog';

// const useStyles = makeStyles((theme) => ({
//     table: {
//         '& th': {
//             padding: '16px 0'
//         }
//     },
//     root: {
//         width: '100%',
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

const userData = useAuth().getUserData;

const AttendanceTable = (props) => {
    // const history = useHistory();
    // const dispatch = useDispatch();
    // const classes = useStyles();
    const [data, setData] = useState(props.rows);
    // const [open, setOpen] = useState(false);
    // const [updateOpen, setUpdateOpen] = useState(false);
    // const [openHr, setOpenHr] = useState(false);
    // const [filter, setFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });
    // const [selected, setSelected] = useState({});

    const createSortHandler = property => event => {
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

    return (
        <Paper className="w-full rounded-8 shadow-none border-1">

            <div className="table-responsive">
                <Table className="w-full min-w-full">
                    <TableHead>
                        <TableRow className="h-64">
                            {props.columns.map(column => {
                                // if (!isHr() && column.label.toLowerCase() === 'actions') return;
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
                                        // onClick={event => { handleItemClick(event, n); setOpen(true) }}
                                        // selected={n.id === selectedItemId}
                                        className="cursor-pointer"
                                    >
                                        <TableCell style={{ padding: '16px' }}>
                                            {
                                                n.activities.map((item, index) =>
                                                    index === n.activities.length -1?
                                                        <span>{item.name}.</span> :
                                                        <span>{item.name},  </span>
                                                )
                                            }
                                        </TableCell>
                                        <TableCell style={{ padding: '16px' }}>
                                            {n?.date}
                                        </TableCell>
                                        <TableCell style={{ padding: '16px' }}>{n?.status}</TableCell>

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                className="overflow-hidden"
                                // component="div"
                                count={props.rows.length}
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

export default React.memo(AttendanceTable);