import FuseAnimate from '@fuse/core/FuseAnimate';
// import FuseChipSelect from '@fuse/core/FuseChipSelect';
// import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
// import { useForm, useDeepCompareEffect } from '@fuse/hooks';
// import FuseUtils from '@fuse/utils';
import _ from '@lodash';
// import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
// import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Tab from '@material-ui/core/Tab';
// import Tabs from '@material-ui/core/Tabs';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withReducer from 'app/store/withReducer';
// import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import Table from './RecruitmentTable.js_old';
// import { useAuth } from 'app/hooks/useAuth';

const columns = [
    {
        id: 'jobRole',
        align: 'center',
        disablePadding: false,
        label: 'Job Role',
        sort: true
    },
    {
        id: 'entityName',
        align: 'center',
        disablePadding: false,
        label: 'Entity Name',
        sort: true
    },
    {
        id: 'department',
        align: 'center',
        disablePadding: false,
        label: 'Department',
        sort: true
    },
    {
        id: 'positionType',
        align: 'center',
        disablePadding: false,
        label: 'Position Type',
        sort: true
    },
    {
        id: 'hiredDate',
        align: 'center',
        disablePadding: false,
        label: 'Desired Hire Date',
        sort: true
    },
    {
        id: 'dateModified',
        align: 'center',
        disablePadding: false,
        label: 'Date Modified',
        sort: true
    },
    {
        id: 'candidated',
        align: 'center',
        disablePadding: false,
        label: 'No. of Candidates',
        sort: true
    },
];

function RecruitmentList(props) {
    const dispatch = useDispatch();

    const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
    const rows = useSelector(({ Recruitment }) => Recruitment.recruitment.data);

    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(Actions.getAllOpenPositions());
        dispatch(Actions.getEntities());
    }, [])

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
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Icon className="text-32">shopping_basket</Icon>
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                                    Recruitment List
								</Typography>
                            </FuseAnimate>
                        </div>
                    </div>

                    <div className="flex flex-1 items-center justify-center px-12">
                        <ThemeProvider theme={mainTheme}>
                            <FuseAnimate animation="transition.slideDownIn" delay={300}>
                                <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
                                    <Icon color="action">search</Icon>
                                    <Input
                                        placeholder="Search"
                                        className="flex flex-1 mx-8"
                                        disableUnderline
                                        fullWidth
                                        value={search}
                                        inputProps={{
                                            'aria-label': 'Search'
                                        }}
                                        onChange={ev => setSearch(ev.target.value)}
                                    />
                                </Paper>
                            </FuseAnimate>
                        </ThemeProvider>
                    </div>
                </div>
            }
            content={
                <div className=" sm:px-24 py-16 ">

                    <Table
                        columns={columns}
                        rows={rows}
                        search={search}
                    />

                </div>
            }
            innerScroll
        />
    );
}

export default withReducer('Recruitment', reducer)(RecruitmentList);
