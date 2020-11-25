import { showMessage } from 'app/store/actions';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

// check if a user can apply or review personal loan || salary advance loan
const usePermission = () => {
  const { pathname } = useLocation();
  const [link, setLink] = useState(pathname);

  const profile = useSelector(({ profile }) => profile.data);
  const dispatch = useDispatch();
  const history = useHistory();

  // check if user profile is completed
  useEffect(() => {
    if(profile.info) {
      history.push(link);
    }else {
      // dispatch(
      //   showMessage({
      //     message     : 'Please complete your profile to continue',//text or html
      //     autoHideDuration: 3000,//ms
      //     anchorOrigin: {
      //         vertical  : 'top',//top bottom
      //         horizontal: 'center'//left center right
      //     },
      //     variant: 'info'//success error info warning null
      //   })
      // );
      // if(link !== pathname) {
      //   setTimeout(() => history.push('/employee/profile'), 500)
      // }
      history.push(link);
    }
  }, [profile, link]);

  // assign a new path name to the link state
  const handleClick = (n) => {
    setLink(n);
  }

  return { handleClick };
};

export default usePermission;