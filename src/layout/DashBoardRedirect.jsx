import React, { useEffect } from "react";
import useUserRole from "../hooks/useUserRole";
import { useNavigate } from "react-router";
import Loader from "../pages/Loader/Loader";

const DashBoardRedirect = () => {
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roleLoading) {
      if (role === "admin") {
        navigate("/dashboard/dashboard/adminDashboard");
      } else {
        navigate("/dashboard/dashboardHome");
      }
    }
  }, [role, roleLoading, navigate]);

  if (roleLoading) return <Loader />;
  return null;
};

export default DashBoardRedirect;
