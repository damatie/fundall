import React, { useEffect } from 'react';
import * as blogActions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import BlogListContent from './blogListContent';

function BlogPostList() {
  const dispatch = useDispatch();
  const blogPost = useSelector(state => state.blog.getBlogs.data);

  useEffect(() => {
    dispatch(blogActions.getBlogPost());
  }, []);

  return (
    <>
      { !blogPost ? 'loading...' : blogPost.map(blog => <BlogListContent blog={blog} key={blog.id} />) }
    </>
  )
}

export default BlogPostList;
