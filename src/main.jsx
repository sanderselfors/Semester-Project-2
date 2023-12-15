import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from 'react-query';
import { router } from "./root.js";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap your app in QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      {/* NOTE: We need to wrap our react app in the tanstack router */}
      <RouterProvider router={router} />
      {/* Add other components that use react-query here */}
    </QueryClientProvider>
  </React.StrictMode>
);
