import React from 'react';

const BlogConfig = {
	settings: {},
	routes: [ 
		{
			path: '/blog/post',
			component: React.lazy(() => import('./blog_components/postBlog.js')),
		},
		{
			path: '/blog/update_blog/:blog_id',
			component: React.lazy(() => import('./blog_components/updateBlog.js')),
		},
		{
			path: '/blog/list',
			component: React.lazy(() => import('./blog_components/blogList.js')),
		},
		{
			path: '/blog/blog_detail/:post_id',
			component: React.lazy(() => import('./blog_components/blogDetail.js')),
		},
	]
};

export default BlogConfig;
