import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
			style={{ marginBottom: '5%' }}
		>
			{value === index && (
				<Box>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

// TabPanel.propTypes = {
// 	children: PropTypes.node,
// 	index: PropTypes.any.isRequired,
// 	value: PropTypes.any.isRequired
// };

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`
	};
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		width: '100%'
		// backgroundColor: theme.palette.background.paper
	},
	kpoDetailLabel: {
		fontWeight: 600,
		fontSize: 12,
		// lineHeight: 15,
		color: '#6F6F6F',

		[theme.breakpoints.down('xs')]: {
			fontSize: 10
		}
	},
	kpoDetailContent: {
		fontWeight: 600,
		fontSize: 14,
		// lineHeight: 20,
		textAlign: 'justify',
		color: '#242424',

		[theme.breakpoints.down('xs')]: {
			fontSize: 11
		}
	},
	kpoDetailFirstLabel: {
		margin: '3.5% 0 3% 0'
	},
	appBarStyle: {
		boxShadow: 'none !important'
	},
	tabStyle: {
		minWidth: 50,
		marginRight: '5%',
		padding: 0,

		'& span': {
			flexDirection: 'row',
			justifyContent: 'normal'
		}
	}
}));

const FilledQuarterlyKpoDetail = ({ entireData }) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	console.log(entireData, ' entire data');

	return (
		<div className={classes.root}>
			<AppBar position="static" color="rgb(0, 0, 0, 0)" className={` ${classes.appBarStyle}`}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					aria-label="quarterly kpo review tab"
					// style={{ padding: 12 }}
				>
					<Tab
						label="Q1"
						{...a11yProps(0)}
						disabled={entireData?.Q1?.content || entireData?.Q1?.comment ? false : true}
						className={` ${classes.tabStyle}`}
					/>
					<Tab
						label="Q2"
						{...a11yProps(1)}
						disabled={entireData?.Q2?.content || entireData?.Q2?.comment ? false : true}
						className={` ${classes.tabStyle}`}
					/>
					<Tab
						label="Q3"
						{...a11yProps(2)}
						disabled={entireData?.Q3?.content || entireData?.Q3?.comment ? false : true}
						className={` ${classes.tabStyle}`}
					/>
					<Tab
						label="Q4"
						{...a11yProps(3)}
						disabled={entireData?.Q4?.content || entireData?.Q4?.comment ? false : true}
						className={` ${classes.tabStyle}`}
					/>
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<section>
					<p className={` my-3 ${classes.kpoDetailContent} ${classes.kpoDetailFirstLabel}`}>
						{entireData?.Q1?.content}
					</p>
				</section>
				<section>
					<span className={` ${classes.kpoDetailLabel}`}>Comment</span>
					<p className={` ${classes.kpoDetailContent}`}>{entireData?.Q1?.comment}</p>
				</section>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<section>
					<p className={` my-3 ${classes.kpoDetailContent} ${classes.kpoDetailFirstLabel}`}>
						{entireData?.Q2?.content}
					</p>
				</section>
				<section>
					<span className={` ${classes.kpoDetailLabel}`}>Comment</span>
					<p className={` ${classes.kpoDetailContent}`}>{entireData?.Q2?.comment}</p>
				</section>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<section>
					<p className={` my-3 ${classes.kpoDetailContent} ${classes.kpoDetailFirstLabel}`}>
						{entireData?.Q3?.content}
					</p>
				</section>
				<section>
					<span className={` ${classes.kpoDetailLabel}`}>Comment</span>
					<p className={` ${classes.kpoDetailContent}`}>{entireData?.Q3?.comment}</p>
				</section>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<section>
					<p className={` my-3 ${classes.kpoDetailContent} ${classes.kpoDetailFirstLabel}`}>
						{entireData?.Q4?.content}
					</p>
				</section>
				<section>
					<span className={` ${classes.kpoDetailLabel}`}>Comment</span>
					<p className={` ${classes.kpoDetailContent}`}>{entireData?.Q4?.comment}</p>
				</section>
			</TabPanel>
		</div>
	);
};

export default FilledQuarterlyKpoDetail;
