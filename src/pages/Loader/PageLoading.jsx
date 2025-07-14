import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const PageLoading = ({children}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);

  }, []);

  if(loading) return <Loader></Loader>

  return <>{children}
  </>;
};

export default PageLoading;