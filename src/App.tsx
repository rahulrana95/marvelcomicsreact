import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import logo from "./logo.svg";
import "./App.css";
import MarvelApp from "./containers/marvel-app";

// Create a client
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Bangers&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <MarvelApp />
      </div>
    </QueryClientProvider>
  );
}

export default App;
