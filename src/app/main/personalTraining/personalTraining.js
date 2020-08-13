import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import PersonalTrainingCalendar from './personalTrainingCalendar';
import EventDialog from './EventDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import CardWidget from 'app/shared/widgets/CardWidget';
import TableWidget from 'app/shared/widgets/TableWidget';

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

const allViews = Object.keys(Views).map(k => Views[k]);

const columns = [
    {
        id: 'name',
        align: 'center',
        disablePadding: false,
        label: 'Name',
        sort: true
    },
    {
        id: 'type',
        align: 'center',
        disablePadding: false,
        label: 'Type',
        sort: true
    },
    {
        id: 'owner',
        align: 'center',
        disablePadding: false,
        label: 'Owner',
        sort: true
    },
    {
        id: 'category',
        align: 'center',
        disablePadding: false,
        label: 'Category',
        sort: true
    },
    {
        id: 'modified',
        align: 'center',
        disablePadding: false,
        label: 'Modified',
        sort: true
    },
    {
        id: 'status',
        align: 'center',
        disablePadding: false,
        label: 'Status',
        sort: true
    }
];

function PersonalTraining(props) {
	const dispatch = useDispatch();
	const events = useSelector(({ personalTraining }) => personalTraining.events.entities);
	const trainings = useSelector(({ personalTraining }) => personalTraining.trainings.trainings);

	const headerEl = useRef(null);

	useEffect(() => {
		dispatch(Actions.getEvents());
	}, [dispatch]);

	function moveEvent({ event, start, end }) {
		dispatch(
			Actions.updateEvent({
				...event,
				start,
				end
			})
		);
	}

	function resizeEvent({ event, start, end }) {
		delete event.type;
		dispatch(
			Actions.updateEvent({
				...event,
				start,
				end
			})
		);
	}

	return (
        <div className="p-12">
            <FuseAnimateGroup
                className="flex flex-wrap"
                enter={{
                    animation: 'transition.slideUpBigIn'
                }}
            >
                <div className="widget flex w-full sm:w-1/2 md:w-1/6 p-12">
                    <CardWidget count={trainings.length} title={"Total"} color="yellow" />
                </div>
                <div className="widget flex w-full sm:w-1/2 md:w-1/6 p-12">
                    <CardWidget count={trainings.filter(t => t.status==='pending').length} title={"Pending"} color="blue" />
                </div>
                <div className="widget flex w-full sm:w-1/2 md:w-1/6 p-12">
                    <CardWidget count={trainings.filter(t => t.status==='approved').length} title={"Approved"} color="green" />
                </div>
                <div className="widget flex w-full sm:w-1/2 md:w-1/6 p-12">
                    <CardWidget count={trainings.filter(t => t.status==='rejected').length} title={"Rejected"} color="red" />
                </div>
                <div className="widget flex w-full sm:w-1/2 md:w-1/6 p-12">
                    <CardWidget count={trainings.filter(t => t.status==='reviewed').length} title={"Reviewed"} color="orange" />
                </div>
                <div className="widget flex w-full sm:w-1/2 md:w-1/6 p-12">
                    <CardWidget count={trainings.filter(t => t.status==='completed').length} title={"Completed"} color="black" />
                </div>
                <div className="widget flex w-full p-12">
                    <PersonalTrainingCalendar/>
                </div>
            </FuseAnimateGroup>
        </div>
	);
}

export default withReducer('personalTraining', reducer)(PersonalTraining);

/*
IE 11 Fix
*/
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = s => {
		let el = this;

		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}
