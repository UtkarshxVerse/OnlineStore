import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayout from './Admin/Pages/adminLayout';
import WebsiteLayout from './Website/Pages/WebsiteLayout';
import Dashboard from './Admin/Pages/dashboard';
import ViewCategory from './Admin/Pages/category/ViewCategory';
import AddCategory from './Admin/Pages/category/AddCategory';
import Contact from './Website/Pages/Contact';
import Home from './Website/Pages/Home';

export default function App() {

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
        }
      ]
    }
  ])
  return (
    <RouterProvider router = {routers}/>
  )
}
