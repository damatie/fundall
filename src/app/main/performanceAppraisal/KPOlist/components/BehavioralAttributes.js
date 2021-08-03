import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import BehaviouralAttribute from './BehaviouralAttribute';
import BehavioralAttribute from './BehavioralAttribute';

const useStyles = makeStyles(theme => ({
	behavioralAttributesDiv: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '8%',
		marginLeft: '15%'
	}
}));

const BehavioralAttributes = () => {
	const classes = useStyles();

	const behavioralAttributes = [
		{
			id: 1,
			label: 'Commitment and Leadership',
			type: 'cal',
			tableData: [
				{
					id: '1cal',
					title: 'Service Focus',
					content: 'Dedication to external and internal customer service and to exceeding customer expectations.',
					name: 'communityAndLeadership'
				},
				{
					id: '2cal',
					title: 'Continous Improvement',
					content: 'Utilizes every opportunity to improve performance and maximize value.',
					name: 'continousImprovement'
				},
				{
					id: '3cal',
					title: 'Self-Development',
					content:
						'Motivated to acquire the knowledge and skills you require for your job and maintain your personal development.',
					name: 'selfDevelopment'
				}
			]
		},
		{
			id: 2,
			label: 'Integrity',
			type: 'itgy'
		},
		{
			id: 3,
			label: 'Teamwork',
			type: 'twrk'
		},
		{
			id: 4,
			label: 'Personal Drive',
			type: 'pd'
		}
	];

	return (
		<div className={` ${classes.behavioralAttributesDiv}`}>
			{behavioralAttributes.map(ba => (
				<BehavioralAttribute key={ba.id} {...ba} />
			))}
		</div>
	);
};

export default BehavioralAttributes;
