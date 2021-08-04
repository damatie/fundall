import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import BehavioralAttributeTable from './BehavioralAttributeTable';
import AppraisalScoreInputDiv from './AppraisalScoreInputDiv';

const useStyles = makeStyles(theme => ({
	behavioralAttribute: {
		marginBottom: '6%',
		width: '30%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		// borderBottom: '1px solid #62DAFC',
		paddingBottom: 15,
		position: 'relative',

		'&::after': {
			content: "''",
			borderBottom: '1px solid #62DAFC',
			display: 'block',
			position: 'absolute',
			width: '114%',
			left: '-7%',
			bottom: 0
		},

		'&:last-child': {
			marginBottom: 0
		}
	},
	behavioralAttributeClicked: {
		padding: '10px 0',

		'&::after': {
			backgroundColor: '#62dafc',
			height: '100%',
			zIndex: '-3',
			borderRadius: 5
		}
	},
	playArrowIcon: {
		cursor: 'pointer',
		marginLeft: '3%'
	},
	playArrowIconDown: {
		transform: 'rotate(90deg)'
	},
	baSpan: {
		fontWeight: 700,
		fontSize: 14
	},
	noTableData: {
		display: 'flex',
		justifyContent: 'center',
		fontWeight: 800
	}
}));

const BehavioralAttribute = ({ label, tableData }) => {
	const classes = useStyles();
	const [showTable, setShowTable] = useState(false);

	const toggleTable = () => {
		setShowTable(!showTable);
	};

	useEffect(() => {
		if (showTable) {
			localStorage.setItem('overAllPerformanceScore', JSON.stringify(true));
		} else {
			localStorage.setItem('overAllPerformanceScore', JSON.stringify(false));
		}
	}, [showTable]);

	return (
		<Fragment>
			<div className={` ${classes.behavioralAttribute} ${showTable && classes.behavioralAttributeClicked}`}>
				<span className={` ${classes.baSpan}`}>{label}</span>
				<span onClick={toggleTable}>
					<PlayArrowRoundedIcon className={` ${classes.playArrowIcon} ${showTable && classes.playArrowIconDown}`} />
				</span>
			</div>
			{showTable && (
				<>
					{tableData?.length > 0 ? (
						<>
							<BehavioralAttributeTable tableData={tableData} />
							<AppraisalScoreInputDiv
								spanText="Behavioral Factors and Performance Attributes Total Score"
								inputValue=""
								disabled={false}
							/>
						</>
					) : (
						<div className={` ${classes.noTableData}`}>No Data Here</div>
					)}
				</>
			)}
		</Fragment>
	);
};

export default BehavioralAttribute;
