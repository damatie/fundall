import SharedModal from 'app/shared/modal/SharedModal';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import CustomIconButton from 'app/shared/button/CustomIconButton';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import KpoStatus from './KpoStatus';

const KpoRequestModal = ({ customHook }) => {
  const { open, handleClose, handleReq } = customHook;

  const kpoDetails = useSelector(state => state.kpo.kpoReview.details)
  return (
    <SharedModal
      open={open}
      handleClose={handleClose}
      title='KPO Creation Request Info'
    >
      <Grid container spacing={1} className='w-full'>
        <Grid item lg={12} sm={12}>
          <Typography
            className='my-16'
            variant="subtitle1"
            color="initial"
          >
            <strong>
              Employee Name:
            </strong>
            &nbsp;{`${kpoDetails.employee?.firstName} ${kpoDetails.employee?.lastName}`}
          </Typography>

          <Typography
            className='my-16'
            variant="subtitle1"
            color="initial"
          >
            <strong>
              Entity:
            </strong>
            &nbsp;{`${kpoDetails?.entity?.entityName}`}
          </Typography>

          <Typography
            className='my-16'
            variant="subtitle1"
            color="initial"
          >
            <strong>
              Department:
            </strong>
            &nbsp;{`${kpoDetails?.department?.departmentName}`}
          </Typography>

          <Typography
            className='my-16'
            variant="subtitle1"
            color="initial"
          >
            <strong>
              Job Title:
            </strong>
            &nbsp;{`${kpoDetails.jobTitle?.name}`}
          </Typography>

          <Typography
            className='my-16'
            variant="subtitle1"
            color="initial"
          >
            <strong>
              Status:
            </strong>
            &nbsp;{(<KpoStatus status={kpoDetails?.status} />)}
          </Typography>

          <Typography
            className='my-16'
            variant="subtitle1"
            color="initial"
          >
            <strong>
              KPO Year:
            </strong>
            &nbsp;{kpoDetails.kpoYear}
          </Typography>

          <Typography
            className='my-16'
            variant="subtitle1"
            color="initial"
          >
            <strong>
              Line Manager:
            </strong>
            &nbsp;{`${kpoDetails.lineManager?.firstName} ${kpoDetails.lineManager?.lastName}`}
          </Typography>

          <Typography
            className='my-16'
            variant="subtitle1"
            color="initial"
          >
            <strong>
              Reviewing Manager:
            </strong>
            &nbsp;{`${kpoDetails.reviewingManager?.firstName} ${kpoDetails.reviewingManager?.lastName}`}
          </Typography>


        </Grid>
        <Grid item lg={6} md={6} md={6} sm={12} xs={12}>
          <CustomIconButton
            type='success'
            icon='check'
            className='w-full'
            onClick={handleReq('approve')}
          >
            Approve
          </CustomIconButton>
        </Grid>
        <Grid item lg={6} md={6} md={6} sm={12} xs={12}>
          <CustomIconButton
            type='error'
            icon='delete'
            className='w-full'
            onClick={handleReq('reject')}
          >
            Reject
          </CustomIconButton>
        </Grid>
      </Grid>
    </SharedModal>
  );
};

export default KpoRequestModal;