import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout"
import Home from "../components/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register";
import DashBoardLayout from "../layout/DashBoardLayout";
import PrivateRoute from "../router/PrivateRoute"
import AddPost from "../privatePages/AddPost/AddPost";
import MyPosts from "../privatePages/MyPosts/MyPosts";
import MyProfile from "../privatePages/MyProfile/MyProfile";
import AdminRoute from "../router/AdminRoute";
import AdminProfile from "../AdminPages/AdminProfile/AdminProfile";
import ManageUsers from "../AdminPages/ManageUsers/ManageUsers";
import Announcement from "../AdminPages/Announcement/Announcement";
import PostDetails from "../pages/PostDetails/PostDetails";
import MembershipCheckout from "../privatePages/MembershipCheckout/MembershipCheckout";

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
        },
        {
          path: "postDetails/:id",
          element: <PostDetails></PostDetails>,
        },
        {
          path: "membership",
          element: <PrivateRoute>
            <MembershipCheckout></MembershipCheckout>
          </PrivateRoute>
        }
    ]
  },

  // dashboard
  {
    path: "dashboard",
    element: <PrivateRoute>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoute>,
    children:[

      // user
      {
        path: "dashboard/addPost",
        element: <PrivateRoute>
          <AddPost></AddPost>
        </PrivateRoute>
      },
      {
        path: "dashboard/myPosts",
        element: <PrivateRoute>
          <MyPosts></MyPosts>
        </PrivateRoute>
      },
      {
        path: "dashboard/myProfile",
        element: <PrivateRoute>
          <MyProfile></MyProfile>
        </PrivateRoute>
      },

      // admin routes
      {
        path: "dashboard/adminProfile",
        element: <AdminRoute>
          <AdminProfile></AdminProfile>
        </AdminRoute>
      },
      {
        path: "dashboard/manageUsers",
        element: <AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
      },
      {
        path: "dashboard/announcements",
        element: <AdminRoute>
          <Announcement></Announcement>
        </AdminRoute>
      }
    ]
  }
]);

export default Routes;
