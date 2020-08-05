import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import moment from 'moment';

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
  },
  root: {
    display: 'flex',
    marginBottom: 16,
  },
  name: {
    display: 'inline-block',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
}));

export default function UserAvatar(props) {
  const classes = useStyles();
  const timeAgo = moment(props.time);

  const userAvatar = useSelector(state => state.auth.user.data.photoURL);

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar} src={userAvatar}></Avatar>
      <div className={classes.userName}>
        {props.fullName && <Typography variant="body1" className={classes.name}>
          {props.fullName}
        </Typography>}
        {props.time && <Typography variant="caption" component="span" style={{color: 'grey'}}>{timeAgo.fromNow()}</Typography>}
        {props.userName && <Typography variant="caption">{`@${props.userName}`}</Typography>}
        {props.title && <Typography variant="caption">{props.title}</Typography>}
        {/* {(props.tag.length > 0) && relatedPostTags} */}
      </div>
    </div>
  )
}
