import React, { useEffect, useState } from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useSelector, useDispatch } from 'react-redux';
import * as  Actions from 'app/store/actions';
import { useAuth } from 'app/hooks/useAuth';
import { useParams } from 'react-router';

const ProfilePicture = () => {
  const picture = useSelector(({ profile }) => profile.data);
  const employeePic = useSelector(({ employeesDetails }) => employeesDetails);

  const [profile, setProfile] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if(id) {
      setProfile(employeePic.employee.info.profilePicture);
    } else {
      setProfile(picture.profilePicture);
    }
  }, []);

  return (
    <Badge
    overlap="circle"
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    badgeContent={!id ? <UploadBtn /> : <></>}
    >
      <Avatar className="w-96 h-96" alt="Travis Howard" src={profile} />
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