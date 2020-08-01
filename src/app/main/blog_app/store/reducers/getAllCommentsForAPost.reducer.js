import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
	data: [],
};

const getAllCommentsForAPost = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_ALL_COMMENTS_FOR_A_POST_SUCCESS: {
			return {
				...initialState,
				loading: false,
				data: action.payload
			};
			break
		}
		case Actions.DELETE_COMMENT_SUCCESS: {
			const newData = state.data.filter((comment) => comment.id !== action.payload);
			return {
				...initialState,
				loading: false,
				data: newData,
			};
			break;
		}
		case Actions.UPDATE_A_COMMENT_SUCCESS: {
			const newData = state.data.map((comment) => {
				if (comment.id === action.payload.id) return {...comment, content: action.payload.content };
				return comment;
			});
			return {
				...initialState,
				loading: false,
				data: newData,
			};
			break;
		}
		case Actions.COMMENT_TO_POST_SUCCESS: {
			const newData = [ action.payload, ...state.data ];
			return {
				...initialState,
				loading: false,
				data: newData,
			};
		}
		case Actions.COMMENT_TO_COMMENT_SUCCESS: {
			const newData = state.data.map((comment => {
				if (comment.id === action.payload.commentId) return console.log('coments');
				return comment;
			}));
			return {
				...initialState,
				loading: false,
				data: [...state.data, {replyComment: newData}],
			};
		}
		case Actions.UPDATE_A_COMMENT_REPLY_SUCCESS: {
			const updateReply = (comment) => {
				comment.map((reply) => {
					if(reply.id === action.payload.id) reply.content = action.payload.content;
					return reply;
				});
			}
			const currentComment = state.data.map((comment) => {
				if(comment.id === action.payload.commentId) updateReply(comment.replyComment);
				return comment;
			});
			return {
				...initialState,
				loading: false,
				data: currentComment
			};
			break;
		}
		case Actions.LIKE_A_COMMENT_SUCCESS: {
			const newData = state.data.map(comment => {
				if (comment.id === action.payload.id) {
          console.log('comment added');
					return comment.commentLikes.push(action.payload);
				}
				return comment;
			})
			return {
				...initialState,
				success: false,
				error: action.payload,
				data: newData,
			};
		}
		case Actions.GET_ALL_COMMENTS_FOR_A_POST_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.GET_ALL_COMMENTS_FOR_A_POST_LOADING: {
			return {
				...initialState,
				success: false,
				loading: true
			};
		}
		default: {
			return state;
		}
	}
};

export default getAllCommentsForAPost;