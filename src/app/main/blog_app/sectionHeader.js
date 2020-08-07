import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import UserAvatar from './userAvatar';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  root: {display: 'flex', justifyContent: 'space-between'},
  menu: {display: 'flex', flexDirection: 'column', padding: 8},
  btn: {textTransform: 'none', justifyContent: 'flex-start', width: '100%'}
});

export default function SectionHeader(props) {
  const classes = useStyles();
  let location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
 
  const userId = useSelector(state => state.auth.user.id);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (item) => {
    props.onClick(item)
    handleClose(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const isBlogPoster = userId === props.blogPoster;

  const moreContent = props.buttonContent.map((item, index) => {
    if (index === 0 && location.pathname === '/blog/list') return <Button className={classes.btn} key={index} component={Link} to={`/blog/update_blog/${props.id}`}>{item}</Button>;
    else return <Button className={classes.btn} key={index} onClick={() => handleMenuClick(item)}>{item}</Button>;
  });

  return (
    <div className={classes.root}>
      <UserAvatar fullName={props.fullName} time={props.time} email={props.email} src={props.profilePicture} />
      <div style={{alignSelf: 'center'}}>
        {isBlogPoster &&
          <IconButton aria-describedby={id} aria-label="like" component="span" onClick={handleClick}>
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        }
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div className={classes.menu}>
            {moreContent}
          </div>
        </Popover>
      </div>
    </div>
  )
}
