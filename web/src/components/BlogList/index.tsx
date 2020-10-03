import React, { useEffect, useState } from 'react';
import { DefaultApi } from '../../api/api';
import { Blog } from '../../api/api';
import { List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

const BlogList: React.FC = () => {
  const api = new DefaultApi();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.listBlogsBlogsGet(0, 100);
      console.log(response);
      setBlogs(response.data);
    };
    fetchData();
  }, []);

  return (
    <List>
      {blogs.map((blog) => (
        <Link to='/'>
          <ListItem>{blog.title}</ListItem>
        </Link>
      ))}
    </List>
  );
};

export default BlogList;
