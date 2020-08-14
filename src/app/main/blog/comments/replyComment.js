import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SingleComment from './singleComment';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: '16px 8px 0 16px',
		marginLeft: '16px 24px 0 16px',
		marginBottom: '16px',
		[theme.breakpoints.down('xs')]: {
			marginLeft: '12px'
		}
	},
	btn: {
		color: 'grey',
		marginTop: '8px',
		textTransform: 'none',
		[theme.breakpoints.down('xs')]: {
			marginTop: 0
		}
	}
}));

function ReplyComment(props) {
	const classes = useStyles();

	const [viewAllComments, setViewAllComments] = useState(false);
	const [noOfReply] = useState(props.reply.length);

	const replyContent = ['Edit reply', 'Delete reply'];

	return (
		<>
			{props.reply && noOfReply !== 0 && (
				<>
					<Button className={classes.btn} onClick={() => setViewAllComments(!viewAllComments)}>
						{!viewAllComments ? `View more ${noOfReply - 1} comments` : 'Hide comments'}
					</Button>
					{!viewAllComments ? (
						<SingleComment
							comment={props.reply[0]}
							commentId={props.commentId}
							postId={props.postId}
							moreContent={replyContent}
						/>
					) : (
						props.reply.map((reply, i) => {
							return (
								<SingleComment
									key={i}
									comment={reply}
									commentId={props.commentId}
									postId={props.postId}
									moreContent={replyContent}
								/>
							);
						})
					)}
				</>
			)}
		</>
	);
}

export default ReplyComment;
