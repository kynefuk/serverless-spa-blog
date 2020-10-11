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
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const Admin: React.FC = () => {
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
                <TableRow>
                  <TableCell>
                    <Link to={`/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={{
                        pathname: `/admin/blog/${blog.id}/edit`,
                        state: { blog },
                      }}
                    >
                      編集
                    </Link>
                  </TableCell>
                  <TableCell>削除</TableCell>
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
