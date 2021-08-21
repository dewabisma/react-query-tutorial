import * as React from "react";
import { useQuery, useQueryClient } from "react-query";

const Prefetching = () => {
  const queryClient = useQueryClient();

  const [commentId, setCommentId] = React.useState(1);

  const fetchComments = async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments/${id}`
    );

    return response.json();
  };

  const prefetchPrevComment = React.useCallback(async () => {
    const prevId = commentId - 1 < 1 ? 500 : commentId - 1;
    await queryClient.prefetchQuery(
      ["comment", prevId],
      () => fetchComments(prevId),
      {
        staleTime: 60 * 1000,
      }
    );
  }, [commentId, queryClient]);

  const prefetchNextComment = React.useCallback(async () => {
    const nextId = commentId + 1 <= 500 ? commentId + 1 : 1;
    await queryClient.prefetchQuery(
      ["comment", nextId],
      () => fetchComments(nextId),
      {
        staleTime: 60 * 1000,
      }
    );
  }, [commentId, queryClient]);

  const commentQuery = useQuery(
    ["comment", commentId],
    () => {
      return fetchComments(commentId);
    },
    {
      //if not setting stale time, it will be fetched again to update the data,
      //set it correctly to optimize refetching time

      staleTime: 60 * 1000,
    }
  );

  React.useEffect(() => {
    prefetchNextComment(commentId);
    prefetchPrevComment(commentId);
  }, [commentId, prefetchNextComment, prefetchPrevComment]);

  if (commentQuery.isFetching) return <h1>Background fetching...</h1>;

  if (commentQuery.isLoading) return <h1>Loading...</h1>;

  if (commentQuery.isError)
    return <h1>Error Found: {commentQuery.error.message}</h1>;

  return (
    <div>
      <h1>React Query - Prefetching</h1>

      <button
        onClick={() =>
          commentId - 1 < 1 ? setCommentId(500) : setCommentId(commentId - 1)
        }
        // onMouseEnter={() => prefetchPrevComment()}
      >
        Prev Comment
      </button>
      <button
        onClick={() =>
          commentId + 1 <= 500 ? setCommentId(commentId + 1) : setCommentId(1)
        }
        // onMouseEnter={() => prefetchNextComment()}
      >
        Next Comment
      </button>

      <div>
        <p>{commentQuery.data.id}</p>
        <p>{commentQuery.data.name}</p>
        <p>{commentQuery.data.email}</p>
        <p>{commentQuery.data.body}</p>
      </div>
    </div>
  );
};

export default Prefetching;
