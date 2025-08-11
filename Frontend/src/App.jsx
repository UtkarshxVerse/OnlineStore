import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayout from './Admin/Pages/adminLayout';
import WebsiteLayout from './Website/Pages/WebsiteLayout';
import Dashboard from './Admin/Pages/dashboard';
import ViewCategory from './Admin/Pages/category/ViewCategory';
import AddCategory from './Admin/Pages/category/AddCategory';
import Contact from './Website/Pages/Contact';
import Home from './Website/Pages/Home';
import EditCategory from './Admin/Pages/category/EditCategory';
import ViewColor from './Admin/Pages/color/ViewColor';
import AddColor from './Admin/Pages/color/AddColor';
import EditColor from './Admin/Pages/color/EditColor';
import ViewProduct from './Admin/Pages/product/ViewProduct';
import AddProduct from './Admin/Pages/product/AddProduct';
import EditProduct from './Admin/Pages/product/EditProduct';
import MultipleImages from './Admin/Pages/product/MultipleImages';
import LoginPage from './Admin/Pages/LoginPage';
import Store from './Website/Pages/Store';
import Cart from './Website/Pages/Cart';
import { useDispatch } from 'react-redux';
import { lsToAdmin } from './redux/features/adminSlice';
import AuthForm from './Website/Pages/AuthForm';
import { lsToUser } from './redux/features/userSlice';
import ProductView from './Website/Pages/ProductView';

export default function App() {
  const dispatcher = useDispatch();

  useEffect(
    () => {
      dispatcher(lsToAdmin())
      dispatcher(lsToUser())
    },[]
  )

  const routers = createBrowserRouter([
    {
      path: "/",
      element : <WebsiteLayout/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/contact",
          element: <Contact/>
        },
        {
          path: "/store/:categorySlug?",
          element: <Store/>
        },
        {
          path:"/cart",
          element: <Cart/>
        },
        {
          path:"/view",
          element: <ProductView/>
        }
      ]
    }
    ,
    {
      path: "/admin",
      element: <AdminLayout/>,
      children: [
        {
          path: "/admin",
          element: <Dashboard/>
        },
        {
          path: "category",
          element: <ViewCategory/>
        },
        {
          path: "category/add",
          element: <AddCategory/>
        },
        {
          path: "category/edit/:categoryId",
          element: <EditCategory/>
        },
        {
          path: "color",
          element: <ViewColor/>
        },
        {
          path: "color/add",
          element: <AddColor/>
        },
        {
          path: "color/edit/:colorId",
          element: <EditColor/>
        },
        {
          path: "product",
          element: <ViewProduct/>
        },
        {
          path: "product/add",
          element: <AddProduct/>
        },
        {
          path: "product/edit/:productId",
          element: <EditProduct/>
        },
        {
          path: "product/multiple/:productId",
          element: <MultipleImages/>
        },
      ]
    },
    {
      path: "/admin/login",
      element: <LoginPage/>
    },
    {
      path: "/login",
      element: <AuthForm/>
    }
  ])
  return (
    <RouterProvider router = {routers}/>
  )
}
