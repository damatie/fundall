import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  userName: {
    marginLeft: 8,
    alignSelf: 'center'
  },
  dFlex: {
    display: 'flex',
  },
  buttomMargin: {
    marginBottom: 16,
  },
}));

export default function UserAvatar(props) {
  const classes = useStyles();

  // const relatedPostTags = props.tag.map((tag, i) => <Typography key={i} variant='caption'>#{tag}</Typography>);

  return (
    <div className={`${classes.dFlex} ${classes.buttomMargin}`}>
      <Avatar>MN</Avatar>
      <div className={classes.userName}>
        {props.fullName && <Typography varaint="body1" >{props.fullName}</Typography>}
        {props.userName && <Typography varaint="caption">{`@${props.userName}`}</Typography>}
        {props.title && <Typography varaint="caption">{props.title}</Typography>}
        {/* {(props.tag.length > 0) && relatedPostTags} */}
      </div>
    </div>
  )
}
