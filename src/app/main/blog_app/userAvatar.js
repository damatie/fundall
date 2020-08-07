import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import LensIcon from '@material-ui/icons/Lens';
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
    <div>
      <div className={classes.root}>
        <Avatar className={classes.avatar} src={!props.src ? userAvatar : props.src}></Avatar>
        <div className={classes.userName}>
          {props.fullName && <Typography variant="body1" className={classes.name}>
            {props.fullName}
          </Typography>}
          {props.fullName && <LensIcon style={{ fontSize: 4, marginRight: 8 }} />}
        {props.time && <Typography variant="caption" component="span" style={{color: 'grey', fontSize: 14}}>
          {timeAgo.fromNow()}
        </Typography>}
        {props.email && <Typography variant="caption" component="h5" style={{color: 'grey', fontSize: 14}}>
          {props.email}
        </Typography>}
        {props.title && <Typography variant="caption">{props.title}</Typography>}
          {/* {(props.tag.length > 0) && relatedPostTags} */}
        </div>
      </div>
    </div>
    
  )
}
