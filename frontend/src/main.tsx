import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Landing } from './routes/index.ts';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from './routes/Login/Login.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
