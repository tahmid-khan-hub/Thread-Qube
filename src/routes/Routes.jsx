import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout"
import Home from "../components/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register";
import DashBoardLayout from "../layout/DashBoardLayout";
import PrivateRoute from "../router/PrivateRoute"

const Routes = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children:[
        {
          path: "",
          Component: Home,
        },
        {
          path: "login",
          Component: Login,
        },
        {
          path: "register",
          Component: Register,
        }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoute>,
    children:[
      {

      }
    ]
  }
]);

export default Routes;
