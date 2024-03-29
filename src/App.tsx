import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import logo from "./logo.svg";
import "./App.css";
import MarvelApp from "./containers/marvel-app";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <MarvelApp/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
