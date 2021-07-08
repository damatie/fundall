import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CommentInput from './commentInput';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SectionHeader from '../posts/sectionHeader';
import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAuth } from 'app/hooks/useAuth';

const theme = createMuiTheme();

theme.typography.body1 = {
	fontSize: '16px'
};

const useStyles = makeStyles(theme => ({
	root: {
		marginLeft: '48px',
		marginTop: 16,
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(1)
		}
	},
	dFlex: {
		display: 'flex'
	},
	spaceBtw: {
		justifyContent: 'space-between'
	},
	commentBody: {
		marginLeft: '48px'
	},
	content: {
		margin: '8px 0',
		lineHeight: 1.5
	}
}));

function BlogComment(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [showInput, setShowInput] = useState(true);
	const [content, setContent] = useState('');
	const [open, setOpen] = useState(false);
	const [isLikeComment, setIsLikeComment] = useState(props.isLike);
	const [comment, setComment] = useState('');
	const [input, setInput] = useState('');
	const [likes, setLikes] = useState([]);
	const [employeeDetails, setEmployeeDetails] = useState({});
	const [value, setValue] = useState('');
	const [inputError, setInputError] = useState(false);

	useEffect(() => {
		if (props.comment) {
			setContent(props.comment.content);
			setComment(props.comment.content);
			setLikes(props.comment.commentLike ? props.comment.commentLike.length : 0);
			setEmployeeDetails(props.comment.employee);
		}
	}, [props.comment]);

	useEffect(() => {
		if (props.comment) {
			setIsLikeComment(checkIfUserLikedComment(props.comment.commentLike));
		}
	}, [props, props.comment]);

	const showReplyInput = e => {
		e.preventDefault();
		setShowInput(false);
	};

	const handleChange = value => {
		if (value === true) {
			setShowInput(value);
			setInput('');
		} else {
			setInput(value);
			setContent(value);
			setInputError(false);
		}
	};

	const userId = useAuth().getId;

	function checkIfUserLikedComment(data) {
		if (userId && data) {
			for (const i of data) {
				if (i.employeeId === userId) {
					return true;
				}
			}
		}
	}

	const handleSubmitReply = () => {
		if (input.length > 0) {
			setShowInput(true);
			const model = { commentId: props.comment.id, content };
			dispatch(Actions.submitBlogCommentReply(model, props.postId));
			setInput('');
		} else {
			setInputError(true);
		}
	};

	const handleCommentEdit = () => {
		const model = {
			id: props.comment.id,
			content,
			postId: props.postId
		};
		dispatch(Actions.updateAComment(model));
		setOpen(false);
	};

	const updateCommentReply = () => {
		console.log(props);
		const model = {
			id: props.postId,
			replyId: props.comment.id,
			commentId: props.commentId,
			content
		};
		dispatch(Actions.updateACommentReply(model));
		setOpen(false);
	};

	const checkForMethodToCall = () => {
		if (value === 'Edit comment') handleCommentEdit();
		else updateCommentReply();
	};

	const handleCommentDelete = () => {
		dispatch(Actions.deleteComment(props.comment.id, props.postId));
	};

	const handleDeleteReply = () => {
		dispatch(Actions.deleteCommentReply(props.comment.id, props.commentId, props.postId));
	};

	const selectClickedButton = value => {
		switch (value) {
			case 'Delete comment':
				handleCommentDelete();
				break;
			case 'Delete reply':
				handleDeleteReply();
				break;
			default:
				setValue(value);
				setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleLikes = () => {
		setIsLikeComment(!isLikeComment);
		isLikeComment ? setLikes(prev => prev - 1) : setLikes(prev => prev + 1);
		dispatch(Actions.likeAComment(props.comment.id, props.userId, props.comment.postId));
	};

	const getColor = () => (!isLikeComment ? '#4d5760' : '#F44336');

	return (
		<div className={`${props.commentId && classes.root}`}>
			<SectionHeader
				fullName={employeeDetails && `${employeeDetails.lastName} ${employeeDetails.firstName}`}
				buttonContent={props.moreContent}
				email={employeeDetails && employeeDetails.email}
				blogPoster={employeeDetails && employeeDetails.id}
				commentReplier={props.comment && props.comment.employeeId}
				onClick={value => selectClickedButton(value)}
				time={props.comment && props.comment.createdAt}
				dp={employeeDetails && employeeDetails.profilePicture}
			/>
			<div className={classes.commentBody}>
				<ThemeProvider theme={theme}>
					<Typography varaint="body1" className={classes.content}>
						{comment}
					</Typography>
				</ThemeProvider>
				{showInput ? (
					<div className={`${classes.dFlex} ${classes.spaceBtw}`}>
						{props.btnContent && (
							<>
								{' '}
								<div>
									<IconButton aria-label="like" onClick={handleLikes} style={{ color: getColor() }} component="span">
										{!isLikeComment ? <FavoriteBorder /> : <Favorite />}
									</IconButton>
									<Typography varaint="body1" component="span" className={classes.userName}>
										{likes}
									</Typography>
								</div>
								<Button onClick={showReplyInput}>{props.btnContent}</Button>{' '}
							</>
						)}
					</div>
				) : (
					<CommentInput
						cancel="Cancel"
						value={input}
						error={inputError}
						onClick={() => handleSubmitReply()}
						onChange={value => handleChange(value)}
					/>
				)}
			</div>
			<Dialog open={open} onClose={handleClose} fullWidth aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Update comment</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Update comment"
						value={content}
						type="text"
						fullWidth
						style={{ resize: 'none' }}
						onChange={event => setContent(event.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button variant="contained" onClick={checkForMethodToCall} color="primary">
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default BlogComment;
