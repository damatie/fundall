import React from 'react';
import BlogContent from './blogContent';

const blogs = [
  {
    id: 1,
    fullName: 'Matthew Nte',
    time: 'Jul 16(19 hours ago)',
    title: '5 Tips for getting alert fatigue under control',
    tags: ['sports', 'discuss', 'funny'],
  },
  {
    id: 2,
    fullName: 'David smith',
    time: 'Jul 14',
    title: 'Another Blog',
    tags: ['anime', 'discuss', 'funny'],
  }
];

function BlogPostList() {

  const blogContentList = blogs.map((blog) => <BlogContent blog={blog} key={blog.id} />)

  return (
    <>
      { blogContentList }
    </>
  )
}

export default BlogPostList;
