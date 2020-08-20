import * as Actions from '../actions';

const initialState = {
	loading: false,
	data: [],
	post: [],
	totalNo: 0,
	success: false
};

const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING_POSTS: {
			return {
			  ...state,
			  loading: true,
			}
		  }
		case Actions.GET_POSTS:
			return {
				...state,
				loading: false,
				data: action.payload,
				totalNo: action.totalNo,
			};
		case Actions.GET_ONE_POST:
			return {
				...state,
				loading: false,
				post: action.payload,
				data: action.payload
			};
		case Actions.CREATE_POST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.CREATE_POST_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.UPDATE_POST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.UPDATE_POST_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.LIKE_OR_UNLIKE_POST_SUCCESS:{
      let newData;
      if (action.payload.result.like) {
        newData = state.data.map((blog) => {
          if (blog.post.id === action.payload.postId) {
            return { author: blog.author, post: {...blog.post, employees: [...action.payload.employees]}};
          }
          return blog;
        })
      } else {
        newData = state.data.map(blog => {
          if (blog.post.id === action.payload.postId) {
            return {author: blog.author, post: {...blog.post, employees: [...action.payload.result.employees]}};
          }
          return blog;
        })
      }
			return {
        ...state,
        loading: false,
				success: true,
				data: newData,
      };
    }
		case Actions.LIKE_OR_UNLIKE_POST_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		case Actions.DELETE_POST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			};
		case Actions.DELETE_POST_ERROR:
			return {
				...state,
				loading: false,
				success: false
			};
		default: {
			return state;
		}
	}
};

export default postsReducer;
