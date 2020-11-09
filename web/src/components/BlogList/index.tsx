import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/api";
import { Blog } from "../../api/api";
import { List, ListItem, Container, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useRootContext } from "../../context";
import { LoadingActionType, ErrorActionType } from "../../action/type";

const BlogList: React.FC = () => {
  const api = useApi();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { dispatchLoading, dispatchErrorMessage } = useRootContext();

  useEffect(() => {
    const fetchData = async () => {
      dispatchLoading({
        type: LoadingActionType.LOADING_TRUE,
        payload: true,
      });

      try {
        const response = await api.listBlogsBlogsGet(0, 100);
        setBlogs(response.data);
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
  }, [api, dispatchErrorMessage, dispatchLoading]);

  return (
    <Container>
      <Grid container justify="center" alignItems="center">
        <List>
          {blogs.map((blog) => (
            <Link to={`/${blog.id}`} key={blog.id}>
              <ListItem>
                <Typography variant="h6">{blog.title}</Typography>
              </ListItem>
            </Link>
          ))}
        </List>
      </Grid>
    </Container>
  );
};

export default BlogList;
