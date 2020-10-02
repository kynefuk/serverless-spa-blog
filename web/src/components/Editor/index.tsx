import React, { useState } from 'react';
import { DefaultApi } from '../../api/api';
import 'easymde/dist/easymde.min.css';
import SimpleMED from 'react-simplemde-editor';
import marked from 'marked';
import highlight from 'highlightjs';
import 'highlightjs/styles/docco.css';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useAccessTokenContext } from '../../context';

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

const Editor = () => {
  const api = new DefaultApi();
  const history = useHistory();
  const { access } = useAccessTokenContext();
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTitle(value);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // ヘッダにJWTトークンを含める必要がある
    const options = {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    };

    const response = await api.createBlogBlogsPost(
      {
        title: title,
        content: markdown,
      },
      options
    );
    console.log(response);
    history.push(`/${response.data.id}`);
  };

  const classes = useStyles();

  return (
    <>
      <form noValidate autoComplete='off'>
        <TextField
          id='title'
          variant='outlined'
          margin='normal'
          required
          fullWidth
          label='Title'
          name='title'
          autoComplete='title'
          autoFocus
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleTitleChange(e)
          }
        />
      </form>
      <SimpleMED onChange={(e) => setMarkdown(e)} />
      <div id='body'>
        <span dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
      </div>
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        onClick={(e: React.FormEvent<HTMLButtonElement>) => handleOnSubmit(e)}
      >
        Submit
      </Button>
    </>
  );
};

export default Editor;
