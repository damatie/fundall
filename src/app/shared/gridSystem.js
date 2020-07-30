import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 30,
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridGap: 0,
      padding: '.5rem'
    }
  }
}));

const GridSystem = props => {
  const classes = useStyles();
  return (
    <div className={classes.grid}>
    {props.children}
    </div>
  );
};

export default GridSystem;