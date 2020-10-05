import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DefaultApi } from '../../api/api';
import { Blog as ResBlog } from '../../api/api';
import marked from 'marked';
import hljs from 'highlightjs';
import 'highlightjs/styles/github.css';
import { Container, Grid } from '@material-ui/core';

hljs.initHighlightingOnLoad();

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value;
  },
  langPrefix: '',
});

const Blog: React.FC = () => {
  const api = new DefaultApi();
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<ResBlog>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.getBlogBlogsBlogIdGet(Number(id));
      console.log(response);
      setBlog(response.data);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Grid container>
        <span
          dangerouslySetInnerHTML={{ __html: marked(blog?.content || '') }}
        />
      </Grid>
    </Container>
  );
};

export default Blog;
