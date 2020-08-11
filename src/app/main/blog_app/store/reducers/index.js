import { combineReducers } from 'redux';
import postBlog from './postBlog.reducer';
import editBlogs from './editBlog.reducer';
import getBlogs from './getBlogs.reducer';
import commentToPost from './commentToPost.reducer';
import commentToComment from './commentToComment.reducer';
import getReplyToComment from './getReplyToComment.reducer';
import updateACommentReply from './updateACommentReply.reducer';
import deleteCommentReply from './deleteCommentReply.reducer';
import likeAComment from './likeAComment.reducer';
import getOneBlogPost from './getOneBlogPost.reducer';
import likeAndUnlikeBlogPost from './likeAndUnlikeBlogPost.reducer';
import deleteOneBlogPost from './deleteOneBlogPost.reducer';
import updateAComment from './updateAComment.reducer';
import deleteComment from './deleteComment.reducer';
import getAllCommentsForAPost from './getAllCommentsForAPost.reducer';
import showEmployeeModal from './showEmployeeDialog.reducer'

const blogReducers = combineReducers({
	postBlog,
	editBlogs,
	getBlogs,
	commentToPost,
	commentToComment,
	getReplyToComment,
	updateACommentReply,
	deleteCommentReply,
	likeAComment,
	getOneBlogPost,
	likeAndUnlikeBlogPost,
	deleteOneBlogPost,
	updateAComment,
	deleteComment,
	getAllCommentsForAPost,
	showEmployeeModal,
});

export default blogReducers;