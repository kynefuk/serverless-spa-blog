import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/api";
import { useParams } from "react-router-dom";
import { Blog as ResBlog } from "../../api/api";
import marked from "marked";
import hljs from "highlightjs";
import "highlightjs/styles/vs.css";
import { Container, Grid, Typography } from "@material-ui/core";

hljs.initHighlightingOnLoad();

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value;
  },
});

const Blog: React.FC = () => {
  const api = useApi();
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<ResBlog>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.getBlogBlogsBlogIdGet(Number(id));
      setBlog(response.data);
    };

    fetchData();
  }, [api, id]);

  return (
    <Container>
      <Grid
        container
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <div id="content">
          <Typography variant="h3" align="center">
            {blog?.title}
          </Typography>
          <span
            dangerouslySetInnerHTML={{ __html: marked(blog?.content || "") }}
          />
        </div>
      </Grid>
    </Container>
  );
};

export default Blog;
