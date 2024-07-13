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
// import Login from './routes/Login/Login.tsx';
import MainLayout from './components/MainLayout/MainLayout.tsx';
import { Modal, ModalProvider } from './context/Modal.tsx';
import * as sessionActions from './store/session.ts'
import { Provider } from 'react-redux';
import { configureStore } from './store/store.ts';
import { restoreCSRF } from './utils/csrf.ts';
import { csrfFetch } from './utils/csrf.ts';
import Explore from './routes/Explore/Explore.tsx';
import UserProfile from './routes/UserProfile/UserProfile.tsx';
import NotFound from './routes/NotFound/NotFound.tsx';

const store = configureStore({});

// restoreCSRF();

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
        element: <Landing />
      },
      {
        path: "channels/:channelName",
        element: <Explore />
      },
      {
        path: ":user",
        element: <UserProfile />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ModalProvider>
      <RouterProvider router={router} />
      <Modal />
    </ModalProvider>
  </Provider>
  // </React.StrictMode>,
)
