import axios from 'axios';
import { useAuth } from 'app/hooks/useAuth';

export const GET_LEAVE_OPTIONS = 'GET LEAVE OPTIONS';
export const SET_LEAVE_OPTIONS_SEARCH_TEXT = 'SET LEAVE OPTIONS SEARCH TEXT';

export function getLeaveOptions() {
  const leave = [
    {  
      businessUnit:"c-bit",
      calendarStartMonth:"june",
      halfDayRequests:true,
      skipHolidays:false,
      description:"work leave",
      department:"c-bit",
      workingHours:"9-5",
      allowLeaveTransfer:true,
      hrManager:"jane doe",
      selectWeekendStartDay:"friday",
      selectWeekendEndDay:"sunday"
    },
    {  
      businessUnit:"5cee",
      calendarStartMonth:"june",
      halfDayRequests:true,
      skipHolidays:true,
      description:"work leave",
      department:"c-bit",
      workingHours:"9-5",
      allowLeaveTransfer:false,
      hrManager:"jane doe",
      selectWeekendStartDay:"friday",
      selectWeekendEndDay:"sunday"
    },
    {  
      businessUnit:"Spring rock",
      calendarStartMonth:"may",
      halfDayRequests:false,
      skipHolidays:true,
      description:"work leave",
      department:"c-bit",
      workingHours:"9-5",
      allowLeaveTransfer:true,
      hrManager:"jane doe",
      selectWeekendStartDay:"friday",
      selectWeekendEndDay:"sunday"
    },
  ];

  console.log(leave)

	return dispatch => {
      // const request = axios.get('https://hris-cbit.herokuapp.com/api/v1/leave/manage', {
      //   headers: {
      //     Authorization: `JWT ${useAuth().getToken}`
      //   }
      // });
      // request.then(res => {
        dispatch({
          type: GET_LEAVE_OPTIONS,
          payload: leave
        })
      // })
  }
}

export function setLeaveOptionsSearchText(event) {
	return {
		type: SET_LEAVE_OPTIONS_SEARCH_TEXT,
		searchText: event.target.value
	};
}