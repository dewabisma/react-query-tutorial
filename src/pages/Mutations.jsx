import * as React from "react";
import { useMutation } from "react-query";
import { postData } from "../utils/fetch";

const Mutations = () => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [userId, setUserId] = React.useState(0);

  const mutation = useMutation(({ url, data }) => postData(url, data));

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const request = {
      url: "https://jsonplaceholder.typicode.com/posts",
      data: {
        title,
        body,
        userId,
      },
    };

    mutation.mutate(request);
  };

  if (mutation.isLoading) return <h1>Loading...</h1>;

  if (mutation.isError) return <h1>Error Found: {mutation.error}</h1>;

  return (
    <div>
      <h1>React Query - Mutations</h1>

      {mutation.isSuccess && (
        <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
      )}

      <form
        style={{ display: "flex", flexDirection: "column" }}
        action="POST"
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="body">Body</label>
        <input
          id="body"
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          type="number"
          min="0"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Mutations;
