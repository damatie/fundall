import { getBaseUrl } from 'app/shared/getBaseUrl';
import swal from 'sweetalert2';
import moment from 'moment';
import {fetchHeaders} from 'app/shared/fetchHeaders'
import { amber, blue, blueGrey, lightGreen, green, grey, red } from '@material-ui/core/colors';

export const LOADING_TRAININGS = 'LOADING TRAININGS';
export const GET_TRAININGS = 'GET TRAININGS';

const basUrl = getBaseUrl;
const headers = fetchHeaders();
export function getAllTrainings() {
	let trainings = [];
	let events = [];
	let event = {};
	return dispatch => {
		dispatch({
			type: LOADING_TRAININGS
		});
		fetch(`${basUrl()}/training/all/employee/request`, {...headers.getRegHeader()})
		.then(res => res.json()).then(async data => {
			console.log(data.data);
			if(data.data){
				trainings = data.data.map(d => { return d.training; })
				if(trainings){
					trainings.forEach(t => {
						event.id= (t.id) ? t.id : 1;
						event.title = t.trainingCourse.name;
						event.allDay = false;
						let start = t.startDate.split('-');
						let end = t.endDate.split('-');
						event.start = new Date(start[2], start[1], start[0], 0, 0, 0);
						event.end = new Date(end[2], end[1], end[0], 0, 0, 0);
						event.course = t.trainingCourse;
						event.color = (t.status === 'pending') ? blue[500] : (t.status === 'approved') ? lightGreen[500] : (t.status === 'rejected') ? red[500] : (t.status === 'completed') ? green[500] : amber[500]
						events.push(event);
					})
				}
			}
			console.log(events);
			data.success ? 
				(data.data) ?
					dispatch({
						type: GET_TRAININGS,
						payload: data.data,
						events: events,
						trainings: trainings
					})
				:
					dispatch({
						type: GET_TRAININGS,
						payload: [],
						events: [],
						trainings: []
					})
			:
				dispatch({
					type: GET_TRAININGS,
					payload: [],
					events: [],
					trainings: []
				})
		}).catch(err => {
			console.log(err);
			dispatch({
				type: GET_TRAININGS,
				payload: [],
				events: [],
				trainings: []
			})
		})
	}
}

