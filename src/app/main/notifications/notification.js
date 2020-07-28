import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '.7rem',
    margin: '1.2rem 0',
    '& h6': {
      fontSize: 15
    },
    '& p': {
      textAlign: 'justify'
    }
  },
  avatar: {
		width: 45,
		height: 45,
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		'& > img': {
			borderRadius: '50%'
		}
	}
}))


const Notifications = props => {
  const classes = useStyles();
  return (
    <List button>
    <div className={classes.root}>
      <ListItem button>
        <Grid container spacing={1}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <Grid container spacing={1}>
              <Grid item lg={3} sm={3} md={3} xs={3}>
                <Avatar
                  className={classes.avatar}
                  alt="user photo"
                  src={'assets/images/avatars/Velazquez.jpg'}
                />
              </Grid>
              <Grid item lg={9} sm={9} md={9} xs={9}>
                <Grid container spacing={1}>
                  <Grid item lg={12} sm={12} md={12} xs={12}>
                    <Typography variant="h6" color="initial">{props.data.title}</Typography>
                  </Grid>
                  <Grid item lg={12} sm={12} md={12} xs={12}>
                    <Typography variant="body1" color="initial">{props.data.body}</Typography>
                  </Grid>
                  <Grid item lg={12} sm={12} md={12} xs={12}>
                  <Typography variant="subtitle1" color="initial">{moment(props.data.createdAt).fromNow()}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    </div>
    <Divider />
    </List>
  );
};

export default Notifications;