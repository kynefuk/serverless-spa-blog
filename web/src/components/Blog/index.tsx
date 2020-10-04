import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DefaultApi } from '../../api/api';
import { Blog as ResBlog } from '../../api/api';

const Blog: React.FC = () => {
  const api = new DefaultApi();
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<ResBlog>();

  return <div></div>;
};

export default Blog;
