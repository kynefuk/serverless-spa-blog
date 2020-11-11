import React, { useState } from "react";
import { Blog } from "../../api/api";
import { useApi } from "../../hooks/api";
import "easymde/dist/easymde.min.css";
import SimpleMED from "react-simplemde-editor";
import marked from "marked";
import highlight from "highlightjs";
import "highlightjs/styles/vs.css";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { RouteComponentProps, StaticContext, useHistory } from "react-router";
import { useRootContext } from "../../context";
import { LoadingActionType, ErrorActionType } from "../../action/type";

marked.setOptions({
  highlight: function (code, lang) {
    return highlight.highlightAuto(code, [lang]).value;
  },
});

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface LocationState {
  blog: Blog;
}

const Editor: React.FC<RouteComponentProps<
  {},
  StaticContext,
  LocationState
>> = (props?) => {
  const api = useApi();
  const history = useHistory();
  const { access, dispatchErrorMessage, dispatchLoading } = useRootContext();
  let blog: Blog | undefined;
  if (props?.location.state !== undefined) {
    blog = props.location.state.blog;
  }

  const [title, setTitle] = useState(blog ? blog.title : "");
  const [markdown, setMarkdown] = useState(blog ? blog.content : "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTitle(value);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const options = {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    };

    try {
      dispatchLoading({
        type: LoadingActionType.LOADING_TRUE,
        payload: true,
      });

      const response = await api.createBlogBlogsPost(
        {
          title: title,
          content: markdown,
        },
        options
      );

      history.push(`/${response.data.id}`);
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

  const handleOnEdit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const options = {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    };

    try {
      dispatchLoading({
        type: LoadingActionType.LOADING_TRUE,
        payload: true,
      });
      const response = await api.editBlogBlogsBlogIdPatch(
        blog!.id,
        {
          title: title,
          content: markdown,
        },
        options
      );

      history.push(`/${response.data.id}`);
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

  const classes = useStyles();

  return (
    <>
      {blog ? (
        <>
          <form noValidate autoComplete="off">
            <TextField
              id="title"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              defaultValue={blog.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTitleChange(e)
              }
            />
          </form>
          <SimpleMED value={blog.content} onChange={(e) => setMarkdown(e)} />
          <div id="body">
            <span
              defaultValue={blog.content}
              dangerouslySetInnerHTML={{ __html: marked(markdown) }}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e: React.FormEvent<HTMLButtonElement>) => handleOnEdit(e)}
          >
            Edit
          </Button>
        </>
      ) : (
        <>
          <form noValidate autoComplete="off">
            <TextField
              id="title"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTitleChange(e)
              }
            />
          </form>
          <SimpleMED onChange={(e) => setMarkdown(e)} />
          <div id="body">
            <span
              dangerouslySetInnerHTML={{ __html: marked(markdown) }}
              style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e: React.FormEvent<HTMLButtonElement>) =>
              handleOnSubmit(e)
            }
          >
            Submit
          </Button>
        </>
      )}
    </>
  );
};

export default Editor;
