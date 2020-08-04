import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useSelector, useDispatch } from 'react-redux';
import * as  Actions from 'app/store/actions';
import { useAuth } from 'app/hooks/useAuth';

const ProfilePicture = () => {
  const profile = useSelector(({ profile }) => profile.data);
  return (
    <Badge
    overlap="circle"
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    badgeContent={<UploadBtn />}
    >
      <Avatar className="w-96 h-96" alt="Travis Howard" src={profile.profilePicture} />
    </Badge>
  );
};

const UploadBtn = () => {
  const dispatch = useDispatch();
  const id = useAuth().getId;

  const handleUpload = e => {
    dispatch(Actions.uploadImage(id, {profilePicture: e.target.files[0]}));
  }
  return (
    <>
      <input accept="image/*" style={{display: 'none'}} id="icon-button-file" type="file" onChange={handleUpload}/>
      <label htmlFor="icon-button-file">
        <IconButton color="secondary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </>
  )
}
export default ProfilePicture;