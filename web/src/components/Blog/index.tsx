import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DefaultApi } from '../../api/api';
import { Blog as ResBlog } from '../../api/api';
import marked from 'marked';
import hljs from 'highlightjs';
import 'highlightjs/styles/vs.css';
import { Container, Grid, Typography } from '@material-ui/core';

hljs.initHighlightingOnLoad();

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value;
  },
});

const Blog: React.FC = () => {
  const api = new DefaultApi();
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<ResBlog>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.getBlogBlogsBlogIdGet(Number(id));
      setBlog(response.data);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Grid container justify='center' alignItems='center'>
        <Typography variant='h3'>{blog?.title}</Typography>
        <div id='body'>
          <span
            dangerouslySetInnerHTML={{ __html: marked(blog?.content || '') }}
          />
        </div>
      </Grid>
    </Container>
  );
};

export default Blog;
