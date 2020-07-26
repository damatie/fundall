import { combineReducers } from 'redux';
import postBlog from './postBlog.reducer';
import editBlogs from './editBlog.reducer';
import getBlogs from './getBlogs.reducer';
import commentToPost from './commentToPost.reducer';
import commentToComment from './commentToComment.reducer';
import getReplyToComment from './getReplyToComment.reducer';
import editCommentReply from './editCommentReply.reducer';
import deleteCommentReply from './deleteCommentReply.reducer';
import likeAComment from './likeAComment.reducer';
import getOneBlogPost from './getOneBlogPost.reducer';
import likeAndUnlikeBlogPost from './likeAndUnlikeBlogPost.reducer';
import deleteOneBlogPost from './deleteOneBlogPost.reducer';
import updateAComment from './updateAComment.reducer';
import deleteComment from './deleteComment.reducer';

const blogReducers = combineReducers({
	postBlog,
	editBlogs,
	getBlogs,
	commentToPost,
	commentToComment,
	getReplyToComment,
	editCommentReply,
	deleteCommentReply,
	likeAComment,
	getOneBlogPost,
	likeAndUnlikeBlogPost,
	deleteOneBlogPost,
	updateAComment,
	deleteComment,
});

export default blogReducers;