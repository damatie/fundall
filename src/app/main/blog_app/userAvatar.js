import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  userName: {
    alignSelf: 'center',
    marginLeft: 12,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 8,
    },
  },
  avatar: {
    alignSelf: 'center',
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  root: {
    display: 'flex',
    marginBottom: 16,
    color: '#4d5760',
  },
}));

export default function UserAvatar(props) {
  const classes = useStyles();

  // const timeInSeconds = props.time
  // const lastLoggedInTime = new Date(Date.now() - timeInSec * 1000);

  // const relatedPostTags = props.tag.map((tag, i) => <Typography key={i} variant='caption'>#{tag}</Typography>);

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>MN</Avatar>
      <div className={classes.userName}>
        {props.fullName && <Typography variant="body1" style={{fontWeight: 'bold'}} >{props.fullName}</Typography>}
        {props.time && <Typography variant="caption" >Jul 24 (20 hours ago)</Typography>}
        {props.userName && <Typography variant="caption">{`@${props.userName}`}</Typography>}
        {props.title && <Typography variant="caption">{props.title}</Typography>}
        {/* {(props.tag.length > 0) && relatedPostTags} */}
      </div>
    </div>
  )
}
