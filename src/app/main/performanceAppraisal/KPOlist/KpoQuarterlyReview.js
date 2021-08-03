import { Button } from '@material-ui/core';
import PageLayout from 'app/shared/pageLayout/PageLayout';
import React from 'react';
// import ApprovedKpoReviewDetail from './components/ApprovedKpoReviewDetail.js';
import KpoReviewDetail from './components/KpoReviewDetail.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	btnInActive: {
		backgroundColor: '#D8D8D8',
		color: '#121212'
	},
	btnActive: {
		backgroundColor: '#62DAFC',
		color: '#121212'
	},
	btnDiv: {
		display: 'flex',
		width: '85%',
		margin: 'auto',
		marginTop: '5%'
	},
	btnGeneral: {
		padding: '9px 21px'
	},
	nextKpoBtn: {
		marginLeft: '5%'
	}
}));

const KpoQuarterlyReview = () => {
	const classes = useStyles();

	const [prevUrl] = React.useState(JSON.parse(localStorage.getItem('prevUrlFromKpoContentCard')));
	const [currentlyShownKpo, setCurrentlyShownKpo] = React.useState(0);

	const kpoDetail = JSON.parse(localStorage.getItem('tempKpoDetailArr'));

	const previousKpo = () => {
		setCurrentlyShownKpo(currentlyShownKpo - 1);
	};

	const nextKpo = () => {
		setCurrentlyShownKpo(currentlyShownKpo + 1);
		// const element = document.getElementById(this.state.media);

		// element.scrollIntoView({behavior: 'smooth'});
	};

	const [updated, setUpdated] = React.useState(false);

	return (
		<PageLayout
			header={{
				icon: '',
				title: 'Quarterly Review',
				handleSearch: ({ target: { value } }) => console.log(value)
			}}
			prev={{
				url: prevUrl
			}}
			button={{
				showButton: false,
				btnComponent: false
			}}
			content={
				<div className={` p-24`}>
					<KpoReviewDetail
						kpoDetailArray={kpoDetail}
						currentlyShownKpoDetail={currentlyShownKpo}
						updateKpo={setUpdated}
					/>
					<div className={` ${classes.btnDiv}`}>
						<Button
							disabled={
								/* updated && */ currentlyShownKpo > 0 && currentlyShownKpo < kpoDetail?.length - 1 ? false : true
							}
							onClick={previousKpo}
							className={`${
								/* updated && */ currentlyShownKpo > 0 && currentlyShownKpo < kpoDetail?.length - 1
									? classes.btnActive
									: classes.btnInActive
							} ${classes.btnGeneral}`}
						>
							PREVIOUS
						</Button>
						<Button
							disabled={/* updated &&  */ currentlyShownKpo < kpoDetail?.length - 1 ? false : true}
							onClick={nextKpo}
							className={`${
								/* updated &&  */ currentlyShownKpo < kpoDetail?.length - 1 ? classes.btnActive : classes.btnInActive
							} ${classes.nextKpoBtn} ${classes.btnGeneral}`}
						>
							NEXT KPO
						</Button>
					</div>
				</div>
			}
		/>
	);
};

export default KpoQuarterlyReview;
