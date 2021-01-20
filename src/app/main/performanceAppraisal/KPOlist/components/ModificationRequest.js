import React from 'react';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import CustomIconButton from 'app/shared/button/CustomIconButton';

const ModificationRequest = ({ status, role, handleClick }) => {
  return (
    <section>
      <Typography variant="subtitle1" color="initial"><strong>KPO Request Status</strong>:&nbsp;{status}</Typography>
      <br />
      <section>
        {
          role === 'linemanager' ? (
            <>
              {
                status !== 'requested' && status !== 'approved' && (
                  <Button variant="contained" color="secondary" onClick={handleClick('request')}>
                    Request for Modification
                  </Button>
                )
              }
            </>
          ) : role === 'hrmanager' ? (
            <>
              {
                status === 'requested' && (
                  <Grid container spacing={1}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <CustomIconButton
                        icon='check'
                        onClick={handleClick('approve')}
                        type='success'
                        className='w-full'
                      >
                        Approve
                      </CustomIconButton>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <CustomIconButton
                        icon='delete'
                        onClick={handleClick('reject')}
                        type='error'
                        className='w-full'
                      >
                        Reject
                      </CustomIconButton>
                    </Grid>
                  </Grid>
                )
              }
            </>
          ) : <></>
        }

      </section>
    </section>
  );
};

export default ModificationRequest;