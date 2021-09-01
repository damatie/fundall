import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextSummaryPerformanceReview from './TextSummaryPerformanceReview';
import TextField from '@material-ui/core/TextField';
import signature1 from '../../../../../assets/images/signature1.svg';
import signature2 from '../../../../../assets/images/signature2.svg';
import signature3 from '../../../../../assets/images/signature3.svg';

const useStyles = makeStyles(theme => ({
	personalDevelopmentalNeeds: {
		display: 'flex',
		marginTop: '8%',
		marginLeft: '15%',
		flexDirection: 'column'
	},
	signatureDivOuter: {
		width: '90%'
	},
	signatureDiv: {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: '4%',
		marginBottom: '5%'
	},
	signature: {
		width: '30%'
	},
	signatureImage: {
		display: 'flex',
		alignItems: 'center',

		'& span': {
			display: 'inline-block',
			color: '#000000',
			fontWeight: 600,
			marginRight: '3%'
		},

		'& img': {
			width: '30%'
		}
	}
}));

const Signature = ({ role, name, signature, date }) => {
	const classes = useStyles();

	return (
		<div className={` ${classes.signatureDiv}`}>
			<TextField
				label={role}
				defaultValue={name}
				variant="outlined"
				InputProps={{
					readOnly: true
				}}
				className={` ${classes.signature}`}
			/>
			<TextField
				label="Date"
				defaultValue={date}
				variant="outlined"
				InputProps={{
					readOnly: true
				}}
				className={` ${classes.signature}`}
			/>
			<div className={` ${classes.signature} ${classes.signatureImage}`}>
				<span>Signature:</span>
				<img src={signature} alt="signature" />
			</div>
		</div>
	);
};

const PersonalDevelopmentalNeeds = () => {
	const classes = useStyles();

	const personalDevelopmentalNeeds = [
		{
			id: 1,
			title: 'Personal Development Needs',
			content:
				'This is the place holder for Q1 comment, here you acan write your review, which must have been discussed by the employee and his/her Line Manager outsite the webapp.This is the place holder for Q1 comment, here you acan write your review, which must have been discussed '
		},
		{
			id: 2,
			title: 'Actions Required',
			content:
				'This is the place holder for Q1 comment, here you acan write your review, which must have been discussed by the employee and his/her Line Manager outsite the webapp.This is the place holder for Q1 comment, here you acan write your review, which must have been discussed '
		},
		{
			id: 3,
			title: 'Personal Development Needs',
			content:
				'This is the place holder for Q1 comment, here you acan write your review, which must have been discussed by the employee and his/her Line Manager outsite the webapp.This is the place holder for Q1 comment, here you acan write your review, which must have been discussed '
		},
		{
			id: 4,
			title: 'Actions Required',
			content:
				'This is the place holder for Q1 comment, here you acan write your review, which must have been discussed by the employee and his/her Line Manager outsite the webapp.This is the place holder for Q1 comment, here you acan write your review, which must have been discussed '
		}
	];

	const signatures = [
		{
			id: 1,
			role: 'Line Manager',
			name: 'Engr. Kalu Eme Eke',
			signature: signature1,
			date: '20-03-2021'
		},
		{
			id: 2,
			role: 'Reviewing Manager',
			name: 'Engr. Kalu Eme Eke',
			signature: signature2,
			date: '02-09-2021'
		},
		{
			id: 3,
			role: 'HR Peronnel',
			name: 'Engr. Kalu Eme Eke',
			signature: signature3,
			date: '19-01-2021'
		}
	];

	return (
		<div className={` ${classes.personalDevelopmentalNeeds}`}>
			<div>
				{personalDevelopmentalNeeds.map(({ id, title, content }) => (
					<TextSummaryPerformanceReview key={id} label={title} value={content} />
				))}
			</div>
			<div className={` ${classes.signatureDivOuter}`}>
				{signatures.map(({ id, role, name, signature, date }) => (
					<Signature key={id} role={role} name={name} signature={signature} date={date} />
				))}
			</div>
		</div>
	);
};

export default PersonalDevelopmentalNeeds;
