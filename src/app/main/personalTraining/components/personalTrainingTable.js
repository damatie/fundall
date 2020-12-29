import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import clsx from 'clsx';
import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import SharedTableHead from 'app/shared/sharedTableHead';
import { formatToNaira } from 'utils/formatNumber';
import LoanStatus from 'app/main/loanApp/LoanStatus';
import { Icon } from '@material-ui/core';

function PersonalTrainingTable(props) {
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [data, setData] = useState(props.data);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    React.useEffect(() => {
        setData(props.data);
        // console.log(props.data);
    }, [props.data])

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

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
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
                        rowCount={(data) ? data.length : 0}
                        rows={props.rows}
                        handleDelete={props.handleDelete}
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
                            .map((n, index) => {
                                const isSelected = selected.indexOf(n.id) !== -1;
                                return (
                                    <TableRow
                                        className="h-64 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={index * Math.random()}
                                        selected={isSelected}
                                        onClick={event => props.handleClick(n.training)}
                                    >
                                        <TableCells type={props.type} data={n} rows={props.rows} />
                                        {/* <TableCell component="th" scope="row" align="right">
                                            {n.status === 'approved' ? (
                                                <Icon className="text-green text-20">check_circle</Icon>
                                            ) : (
                                                    <Icon className="text-red text-20">remove_circle</Icon>
                                                )}
                                        </TableCell> */}

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <TablePagination
                className="overflow-hidden"
                component="div"
                count={(data) ? data.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
};

// Table cell
const TableCells = (props) => {
    switch (props.type) {
        case 'default': {
            return (
                <>
                    <TableCell component="th" scope="row" align='left'>

                    </TableCell>
                    {
                        props.rows.map((item, index) => (
                            <Fragment key={index}>
                                {
                                    item.type === 'date' ?
                                        <TableCell component="th" scope="row" align={item.align} key={item.id}>
                                            {/* {moment(data[item.field]).format('LL')} */}
                                            {props.data?.training[item.field]}
                                        </TableCell>
                                        :
                                        item.id === 'amount' ?
                                            <TableCell component="th" scope="row" align={item.align} key={item.id}>
                                                {formatToNaira(props.data?.training[item.field])}
                                            </TableCell>
                                            :
                                            <TableCell component="th" scope="row" align={item.align} key={item.id}>
                                                {props.data?.training[item.field]}
                                            </TableCell>
                                }
                            </Fragment>
                        ))
                    }
                </>
            );
        }
        default: {
            // return <></>
            break;
        }
    };

    return (
        <>
        </>
    );
};

export default withRouter(PersonalTrainingTable);
