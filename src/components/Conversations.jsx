import React from 'react';
import { useSelector } from 'react-redux';

function Conversations() {
  const { conversations } = useSelector((state) => state);

  return (
    <div>
      <h1>Conversations</h1>
      <pre>
        {
          JSON.stringify(conversations, null, 2)
        }
      </pre>
    </div>
  );
}

export default Conversations;
