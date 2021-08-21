import * as React from "react";
import { useQuery } from "react-query";

const BasicFetch = () => {
  const fetchUsers = async () => {
    // try catch will now work cause fetch doesn't throw error by nature in http req error
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    return response.json();
  };

  const usersQuery = useQuery("users", fetchUsers);

  return (
    <div>
      <h1>React Query - Basic Fetch</h1>

      <button>Next Data</button>

      <button>Prev Data</button>

      <ul aria-label="user name list">
        {usersQuery.data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BasicFetch;
