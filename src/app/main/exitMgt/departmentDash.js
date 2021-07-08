import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import ExitMgtTable from './shared/exitTable';
import withReducer from 'app/store/withReducer';

const columns = [
    {
        id: 'name',
        // align: 'center',
        disablePadding: false,
        label: "Employer's Name",
        sort: true
    },
    {
        id: 'jobRole',
        // align: 'center',
        disablePadding: false,
        label: 'Job Role',
        sort: true
    },
    {
        id: 'status',
        // align: 'center',
        disablePadding: false,
        label: 'Status',
        sort: true
    },
];

function DepartmentDashboard(props) {

    const dispatch = useDispatch();

    const rows = useSelector(({ exit }) => exit.Exit.departmentList?.rows ?? []);

    useEffect(() => {
        console.log(rows)
    }, [rows])

    useEffect(() => {
        dispatch(Actions.fetchDepartmentExit());
    }, [dispatch]);

    return (
        <FusePageSimple
            classes={{
                toolbar: 'p-0',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={
                <div className="flex flex-1 w-full items-center justify-between px-24">

                    <div className="flex flex-col items-start max-w-full">
                        <div className="flex items-center">
                            <Icon className="text-32">shopping_basket</Icon>
                            <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                                Department's Exit
                            </Typography>
                        </div>
                    </div>

                </div>
            }
            content={
                <Paper className="m-20">
                    <ExitMgtTable
                        columns={columns}
                        rows={rows}
                    />
                </Paper>
            }
            innerScroll
        />
    );
}


export default withReducer('exit', reducer)(DepartmentDashboard);