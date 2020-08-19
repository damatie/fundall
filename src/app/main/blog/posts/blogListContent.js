import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import SectionHeader from './sectionHeader';
import { useAuth } from 'app/hooks/useAuth';
const theme = createMuiTheme();

theme.typography.h4 = {
	fontSize: '2.3rem',
	'@media (min-width:600px)': {
		fontSize: '2.5rem'
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '3rem'
	}
};

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		borderRadius: theme.spacing(0.5),
		marginBottom: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			marginBottom: 0
		}
	},
	blogInfo: {
		marginLeft: 44,
		[theme.breakpoints.down('xs')]: {
			marginLeft: 40
		}
	},
	blogTitle: {
		margin: '0 0 16px 0',
		fontWeight: 'bold',
		color: 'rgba(0,0,0,.87)'
	},
	dFlex: {
		display: 'flex'
	},
	button: {
		marginRight: theme.spacing(1),
		paddingLeft: theme.spacing(0),
		textTransform: 'none'
	},
	tag: {
		display: 'inline-block',
		margin: '8px 8px 24px 0'
	}
}));

const userId = useAuth().getId;

function BlogListContent(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [clicked, setClicked] = React.useState(false);
	const [numberOflikedpost, setNumberOfLikedPost] = React.useState();

	React.useEffect(() => {
		const isLiked = props.blog.employees.every(employee => employee.id !== userId);
		if (!isLiked) setClicked(true);
		setNumberOfLikedPost(props.blog.employees.length);
	}, [props.blog]);

	const handleLike = postId => {
		setClicked(prevState => (prevState = !prevState));
		clicked ? setNumberOfLikedPost(prev => prev - 1) : setNumberOfLikedPost(prev => prev + 1);
		dispatch(Actions.likeAndUnlike(postId, userId));
	};

	const handleDelete = value => {
		if (value === 'Delete post') {
			dispatch(Actions.deletePost(props.blog.id));
		} else if (value === 'Edit post') {
			window.location = `/main/blog/post/edit/${props.blog.id}`;
		}
	};

	const getColor = () => (!clicked ? '#4d5760' : '#F44336');

	return (
		<>
		{ (props.author) &&
		(<Paper className={classes.paper} variant="outlined">
			<SectionHeader
				fullName={`${props.author.firstName} ${props.author.lastName}`}
				dp={props.author.profilePicture}
				time={props.blog.createdAt}
				id={props.blog.id}
				blogPoster={props.blog.employeeId}
				buttonContent={['Edit post', 'Delete post']}
				onClick={value => handleDelete(value)}
			/>
			<div className={classes.blogInfo}>
				<ThemeProvider theme={theme}>
					<Link to={`/main/blog/detail/${props.blog.id}`} style={{ textDecoration: 'none' }}>
						<Typography variant="h4" className={classes.blogTitle}>
							{props.blog.title}
						</Typography>
					</Link>
				</ThemeProvider>
				{/* <div className={classes.dFlex}>{blogTags()}</div> */}
				<div className={classes.dFlex}>
				<Typography variant="body1" className={classes.tag}>
					Category: {props.blog.category ? props.blog.category.name : 'Business'}
				</Typography>
				</div>
				<div className={classes.dFlex}>
					<Button
						style={{ color: getColor() }}
						className={classes.button}
						startIcon={!clicked && props.blog ? <FavoriteBorder /> : <Favorite />}
						onClick={() => handleLike(props.blog.id)}
					>
						{numberOflikedpost || 0}
					</Button>
					<Button
						component={Link}
						to={`/main/blog/detail/${props.blog.id}`}
						style={{ color: '#4d5760' }}
						className={classes.button}
						startIcon={<ChatBubbleOutlineIcon />}
					>
						{props.blog.comment && props.blog.comment.length}
					</Button>
				</div>
			</div>
		</Paper>)
		}
		</>
	);
}

export default BlogListContent;
