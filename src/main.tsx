import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Rumors } from "./Rumors.tsx";
import { Projects } from "./Projects.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProjectsDetail } from "./ProjectsDetail.tsx";
import { LoginProvider } from "./LoginContextProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/rumors" element={<Rumors />} />
            <Route path="/projects">
              <Route index element={<Projects />} />
              <Route path=":pid" element={<ProjectsDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </QueryClientProvider>
  </StrictMode>,
);
