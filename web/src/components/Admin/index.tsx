import React, { useEffect, useState } from 'react';
import { DefaultApi } from '../../api/api';
import { Blog } from '../../api/api';
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useRootContext } from '../../context';

const Admin: React.FC = () => {
  const api = new DefaultApi();
  const { access } = useRootContext();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.listBlogsBlogsGet(0, 100);
      setBlogs(response.data);
    };
    fetchData();
  }, []);

  const handleOnDelete = async (blogId: number) => {
    const options = {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    };

    try {
      await api.deleteBlogBlogsBlogIdDelete(blogId, options);
      const deleted = blogs.filter((b) => {
        return b.id !== blogId;
      });

      setBlogs(deleted);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Grid container justify='center' alignItems='center'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>タイトル</TableCell>
                <TableCell>#</TableCell>
                <TableCell>#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={{
                        pathname: `/admin/blogs/${blog.id}/edit`,
                        state: { blog },
                      }}
                    >
                      編集
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      color='secondary'
                      onClick={() => handleOnDelete(blog.id)}
                    >
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  );
};

export default Admin;
