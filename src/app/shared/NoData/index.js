import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import noData from 'assets/icons/noData.svg';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    height: 500,
    width: '100%',
    position: 'relative',
    '& > section': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  }
}));

export const NoData = ({title}) => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <section>
        <img src={noData} alt='no_data' />
        <Typography variant="body1" color="initial" className="my-4 text-center">
          {`No ${title}`}
        </Typography>
      </section>
    </section>
  )
}