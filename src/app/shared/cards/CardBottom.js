import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  firstText: {
    color: props => props.firstText?.color,
  },
  secondText: {
    color: props => props.secondText?.color,
  }
}))

const CardBottom = ({ firstText, secondText }) => {


  const classes = useStyles({ firstText, secondText });
  return (
    <div className="flex items-center p-8 border-t-1 absolute bottom-0 w-full">

      <div className="flex flex-1 flex-col items-center justify-center p-16">
        <Typography className={`${classes.firstText} text-32 leading-none`}>{firstText?.count}</Typography>
        <Typography className={`${classes.firstTex} text-15 font-semibold`} color="textSecondary">
          {firstText?.title}
        </Typography>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center p-16 border-r-1">
        <Typography className={`${classes.secondText} text-32 leading-none`}>{secondText?.count}</Typography>
        <Typography className={`${classes.secondTex} text-15 font-semibold`} color="textSecondary">
          {secondText?.title}
        </Typography>
      </div>
    </div>
  );
};

export default CardBottom;