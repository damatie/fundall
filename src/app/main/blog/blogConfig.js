import React from 'react';

const BlogConfig = {
	settings: {},
	routes: [
		// {
		// 	path: '/main/blog/post',
		// 	component: React.lazy(() => import('./blog_components/postBlog.js')),
		// },
		// {
		// 	path: '/main/blog/update_blog/:blog_id',
		// 	component: React.lazy(() => import('./blog_components/updateBlog.js')),
		// },
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
