import React from 'react';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import UserAvatar from './userAvatar';

export default function SectionHeader(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const moreContent = props.buttonContent.map(item => {
    return <Button key={item} component={Link} to={`/blog/update_blog/${props.id}`}>{item}</Button>
  });

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <UserAvatar fullName={props.fullName} time={props.updatedAt} />
      <IconButton aria-describedby={id} aria-label="like" component="span" onClick={handleClick}>
        <MoreHorizIcon fontSize="small" />
      </IconButton>
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
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
          {moreContent}
        </div>
      </Popover>
    </div>
  )
}
