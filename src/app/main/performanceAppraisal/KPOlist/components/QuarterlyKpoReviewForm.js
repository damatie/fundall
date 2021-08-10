import Input from 'app/shared/TextInput/Input';
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	quarterlyKpoReviewForm: {
		margin: '5% 0'
	},
	attachFileIcon: {
		transform: 'rotate(45deg)',
		position: 'absolute',
		left: 15
	},
	attachLabel: {
		backgroundColor: '#D8D8D8',
		padding: '12px 30px',
		borderRadius: 6,
		marginTop: '3%',
		display: 'inline-block',
		position: 'relative',
		paddingRight: 60,
		cursor: 'pointer'
	},
	attachSpan: {
		fontSize: 12,
		color: '#000000',
		marginLeft: '55%',
		marginTop: '10%',
		display: 'inline-block'
	},
	updateKpoBtnDiv: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginTop: '5%'
	}
}));

const UpdateKpoButton = withStyles(theme => ({
	root: {
		color: '#ffffff',
		backgroundColor: '#132432',
		'&:hover': {
			backgroundColor: '#62DAFC'
		}
	}
}))(Button);

const QuarterlyKpoReviewForm = ({ kpoQuarter, qLabel, updateKpo }) => {
	const classes = useStyles();
	console.log(kpoQuarter, 'kpoQuarter');
	console.log(qLabel, 'qLabel');

	return (
		<div className={` ${classes.quarterlyKpoReviewForm}`}>
			<Input
				label={qLabel}
				name={qLabel}
				type="text"
				className="my-16"
				// multiline
				// rows="4"
				value={kpoQuarter?.content}
				// error={errors.description}
				// message={errors.description?.message}
				// helperText={errors.description?.message}
				// refs={register}
				// onChange={e => setDescription(e.target.value)}
			/>
			<Input
				label="Comment"
				name="comment"
				type="text"
				className="my-16"
				multiline
				rows="9"
				value={kpoQuarter?.comment}
				// error={errors.description}
				// message={errors.description?.message}
				// helperText={errors.description?.message}
				// refs={register}
				// onChange={e => setDescription(e.target.value)}
			/>
			<label htmlFor="attachment" className={` ${classes.attachLabel}`}>
				{' '}
				<AttachFileIcon className={` ${classes.attachFileIcon}`} />
				<span className={` ${classes.attachSpan}`}>ATTACH</span>
			</label>
			<input id="attachment" type="file" style={{ display: 'none' }} />
			{console.log(updateKpo)}
			{updateKpo && (
				<div className={` ${classes.updateKpoBtnDiv}`}>
					<UpdateKpoButton
						onClick={() => {
							console.log('go to update page');
							updateKpo(true);
						}}
						variant="contained"
						color="primary"
					>
						UPDATE KPO
					</UpdateKpoButton>
				</div>
			)}
		</div>
	);
};

export default QuarterlyKpoReviewForm;
