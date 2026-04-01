import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const ScrollToTopLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search, location.hash]);

  return <Outlet />;
};
