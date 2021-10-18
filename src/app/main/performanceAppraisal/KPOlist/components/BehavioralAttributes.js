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
			type: 'itgy',
			tableData: [
				{
					id: '1itgy',
					title: 'Decision Making',
					content:
						'Make appreciate and timely choices for the company, our personnel, our customers and our stakeholders.',
					name: 'decisionMaking'
				},
				{
					id: '2itgy',
					title: 'Responsibility',
					content:
						'Take personal ownership and accountability for service outcome, HSE, work quality, ethics and sustainability.',
					name: 'responsibility'
				}
			]
		},
		{
			id: 3,
			label: 'Teamwork',
			type: 'twrk',
			tableData: [
				{
					id: '1twrk',
					title: 'Collaborating',
					content: 'Contribute to the team and encourage the contribution of others.',
					name: 'collaborating'
				},
				{
					id: '2twrk',
					title: 'Communicating',
					content: 'Convey messages and ideas effectively, timely, while actively listening and welcoming feedback.',
					name: 'communicating'
				},
				{
					id: '3twrk',
					title: 'Guiding, Coaching and Mentoring',
					content:
						'Nurture and inspire talent whenever the opportunity arises. Also creates opportunities for nurturing others.',
					name: 'guidingCoachingAndMentoring'
				},
				{
					id: '4twrk',
					title: 'Diversity',
					content: 'Understand and support diversity at nationality, culture, gender, and thought.',
					name: 'diversity'
				}
			]
		},
		{
			id: 4,
			label: 'Personal Drive',
			type: 'pd',
			tableData: [
				{
					id: '1pd',
					title: 'Results Focus',
					content: "Stay focused on your and company's priorities",
					name: 'resultsFocus'
				},
				{
					id: '2pd',
					title: 'Initiative and Creativity',
					content:
						'Be proactive and take action without being prompted. \n Seek innovative and new ways and ideas to have a positive impact.',
					name: 'initiativeAndCreativity'
				},
				{
					id: '3pd',
					title: 'Adaptability',
					content: 'Embrace change and is flexible to new approach and ideas.',
					name: 'adaptability'
				}
			]
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
