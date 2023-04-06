import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import App from './App'
import { store } from './store'
import 'flowbite'
import {
  createBrowserRouter,
  Router,
  RouterProvider,
} from 'react-router-dom';
import Login from './components/LoginPage'
import RegisterComp from './components/RegisterComp'
import Root from './routes/root'
import ErrorPage from './pages/error-page'
import CreateProduct from './components/CreateProduct'
import useAuth from './hooks and utils/useAuth'
import ProtectedRoute from './hooks and utils/ProtectedRoute'
import HomeLayOut from './components/layouts/HomeLayOut'
import DetailPage from './components/DetailPage'
import ShoppingCartComp from './components/ShoppingCart'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <HomeLayOut/>
    },
      {
        path: '/createProduct',
        element:
          <CreateProduct/>
      },
      {
        path: '/products/:id',
        element: <DetailPage />
      },
    ]
  },
  {
    path: '/some',
    element: <ListUserProduct />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <RegisterComp />,
  }
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
)

root.render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
      )