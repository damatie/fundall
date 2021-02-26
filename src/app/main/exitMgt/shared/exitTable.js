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
import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Typography } from '@material-ui/core';
import ProgressBtn from 'app/shared/progressBtn';
import { useAuth } from 'app/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from "../store/actions";
import Formsy from 'formsy-react';
import { SelectFormsy } from '@fuse/core/formsy';

const userData = useAuth().getUserData;

const ExitMgtTable = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(props.rows);
    const [selected, setSelected] = useState({});
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const employeeList = useSelector(state => state.employeeList)

    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    const effectiveData = [
        "returned",
        "not returned",
        "not applicable"
    ];

    const formInputs = [
        { label: "Interviewer", validations: "", data: employeeList?.data ?? [], type: "employee" },
        { label: "Company ID Card", validations: "", data: effectiveData },
        { label: "HMO Card", validations: "", data: effectiveData },
        { label: "Laptop/Modem/Sim Card", validations: "", data: effectiveData },
        { label: "Keys", validations: "", data: effectiveData },
    ];

    const [isFormValid, setIsFormValid] = useState(true);
    const formRef = useRef(null);

    const isHR = () => {
        return userData.role.toLowerCase() === "hr manager"
    }

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    const adminUpdateDetails = formInputs.map((input, i) => (
        input.type === "employee" ?
            <SelectFormsy
                className="mb-16 w-full"
                name={"interviewerId"}
                label={input.label}
                variant="outlined"
                required
                requiredError='Must not be None'
            >
                {input?.data?.map((item, i) => (
                    <MenuItem value={item.id} key={i}>{item?.firstName} {item?.lastName}</MenuItem>
                ))}
            </SelectFormsy>
            :
            <SelectFormsy
                className="mb-16 w-full"
                name={input.label}
                label={input.label}
                variant="outlined"
                required
                requiredError='Must not be None'
            >
                {input?.data?.map((item, i) => (
                    <MenuItem value={item} key={i}>{item}</MenuItem>
                ))}
            </SelectFormsy>
    ));

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

    const handleClick = (n) => {
        setSelected(n);
        setOpen(true)
    }

    const handleLMApprove = (id) => {
        dispatch(Actions.lineManagerAccept(id));
        setOpen(false);
    }

    const handleLMReject = (id) => {
        dispatch(Actions.lineManagerReject(id));
        setOpen(false);
    }

    const handleHRApprove = (payload) => {

        let interviewerId = payload.interviewerId;
        delete payload.interviewerId;

        let payloadKeys = Object.keys(payload);
        let inventoryChecks = [];
        let model = {};

        payloadKeys.forEach(element => {
            inventoryChecks.push({
                name: element,
                status: payload[element]
            });
        });

        model = {
            inventoryChecks,
            interviewerId
        }

        dispatch(Actions.HRAccept(model, selected?.id));
        setOpen(false);
    }

    useEffect(() => {
    }, [data, employeeList, props.rows])

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    return (
        <Paper className="w-full rounded-8 shadow-none border-1">

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true} maxWidth={'md'} aria-labelledby="form-dialog-title">

                <DialogTitle className={"MuiButton-containedPrimary"} id="form-dialog-title">Exit Request</DialogTitle>

                <DialogContent>

                    <div className="w-full">
                        <div className={"mb-20"}>
                            <Typography variant={"caption"} >Employee Name </Typography>
                            <Typography variant={"subtitle1"} >{selected?.applicant?.firstName} {selected?.applicant?.lastName}</Typography>
                        </div>

                        <div className={"mb-20"}>
                            <Typography variant={"caption"} >Job Role </Typography>
                            <Typography variant={"subtitle1"} >{selected?.position}</Typography>
                        </div>

                        {
                            isHR() ?
                                <>
                                    {
                                        selected?.answers?.map((item, index) => (
                                            <div className={"mb-20"} key={index}>
                                                <Typography variant={"caption"} >{item.question} </Typography>
                                                <Typography variant={"subtitle1"} >{item.answer}</Typography>
                                            </div>
                                        ))
                                    }

                                    <div className={"mb-20"} key={Math.random()}>
                                        <Typography variant={"caption"} >Employee Signature </Typography>
                                        <Typography variant={"subtitle1"} ><img src={selected?.employeeSignature} className={"w-1/4 mt-10"} /></Typography>
                                    </div>


                                    <div className="w-full mt-20">
                                        <Typography variant={"h6"}> Kindly fill the table below after you have returned the various items mentioned.</Typography>

                                        <Formsy
                                            onValidSubmit={handleHRApprove}
                                            onValid={enableButton}
                                            onInvalid={disableButton}
                                            ref={formRef}
                                            className="flex flex-col justify-center w-full"
                                        >
                                            <div className={"my-24 md:w-3/4 sm:w-full"} >
                                                {adminUpdateDetails}
                                                <ProgressBtn content='Update' disable={!isFormValid} />
                                            </div>
                                        </Formsy>
                                    </div>
                                </>
                                :
                                <>
                                </>
                        }

                    </div>

                </DialogContent>

                {
                    selected?.status?.toLowerCase() === "pending" &&
                        !isHR() ?
                        <DialogActions className="p-20">
                            <div className="flex">
                                <ProgressBtn onClick={() => handleLMReject(selected?.id)} content="Reject" color="red" />

                                <div className={"ml-20"}>
                                    <ProgressBtn onClick={() => handleLMApprove(selected?.id)} content="Approve" />
                                </div>
                            </div>
                        </DialogActions>
                        :
                        <>
                        </>
                }

            </Dialog>


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
                                        onClick={() => handleClick(n)}
                                        className="cursor-pointer"
                                    >
                                        <TableCell style={{ padding: '16px' }}>
                                            {n?.applicant.firstName}  {n?.applicant.lastName}
                                        </TableCell>
                                        <TableCell style={{ padding: '16px' }}>
                                            {n?.position}
                                        </TableCell>
                                        {
                                            n?.entityName &&
                                            isHR() &&
                                            <TableCell style={{ padding: '16px' }}>
                                                {n?.entityName}
                                            </TableCell>
                                        }
                                        {
                                            n?.department &&
                                            isHR() &&
                                            <TableCell style={{ padding: '16px' }}>
                                                {n?.departmentName}
                                            </TableCell>
                                        }
                                        <TableCell style={{ padding: '16px' }}>{n?.status}</TableCell>

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                className="overflow-hidden"
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
        </Paper >
    );
}

export default ExitMgtTable;