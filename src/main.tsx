import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Board } from "./Board.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BoardDetail } from "./BoardDetail.tsx";
import { LoginProvider } from "./LoginContextProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path=":room">
              <Route index element={<Board />} />
              <Route path=":pid" element={<BoardDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </QueryClientProvider>
  </StrictMode>,
);
