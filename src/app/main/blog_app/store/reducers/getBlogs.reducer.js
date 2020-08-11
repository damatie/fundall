import * as Actions from '../actions';

const initialState = {
	success: false,
	loading: false,
	error: {},
	data: [],
};

const getBlogs = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GETBLOGS_SUCCESS: {
			return {
				...initialState,
				loading: false,
				data: action.payload
			};
		}
		case Actions.LIKE_AND_UNLIKE_BLOGPOST_SUCCESS: {
      let newData;
      if (action.payload.like) {
        newData = state.data.map((blog) => {
          if (blog.post.id === action.payload.postId) {
            return { author: blog.author, post: {...blog.post, employees: [...blog.post.employees, action.payload]}};
          }
          return blog;
        })
      } else {
        const removeLike = (post) => post.filter(employee => employee.id !== action.payload.employeeId )
        newData = state.data.map(blog => {
          if (blog.post.id === action.payload.postId) {
            return {author: blog.author, post: {...blog.post, employees: removeLike(blog.post.employees)}};
          }
          return blog;
        })
      }
			return {
				...initialState,
				data: newData,
			};
		}
		case Actions.DELETE_ONE_BLOGPOST_SUCCESS: {
			const newData = state.data.filter(blog => blog.post.id !== action.payload);
			return {
				...state,
				data: newData,
			};
		}
		case Actions.GETBLOGS_ERROR: {
			return {
				...initialState,
				success: false,
				error: action.payload,
				loading: false
			};
		}
		case Actions.GETBLOGS_LOADING: {
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

export default getBlogs;