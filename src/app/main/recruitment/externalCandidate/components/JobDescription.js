import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Divider, Button, Grid } from '@material-ui/core';
import ReadLess from 'app/shared/TextInput/ReadLess';
import ReadMore from 'app/shared/TextInput/ReadMore';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(1),
		marginBottom: theme.spacing(3),
		backgroundColor: '#fff'
	},
	sub: {
		backgroundColor: '#fff',
		bottom: '10%',
		height: '100%',
	},
	title: {
		height: '47px',
		marginTop: theme.spacing(2),
		color: '#121212',
		fontWeight: 800,
        lineHeight: '23px',
        fontSize: '18px'
	},
	description: {
		height: '44px',
		marginBottom: theme.spacing(3),
		color: '#121212',
		fontWeight: 600,
        lineHeight: '33px',
        fontSize: '15px'
	},
	divder: {
		width: '390px',
		margin: theme.spacing(2)
	}
}));
const JobDescription = ({customHook}) => {
	const classes = useStyles();
	const {
		content,
		oneLoading
	} = customHook;
	return (
		oneLoading ? (
            <Skeleton animation="wave" width="100%" height="315px" variant="rect" />
        ):(
		<div className={classes.root}>
			<div className={classes.sub}>
				<Typography variant="h4" className={classes.title}>
					Job Description
				</Typography>

				<Typography variant="body2" className={classes.description}>
					<ReadMore text={ content?.jobDescription|| `
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Itaque e contrario moderati aequabilesque habitus,
					affectiones ususque corporis apti esse ad naturam videntur. Traditur, inquit, ab Epicuro ratio neglegendi
					doloris. Tertium autem omnibus aut maximis rebus iis, quae secundum naturam sint, fruentem vivere. Eam si
					varietatem diceres, intellegerem, ut etiam non dicente te intellego; Quam si explicavisset, non tam haesitaret.
					Quorum altera prosunt, nocent altera. Immo alio genere; Duo Reges: constructio interrete. Ut non sine causa ex
					iis memoriae ducta sit disciplina. Quid enim mihi potest esse optatius quam cum Catone, omnium virtutum auctore,
					de virtutibus disputare? Nihil enim iam habes, quod ad corpus referas; Tanta vis admonitionis inest in locis;
					Nos quidem Virtutes sic natae sumus, ut tibi serviremus, aliud negotii nihil habemus. Non modo carum sibi
					quemque, verum etiam vehementer carum esse? Iam in altera philosophiae parte. Sextilio Rufo, cum is rem ad
					amicos ita deferret, se esse heredem Q. An est aliquid per se ipsum flagitiosum, etiamsi nulla comitetur
					infamia? Cur igitur, cum de re conveniat, non malumus usitate loqui? Ratio quidem vestra sic cogit. An hoc usque
					quaque, aliter in vita? Sin eam, quam Hieronymus, ne fecisset idem, ut voluptatem illam Aristippi in prima
					commendatione poneret. Quae qui non vident, nihil umquam magnum ac cognitione dignum amaverunt. An hoc usque
					quaque, aliter in vita? Paulum, cum regem Persem captum adduceret, eodem flumine invectio?
					`}
					size = {500}
					/>
				</Typography>
			</div>

		</div>
		)
	);
};

export default JobDescription;
