import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextSummaryPerformanceReview from './TextSummaryPerformanceReview';

const useStyles = makeStyles(theme => ({
	summaryOfPerformanceReview: {
		display: 'flex',
		marginTop: '8%',
		marginLeft: '15%',
		flexDirection: 'column'
	},
	performanceReviewLabelDiv: {
		display: 'flex',
		color: '#AAAAAA',

		'& span': {
			display: 'inline-block',
			marginRight: '2%'
		}
	},
	checkBoxComponent: {
		marginBottom: '5%'
	},
	checkBoxDivOuter: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '70%',
		marginTop: '4%',
		marginBottom: '3%'
	},
	checkBoxDiv: {
		display: 'flex',
		flexDirection: 'column'
	},
	checkBoxLabel: {
		fontSize: 12,
		// color: '#AAAAAA'
		color: '#747474'
	}
}));

const CheckBoxSummaryPerformanceReview = ({ index, inputLabel, checkBoxArr }) => {
	const classes = useStyles();
	const checkBoxState = {};

	checkBoxArr.forEach(checkBox => {
		checkBoxState[checkBox?.name] = false;
		checkBoxState[checkBox?.name] = false;
		checkBoxState[checkBox?.name] = false;
		checkBoxState[checkBox?.name] = false;
	});

	const [checkedInputBox, setCheckedInputBox] = useState(checkBoxState);

	const handleChange = e => {
		const { name, checked } = e.target;

		setCheckedInputBox({
			...checkedInputBox,
			[name]: checked
		});
	};

	return (
		<div className={` ${classes.checkBoxComponent}`}>
			<div className={` ${classes.performanceReviewLabelDiv}`}>
				<span>{index}.</span>
				<span>{inputLabel}</span>
			</div>
			<div className={` ${classes.checkBoxDivOuter}`}>
				{checkBoxArr.map(({ id, name, value, label }) => (
					<div className={` ${classes.checkBoxDiv}`} key={id}>
						<Checkbox checked={checkedInputBox[name]} onChange={handleChange} color="#747474" name={name} id={label} />
						<label className={` ${classes.checkBoxLabel}`} htmlFor={label}>
							{label}
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

const SummaryOfPerformanceReview = () => {
	const classes = useStyles();

	const summaryOfPerformanceReview = [
		{
			id: 1,
			title: 'What are the key strengths identified that the employee has?',
			inputType: 'text',
			value:
				'This is the place holder for Q1 comment, here you acan write your review, which must have been discussed by the employee and his/her Line Manager outsite the webapp.This is the place holder for Q1 comment, here you acan write your review, which must have been discussed'
		},
		{
			id: 2,
			title: 'What are the key performance improvement areas/responsibilities?',
			inputType: 'text',
			value:
				'This is the place holder for Q1 comment, here you acan write your review, which must have been discussed by the employee and his/her Line Manager outsite the webapp.This is the place holder for Q1 comment, here you acan write your review, which must have been discussed '
		},
		{
			id: 3,
			title: 'Personnel Overall Rating',
			inputType: 'checkbox',
			checkBoxArr: [
				{
					id: '3a',
					name: 'belowExpectation',
					label: 'Below Expectation',
					value: false
				},
				{
					id: '3b',
					name: 'meetsExpectation',
					label: 'Meets Expectation',
					value: false
				},
				{
					id: '3c',
					name: 'aboveExpectation',
					label: 'Above Expectation',
					value: false
				},
				{
					id: '3d',
					name: 'outstanding',
					label: 'Outstanding',
					value: false
				}
			]
		},
		{
			id: 4,
			title: "Manager's Comments",
			inputType: 'text',
			value:
				'This is the place holder for Q1 comment, here you acan write your review, which must have been discussed by the employee and his/her Line Manager outsite the webapp.This is the place holder for Q1 comment, here you acan write your review, which must have been discussed '
		},
		{
			id: 5,
			title: "Reviewing Manager's Comments",
			inputType: 'text',
			value:
				'This is the place holder for Q1 comment, here you acan write your review, which must have been discussed by the employee and his/her Line Manager outsite the webapp.This is the place holder for Q1 comment, here you acan write your review, which must have been discussed '
		},
		{
			id: 6,
			title: 'Personnel Comments',
			inputType: 'text',
			value:
				'This is the place holder for Q1 comment, here you acan write your review, which must have been discussed by the employee and his/her Line Manager outsite the webapp.This is the place holder for Q1 comment, here you acan write your review, which must have been discussed '
		}
	];

	return (
		<div className={` ${classes.summaryOfPerformanceReview}`}>
			{summaryOfPerformanceReview.map(review =>
				review.inputType === 'text' ? (
					<TextSummaryPerformanceReview key={review.id} index={review.id} label={review.title} value={review.value} />
				) : (
					review.inputType === 'checkbox' && (
						<CheckBoxSummaryPerformanceReview
							key={review.id}
							index={review.id}
							inputLabel={review.title}
							checkBoxArr={review.checkBoxArr}
						/>
					)
				)
			)}
		</div>
	);
};

export default SummaryOfPerformanceReview;
