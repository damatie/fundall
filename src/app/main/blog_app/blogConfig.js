import React from 'react';

const BlogConfig = {
	settings: {},
	routes: [ 
		{
			path: '/blog/post',
			component: React.lazy(() => import('./postBlog.js')),
		},
	]
};

export default BlogConfig;
