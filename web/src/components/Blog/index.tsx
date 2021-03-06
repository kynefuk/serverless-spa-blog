import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/api";
import { useParams } from "react-router-dom";
import { Blog as ResBlog } from "../../api/api";
import marked from "marked";
import hljs from "highlightjs";
import "highlightjs/styles/vs.css";
import { Container, Grid, Typography } from "@material-ui/core";
import { useRootContext } from "../../context/index";
import { LoadingActionType, ErrorActionType } from "../../action/type";

hljs.initHighlightingOnLoad();

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value;
  },
});

const Blog: React.FC = () => {
  const api = useApi();
  const { dispatchLoading, dispatchErrorMessage } = useRootContext();

  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<ResBlog>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatchLoading({
          type: LoadingActionType.LOADING_TRUE,
          payload: true,
        });

        const response = await api.getBlogBlogsBlogIdGet(Number(id));
        setBlog(response.data);
      } catch (err) {
        console.error(err);
        dispatchErrorMessage({
          type: ErrorActionType.ADD_ERROR,
          payload: err.message,
        });
      } finally {
        dispatchLoading({
          type: LoadingActionType.LOADING_FALSE,
          payload: false,
        });
      }
    };

    fetchData();
  }, [api, dispatchErrorMessage, dispatchLoading, id]);

  return (
    <Container>
      <Grid
        container
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="h3"
            align="center"
            style={{ wordWrap: "break-word" }}
          >
            {blog?.title}
          </Typography>
          <span
            dangerouslySetInnerHTML={{ __html: marked(blog?.content || "") }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Blog;
