import React from 'react';
import EnhancedTable from 'app/shared/table/EnhancedTable';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SharedModal from 'app/shared/modal/SharedModal';
import GradeAndPromotionForm from './components/GradeAndPromotionForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPromotionHistory
} from './store/actions';
import usePromotionHistory from './hooks/usePromotionHistory';
import { getAllEmployeeGrade } from 'app/main/employeeGrade/store/actions';
import { getAllJobTitle } from 'app/main/jobTitle/store/actions';
import userPermission from './logic/userPermission';
import Skeleton from '@material-ui/lab/Skeleton';

const GradeAndPromotion = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Job Title',
        accessor: 'jobTitleName',
        // className: 'font-bold',
        sortable: true,
        // Cell: ({ row : { original }}) => {
        // 	return <>{moment(original.updatedAt).format('LLL')}</>
        // }
      },
      {
        Header: 'Employee Grade',
        accessor: 'gradeName',
        // className: 'font-bold',
        sortable: true
      },
      {
        Header: 'Date of Promotion',
        accessor: 'dateOfPromotion',
        // className: 'font-bold',
        sortable: true
      },
    ],
  );

  const dispatch = useDispatch();

  const {
    promotionHistory: { data, open, loading, single },
    employeeInfo: {
      info
    },
    jobTitle,
    employeeGrade,

  } = useSelector(state => state.employeeInformation);

  const authState = useSelector(state => state.auth.user);

  React.useEffect(() => {
    dispatch(getPromotionHistory(info.employeeId));
  }, []);

  const {
    handleSubmit,
    errors,
    register,
    control,
    onSubmit,
    handleOpen,
    handleClose,
    getOneData,
    handleDelete
  } = usePromotionHistory({
    dispatch,
    employeeId: info.employeeId,
  });

  const { canEditOrganization } = userPermission({
    role: authState.role,
    userId: authState.id,
    profileId: info.id,
  });

  return (
    <>
      <Typography variant="subtitle1" color="initial" className='my-20'>
        <strong>Employee Date of Employment:</strong>&nbsp;<span>{info.startDate}</span>
      </Typography>
      <Typography variant="subtitle1" color="initial" className='my-20'>
        <strong>Employee Confirmation Date:</strong>&nbsp;<span>{info.confirmationDate}</span>
      </Typography>
      <Typography variant="subtitle1" color="initial" className='my-20'>
        <strong>Employee Grade:</strong>&nbsp;<span>{info.employeeGrade.gradeName}</span>
      </Typography>
      <Typography variant="subtitle1" color="initial" className='my-20'>
        <strong>Employee Date of Last Promotion</strong>&nbsp;<span>{info.dateOfLastPromotion}</span>
      </Typography>
      {/* <Typography variant="subtitle1" color="initial" className='my-20'>
      <strong>New Hire Or Rehire:</strong>&nbsp;<span>New Hire</span>
    </Typography> */}
      {
        loading ? (
          <Skeleton variant="rect" width='100%' height={400} animation="wave" />
        ) : (
            <EnhancedTable
              columns={columns}
              data={data}
              onRowClick={(ev, row) => {
                if (row) {
                  canEditOrganization() && getOneData(row.original);
                }
              }}
              checkbox={{
                showCheckbox: false,
                onClick: (value) => console.log(value),
                accessor: 'id',
              }}
              selectAll={(value) => console.log(value)}
              handleDelete={() => null}
              toolBar={
                <Grid container spacing={1}>
                  <Grid item lg={9} />
                  <Grid item lg={3}>
                    {
                      canEditOrganization() && (
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={handleOpen}
                        >
                          Add Promotion History
                        </Button>
                      )
                    }

                  </Grid>
                </Grid>
              }
            />
          )
      }

      <SharedModal
        title='Add Promotion History'
        open={open}
        handleClose={handleClose}
      >
        <GradeAndPromotionForm form={{
          handleSubmit,
          errors,
          register,
          control,
          onSubmit,
        }} data={{
          jobTitle: jobTitle.data,
          employeeGrade: employeeGrade.data,
          single
        }} />
      </SharedModal>
    </>
  );
};

export default GradeAndPromotion;