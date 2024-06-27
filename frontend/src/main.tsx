// @ts-nocheck

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
import * as sessionActions from './store/session.ts'
import { Provider } from 'react-redux';
import { configureStore } from './store/store.ts';
import { restoreCSRF } from './utils/csrf.ts';
import { csrfFetch } from './utils/csrf.ts';

const store = configureStore({});

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

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
      <Provider store={store}>
        <RouterProvider router={router} />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>,
)
