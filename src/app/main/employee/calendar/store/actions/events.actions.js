import axios from 'axios';
import {events} from './db';
import { fetchHeaders } from 'app/shared/fetchHeaders';
import { getBaseUrl } from 'app/shared/getBaseUrl';
import { handleResponse } from 'app/auth/handleRes';

export const GET_EVENTS = '[CALENDAR APP] GET EVENTS';
export const OPEN_NEW_EVENT_DIALOG = '[CALENDAR APP] OPEN NEW EVENT DIALOG';
export const CLOSE_NEW_EVENT_DIALOG = '[CALENDAR APP] CLOSE NEW EVENT DIALOG';
export const OPEN_EDIT_EVENT_DIALOG = '[CALENDAR APP] OPEN EDIT EVENT DIALOG';
export const CLOSE_EDIT_EVENT_DIALOG = '[CALENDAR APP] CLOSE EDIT EVENT DIALOG';
export const ADD_EVENT = '[CALENDAR APP] ADD EVENT';
export const UPDATE_EVENT = '[CALENDAR APP] UPDATE EVENT';
export const REMOVE_EVENT = '[CALENDAR APP] REMOVE EVENT';

const headers = fetchHeaders();

const dataFormat = (data) => {
	const arr = [];
	for(const i of data) {
		arr.push({
			...i,
			title: `${i.leaveType} Leave`,
			start: new Date(i.fromDate),
			end: new Date(i.toDate)
		});
	}
	return arr;
};

export function getEvents() {

	return dispatch => {
		const res = fetch(`${getBaseUrl()}/employee-leave/user`, {
			...headers.getRegHeader(),
		});
		res.then(res => handleResponse(res)).then(
			data => {
				dispatch({
					type: GET_EVENTS,
					payload: dataFormat(data.data)
				})
			}
		)
		
	}
}

export function openNewEventDialog(data) {
	return {
		type: OPEN_NEW_EVENT_DIALOG,
		data
	};
}

export function closeNewEventDialog() {
	return {
		type: CLOSE_NEW_EVENT_DIALOG
	};
}

export function openEditEventDialog(data) {
	return {
		type: OPEN_EDIT_EVENT_DIALOG,
		data
	};
}

export function closeEditEventDialog() {
	return {
		type: CLOSE_EDIT_EVENT_DIALOG
	};
}

export function addEvent(newEvent) {
	return (dispatch, getState) => {
		const request = axios.post('/api/calendar-app/add-event', {
			newEvent
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: ADD_EVENT
				})
			]).then(() => dispatch(getEvents()))
		);
	};
}

export function updateEvent(event) {
	return (dispatch, getState) => {
		const request = axios.post('/api/calendar-app/update-event', {
			event
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: UPDATE_EVENT
				})
			]).then(() => dispatch(getEvents()))
		);
	};
}

export function removeEvent(eventId) {
	return (dispatch, getState) => {
		const request = axios.post('/api/calendar-app/remove-event', {
			eventId
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: REMOVE_EVENT
				})
			]).then(() => dispatch(getEvents()))
		);
	};
}
