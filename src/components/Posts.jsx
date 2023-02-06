import React from 'react';
import { useSelector } from 'react-redux';

function Posts() {
  const { posts } = useSelector((state) => state);

  return (
    <div>
      <h1>Posts</h1>
      <pre>
        {
          JSON.stringify(posts, null, 2)
        }
      </pre>
    </div>
  );
}

export default Posts;
