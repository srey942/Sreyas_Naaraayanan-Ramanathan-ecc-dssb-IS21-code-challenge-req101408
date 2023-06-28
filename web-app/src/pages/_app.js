import { ThemeContextProvider } from "nextjs-components";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "nextjs-components/src/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  );
  return (
    <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer />
      </QueryClientProvider>
    </ThemeContextProvider>
  );
}

export default App;
