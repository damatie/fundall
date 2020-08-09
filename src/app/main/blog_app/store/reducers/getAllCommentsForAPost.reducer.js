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
        if (comment.id === action.payload.commentId) {
          return {...comment, replyComment: [{...action.payload}, ...comment.replyComment]};
        }
				return comment;
			}));
			return {
				...initialState,
				loading: false,
				data: newData,
			};
		}
		case Actions.UPDATE_A_COMMENT_REPLY_SUCCESS: {
			const newData = state.data.map((comment) => {
				if(comment.id === action.payload.commentId) {
          return {...comment, replyComment: comment.replyComment.map((reply) => {
            if(reply.id === action.payload.replyId) return {...reply, content: action.payload.content}
            return reply
          })}
        }
				return comment;
			});
			return {
				...initialState,
				loading: false,
				data: newData
			};
		}
		case Actions.DELETE_COMMENT_REPLY_SUCCESS: {
			const newData = state.data.map((comment) => { 
        if (comment.id === action.payload.commentId) {
          return {...comment, replyComment: comment.replyComment.filter((reply) => {
            return reply.id !== action.payload.replyId;
          })}
        }
				return comment;
			});
			return {
				...state,
				loading: false,
				data: newData
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