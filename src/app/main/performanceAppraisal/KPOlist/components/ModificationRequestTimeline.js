import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GreyCircle from '../../../../../assets/icons/greyCircle.svg';
import BlueCircle from '../../../../../assets/icons/blueCircle.svg';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	modificationRequestTimelineDiv: {
		borderLeft: '2px solid #666666',
		margin: '7% 0 0 3%',

		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem'
		}
	},
	mRTHeaderDiv: {
		backgroundColor: '#F6F6F6',
		display: 'flex',
		justifyContent: 'space-evenly',
		height: 50,
		borderRadius: 5,
		width: '90%',
		alignItems: 'center',
		margin: '5% auto 5% auto',
		backgroundColor: '#F6F6F6'
	},
	mRTHeaderDivSpan: {
		color: '#8D8D8D',
		display: 'inline-block'
	},
	mRTRequestDay: {
		display: 'flex',
		flexDirection: 'column'
	},
	mtRequestDivP: {
		position: 'relative'
	},
	mRTRequestDiv: {
		display: 'flex',
		justifyContent: 'space-evenly',
		width: '90%',
		margin: '5% auto 6% auto',
		position: 'relative',

		'& p': {
			color: '#121212',
			fontWeight: 600
		}
	},
	blueCircle: {
		position: 'absolute',
		left: '-0.5%',
		top: '39%'
	},
	greyCircle: {
		position: 'absolute',
		left: '-6.3%',
		top: '9%'
	},
	mainDate: {
		marginLeft: '2%',
		color: '#121212',
		fontSize: 18
	},
	modificationDate: {
		width: '20%'
	},
	approvedBy: {
		width: '20%'
	},
	updateSummary: {
		width: '30%'
	},
	lineManager: {
		width: '20%'
	},
	requestSubTime: {
		color: '#1C96F9'
	},
	doneBtn: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '10%'
	}
}));

const ModificationRequestTimeline = () => {
	const classes = useStyles();

	const modificationRequest = [
		{
			id: '1',
			day: {
				mainDate: '21, Thursday, May 2021',
				requests: [
					{
						id: '121T',
						subDate: '26-06-2021',
						subTime: '9:00am',
						approvedBy: 'Thomas Shelby',
						updateSummary:
							'I am dummy text, I am just made to fill this space for the time being, I am not an important',
						lineManager: 'Tommy Shelby'
					}
				]
			}
		},
		{
			id: '2',
			day: {
				mainDate: '19, Tuesday, May 2021',
				requests: [
					{
						id: '219T',
						subDate: '26-06-2021',
						subTime: '5:50pm',
						approvedBy: 'Thomas Shelby',
						updateSummary:
							'I am dummy text, I am just made to fill this space for the time being, I am not an important',
						lineManager: 'Tommy Shelby'
					},
					{
						id: '219T',
						subDate: '24-06-2021',
						subTime: '2:30pm',
						approvedBy: 'Jane Doe',
						updateSummary:
							'I am dummy text, I am just made to fill this space for the time being, I am not an important',
						lineManager: 'Arima Kousei'
					}
				]
			}
		}
	];

	return (
		<>
			<div className={` ${classes.modificationRequestTimelineDiv}`}>
				<div className={` ${classes.mRTHeaderDiv}`}>
					<span className={` ${classes.mRTHeaderDivSpan} ${classes.modificationDate}`}>Modification Date</span>
					<span className={` ${classes.mRTHeaderDivSpan} ${classes.approvedBy}`}>Approved By</span>
					<span className={` ${classes.mRTHeaderDivSpan} ${classes.updateSummary}`}>Update Summary</span>
					<span className={` ${classes.mRTHeaderDivSpan} ${classes.lineManager}`}>Line Manager</span>
				</div>
				{modificationRequest.map(dailyRequest => (
					<div key={dailyRequest.id} className={` ${classes.mRTRequestDay}`}>
						<p className={` ${classes.mtRequestDivP}`}>
							<img src={BlueCircle} alt="blue circle" className={` ${classes.blueCircle}`} />
							<span className={` ${classes.mainDate}`}>{dailyRequest.day.mainDate}</span>
						</p>
						{dailyRequest.day.requests.map(request => (
							<div key={request.id} className={` ${classes.mRTRequestDiv}`}>
								<img src={GreyCircle} alt="grey circle" className={` ${classes.greyCircle}`} />
								<p className={` ${classes.modificationDate}`}>
									{request.subDate} <span className={` ${classes.requestSubTime}`}>{request.subTime}</span>
								</p>
								<p className={` ${classes.approvedBy}`}>{request.approvedBy}</p>
								<p className={` ${classes.updateSummary}`}>{request.updateSummary}</p>
								<p className={` ${classes.lineManager}`}>{request.lineManager}</p>
							</div>
						))}
					</div>
				))}
			</div>
			<div className={` ${classes.doneBtn}`}>
				<Button variant="contained" color="primary">
					DONE
				</Button>
			</div>
		</>
	);
};

export default ModificationRequestTimeline;
