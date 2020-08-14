import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	tag: {
		padding: '2px 8px',
		borderRadius: 4,
		display: 'inline-block',
		margin: '16px 8px 24px 0'
	}
}));

const BlogTags = React.memo(props => {
	const classes = useStyles();

	const generateRandomColors = () => {
		const rgb = [];
		rgb[0] = Math.round(Math.random() * 255);
		rgb[1] = Math.round(Math.random() * 255);
		rgb[2] = Math.round(Math.random() * 255);
		const brightness = Math.round((parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000);
		brightness > 125 ? (textColor = 'black') : (textColor = 'white');
		return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
	};

	let textColor = '';
	const blogTags = () =>
		props.tags.map((tag, i) => {
			return (
				<Typography
					key={i}
					variant="caption"
					className={classes.tag}
					style={{ background: generateRandomColors(), color: textColor }}
				>
					{`#${tag}`}
				</Typography>
			);
		});
	return <>{blogTags()}</>;
});

export default BlogTags;
