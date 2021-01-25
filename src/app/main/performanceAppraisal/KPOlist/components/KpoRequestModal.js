import SharedModal from 'app/shared/modal/SharedModal';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import CustomIconButton from 'app/shared/button/CustomIconButton';

const KpoRequestModal = ({customHook}) => {
  const { open, handleClose, handleReq } = customHook;
  return (
    <SharedModal
      open={open}
      handleClose={handleClose}
      title='KPO Creation Request Info'
    >
      <Grid container spacing={1} className='w-1/2'>
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