import * as React from "react";
import { useQuery } from "react-query";

const ListComment = ({ commentQuery }) => {
  if (commentQuery.isLoading) return <p>Loading...</p>;
  if (commentQuery.isError) return <p>Error: {commentQuery.error}</p>;

  return (
    <div>
      <p>{commentQuery.data.id}</p>
      <p>{commentQuery.data.name}</p>
      <p>{commentQuery.data.email}</p>
      <p>{commentQuery.data.body}</p>
    </div>
  );
};

const Caching = () => {
  const [numOfInstance, setNumOfInstance] = React.useState([1]);

  const fetchComment = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments/1`
    );

    return response.json();
  };

  const commentQuery = useQuery("comment", fetchComment);

  return (
    <div>
      <h1>React Query - Caching</h1>

      {/* Data will appear instantly for new mount of instance cause 
      the first fetch is stored in cache until 5 minutes (default option), 
      but will still do background refetch, and 
      if success will update it with a new data */}

      {numOfInstance.map((instance, index) => (
        <ListComment key={index} commentQuery={commentQuery} />
      ))}

      <button onClick={() => setNumOfInstance([...numOfInstance, 1])}>
        Add Instance
      </button>
    </div>
  );
};

export default Caching;
