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
import MainLayout from './components/MainLayout/MainLayout.tsx';
import { Feed } from './components/index.ts';
import { Modal, ModalProvider } from './context/Modal.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Feed />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
      <Modal />
    </ModalProvider>
  </React.StrictMode>,
)
