import * as React from "react";
import { useEffect } from "react";
import { navigate } from "gatsby";

// markup
const NotFoundPage = () => {
  // redirect all 404 to the home page
  useEffect(() => {
    navigate("/");
  }, []);
  return null;
};

export default NotFoundPage;
