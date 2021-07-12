import React from "react";
import usePusher from "../../hooks/usePusher";
import Pusher from "pusher-js";
import {getUserMenu} from "../../auth/store/actions/index";
import { useSelector, useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from 'app/store/reducers/fuse';

const Permission = (props) => {
    const dispatch = useDispatch();
    const {
      id,
      token,
      userProfile
    } = props;
    // Use the pusher hook to get the pusher instance from context
    // const pusher = usePusher();
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = false;

    // Set up pusher instance with main channel subscription
    // Be able to subscribe to the same channel in another component
    // with separate callback but utilizing the existing connection
    const pusher = new Pusher("b658eb1398cb885b506c", {
      cluster: "eu",
      encrypted: true,
      forceTLS: true
    });
  
    // Set up the side effect, each time a message comes in
    // on the child-channel with an event type 'child-event',
    // add the payload to the messages array
    React.useEffect(() => {
      function childEventCallback(data) {
        // console.log(data);
        if(userProfile?.companyId === data?.companyId && userProfile?.roleId === data?.roleId){
          dispatch(getUserMenu({ id, token }));
          // console.log("ID EQUALS");
        }
      }
  
      const channel = pusher.subscribe("PERMISSION");
      channel.bind("PERMISSIONUPDATED", childEventCallback);
  
      return () => {
        channel.unbind("PERMISSIONUPDATED", childEventCallback);
      };
    }, [dispatch, pusher]);
  
    // Render the messages down below
    return (
      // {children}
      <>
      </>
    );
  }
  
  withReducer('permission', reducer)(Permission);
  export default Permission;