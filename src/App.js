import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import BasicFetch from "./pages/BasicFetch";
import Caching from "./pages/Caching";
import Mutations from "./pages/Mutations";
import Prefetching from "./pages/Prefetching";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <BasicFetch /> */}
      {/* <Prefetching /> */}
      {/* <Mutations /> */}
      <Caching />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
