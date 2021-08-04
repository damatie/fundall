import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
	baTable: {
		width: '90%' /* ,
		marginBottom: '10%' */
	},
	largeTr: {
		width: '45%'
	},
	mediumTr: {
		width: '15%'
	},
	normalTr: {
		width: '12%'
	},
	smallTr: {
		width: '4%'
	},
	th: {
		fontSize: 13
	},
	td: {
		textAlign: 'center'
	},
	tbodyTd: {
		paddingTop: 3,
		paddingBottom: 50
	}
}));

const BehavioralAttributeTable = ({ tableData }) => {
	const classes = useStyles();
	const checkBoxState = {};

	tableData.forEach(td => {
		checkBoxState[td?.name + 'DevelopmentNeeded'] = false;
		checkBoxState[td?.name + 'Satisfactory'] = false;
		checkBoxState[td?.name + 'KeyStrength'] = false;
		checkBoxState[td?.name + 'Leader'] = false;
	});

	// console.log(checkBoxState);

	const [checkedInputBox, setCheckedInputBox] = useState(checkBoxState);

	const handleChange = e => {
		const { name, checked } = e.target;

		setCheckedInputBox({
			...checkedInputBox,
			[name]: checked
		});
	};

	useEffect(() => console.log(checkedInputBox, 'checked input box status'), [checkedInputBox]);

	return (
		<table className={` ${classes.baTable}`}>
			<thead>
				<tr>
					<th></th>
					<th className={` ${classes.th}`}>
						Development Needed <br /> 1
					</th>
					<th className={` ${classes.th}`}>
						Satisfactory <br /> 1.5
					</th>
					<th className={` ${classes.th}`}>
						Key Strength <br /> 2
					</th>
					<th className={` ${classes.th}`}>
						Leader <br /> 2.5
					</th>
					<th className={` ${classes.th}`}>
						Total <br /> Score
					</th>
				</tr>
			</thead>
			<tbody>
				{tableData.map(({ id, title, content, name }) => (
					<tr key={id}>
						<td className={` ${classes.largeTr} ${classes.tbodyTd}`}>
							<strong>{title}</strong> <br />
							{content}
						</td>
						<td className={` ${classes.td} ${classes.mediumTr} ${classes.tbodyTd}`}>
							<Checkbox
								checked={checkedInputBox.developmentNeeded}
								onChange={handleChange}
								inputProps={{ 'aria-label': 'primary checkbox' }}
								name={`${name}DevelopmentNeeded`}
							/>
						</td>
						<td className={` ${classes.td} ${classes.normalTr} ${classes.tbodyTd}`}>
							<Checkbox
								checked={checkedInputBox.satisfactory}
								onChange={handleChange}
								inputProps={{ 'aria-label': 'primary checkbox' }}
								name={`${name}Satisfactory`}
							/>
						</td>
						<td className={` ${classes.td} ${classes.normalTr} ${classes.tbodyTd}`}>
							<Checkbox
								checked={checkedInputBox.keyStrength}
								onChange={handleChange}
								inputProps={{ 'aria-label': 'primary checkbox' }}
								name={`${name}KeyStrength`}
							/>
						</td>
						<td className={` ${classes.td} ${classes.normalTr} ${classes.tbodyTd}`}>
							<Checkbox
								checked={checkedInputBox.leader}
								onChange={handleChange}
								inputProps={{ 'aria-label': 'primary checkbox' }}
								name={`${name}Leader`}
							/>
						</td>
						<td className={`${classes.tbodyTd}`}></td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default BehavioralAttributeTable;
