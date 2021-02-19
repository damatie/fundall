import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimplePage from 'app/shared/SimplePage';
import BarChart from 'app/shared/charts/BarChart';
import EnhancedTable from 'app/shared/table/EnhancedTable';
import Paper from '@material-ui/core/Paper';
import SelectTextField from 'app/shared/TextInput/SelectTextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import * as Actions from '../store/actions';
import * as UtilActions from '../../../store/actions';
import reducer from '../store/reducers';
import { useAuth } from 'app/hooks/useAuth';



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

const userId = useAuth().getId;
const userData = useAuth().getUserData;
function EmployeeSrepDashboard(props) {
  const dispatch = useDispatch();
	const srep = useSelector(({ srep }) => srep.srep.data);

	const rows = (srep) ? (srep.srep) ? srep.srep : [] : [];
  const [data, setData] = useState(rows);
  const [filter, setFilter] = useState('');

  console.log({data})

  const columns = React.useMemo(
    () => [
      {
        Header: 'S/N',
        accessor: 'sn',
        // className: 'font-bold',
        sortable: true
      },
      {
        Header: 'Name of Beneficiary',
        accessor: 'name',
        sortable: true
      },
      {
        Header: 'Relationship to Employee',
        accessor: 'relationship',
        sortable: true
      },
      {
        Header: 'Capital Fund to be Contributed',
        accessor: 'fund',
        sortable: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row: { values: { status } } }) => {
          return <Status status={status} />
        },
        className: 'justify-center',
        // width: 64,
        sortable: false
      },
    ],
  );

  useEffect(() => {
		dispatch(Actions.getSrepByEmployeeID(userId));
	}, [dispatch]);

  const handleClick = (event, value) => {
    console.log(value);
    // props.history.push(`/srep/details/${value.original.id}`);
    props.history.push({
        pathname: `/srep/details/${value.original.id}`, 
        state: {
            employeeRole: userData.role.toUpperCase()
        }
    });
  }

  return (
    <SimplePage title='EMPLOYEE SREP DASHBOARD'>
      <Paper className='p-20 mx-10 rounded-8'>
      <Grid container spacing={1} alignItems='center'>
          <Grid item lg={2}>
            <SelectTextField
              value={'all'}
              size='small'
            >
              {['all', 'Approved', 'Pending', 'Rejected'].map(item => (
                <MenuItem value={item}>
                  {item}
                </MenuItem>
              ))}
            </SelectTextField>
          </Grid>
          <Grid item lg={10}>
            <Typography variant="subtitle1" color="initial" className='font-semibold text-center'>Status of SREP Applications</Typography>
          </Grid>
        </Grid>
        <EnhancedTable
          columns={columns}
          data={rows}
          onRowClick={handleClick}
        />
      </Paper>
    </SimplePage>
  );
}

const Status = ({ status }) => {
  switch (status.toUpperCase()) {
    case 'APPROVED':
      return (
        <Typography className={'bg-green text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
      );
    case 'REVIEWED':
      return (
        <Typography className={'bg-orange text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
      );
      case 'PENDING':
        return (
          <Typography className={'bg-blue text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
        );
    case 'REJECTED':
      return (
        <Typography className={'bg-red text-white inline text-11 font-500 px-8 py-4 rounded-4'}>{status}</Typography>
      );
    default: {
      return status;
    }
  }
};

export default withReducer('srep', reducer)(EmployeeSrepDashboard);
