import React from 'react';

const BlogConfig = {
	settings: {},
	routes: [
		{
			path: '/main/blog/post/edit/:post_id',
			component: React.lazy(() => import('./posts/addBlogPost')),
		},
		{
			path: '/main/blog/post',
			component: React.lazy(() => import('./posts/addBlogPost')),
		},
		{
			path: '/main/blogs',
			component: React.lazy(() => import('./MainBlog')),
		},
		{
			path: '/main/blog/detail/:post_id',
			component: React.lazy(() => import('./posts/blogPostDetail')),
		},
	]
};

export default BlogConfig;
