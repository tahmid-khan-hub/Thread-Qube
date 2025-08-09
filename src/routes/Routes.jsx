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
import UserDashboardHome from "../pages/UserDashboardHome/UserDashboardHome";
import CommentsPage from "../privatePages/CommentsPage/CommentsPage";
import Reports from "../AdminPages/Reports/Reports";
import DashBoardRedirect from "../layout/DashBoardRedirect";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Forbidden from "../pages/Forbidden/Forbidden";
import About from "../pages/About/About";
import FaQ from "../pages/FaQ/FaQ";
import FeedBack from "../privatePages/Feedback/FeedBack";
import AllFeedbacks from "../AdminPages/AllFeedbacks/AllFeedbacks";
import UserSettingsPage from "../privatePages/UserSettingsPage/UserSettingsPage";
import Terms from "../pages/Terms/Terms"
import Privacy from "../pages/Privacy/Privacy";
import AdminSettings from "../AdminPages/AdminSettings/AdminSettings";
import EditPage from "../AdminPages/EditPage/EditPage";
import UserRoute from "../router/UserRoute";

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
          path: "terms",
          element: <Terms></Terms>
        },
        {
          path: "privacy",
          element: <Privacy></Privacy>
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
        },
        {
          path: "/comments/:postId",
          element: <PrivateRoute>
            <CommentsPage />
            </PrivateRoute>
        },
        {
          path: "forbidden",
          element: <Forbidden></Forbidden>,
        },
        {
          path: "about",
          element: <About></About>
        },
        {
          path: "faq",
          element: <FaQ></FaQ>
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
        index: true,
        element: <PrivateRoute>
          <DashBoardRedirect></DashBoardRedirect>
        </PrivateRoute>
      },
      {
        path: "dashboardHome",
        element: <UserRoute>
          <UserDashboardHome />
          </UserRoute>
      },
      {
        path: "dashboard/addPost",
        element: <UserRoute>
          <AddPost></AddPost>
        </UserRoute>
      },
      {
        path: "dashboard/myPosts",
        element: <UserRoute>
          <MyPosts></MyPosts>
        </UserRoute>
      },
      {
        path: "dashboard/myProfile",
        element: <UserRoute>
          <MyProfile></MyProfile>
        </UserRoute>
      },
      {
        path: "dashboard/feedback",
        element: <UserRoute>
          <FeedBack></FeedBack>
        </UserRoute>
      },
      {
        path: "dashboard/userSettings",
        element: <UserRoute>
          <UserSettingsPage></UserSettingsPage>
        </UserRoute>
      },

      // admin routes
      {
        path: "adminProfile",
        element: <AdminRoute>
          <AdminProfile></AdminProfile>
        </AdminRoute>
      },
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
      },
      {
        path: "dashboard/reportedActivities",
        element: <AdminRoute>
          <Reports></Reports>
        </AdminRoute>
      },
      {
        path: "dashboard/allFeedbacks",
        element: <AdminRoute>
          <AllFeedbacks></AllFeedbacks>
        </AdminRoute>
      },
      {
        path: "dashboard/adminSettings",
        element: <AdminRoute>
          <AdminSettings></AdminSettings>
        </AdminRoute>
      },
      {
        path: "/dashboard/dashboard/editPage/:id",
        element: <AdminRoute>
          <EditPage></EditPage>
        </AdminRoute>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
]);

export default Routes;
