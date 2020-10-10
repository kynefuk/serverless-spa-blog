import React, { useEffect, useState } from 'react';
import { DefaultApi } from '../../api/api';
import { Blog } from '../../api/api';
import { List, ListItem, Container, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const BlogList: React.FC = () => {
  const api = new DefaultApi();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.listBlogsBlogsGet(0, 100);
      setBlogs(response.data);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Grid container justify='center' alignItems='center'>
        <List>
          {blogs.map((blog) => (
            <Link to={`/${blog.id}`} key={blog.id}>
              <ListItem>
                <Typography variant='h6'>{blog.title}</Typography>
              </ListItem>
            </Link>
          ))}
        </List>
      </Grid>
    </Container>
  );
};

export default BlogList;
