/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useShelves } from "../contexts/ShelvesContext";

const TitlePage = () => {
  const { isAuthenticated, checkAuthentication } = useAuth();
  const { currentUser } = useShelves();

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <div className="container">
      <h1>ShelfStack</h1>
      <p>
        ShelfStack is a web app that allows users to make collections of links
        to their favourite online learning content by topic and share these
        collections with others.
      </p>
      <Link to={"/explore-shelves"}>
        <button id="start">
          {!isAuthenticated ? "Explore!" : "Expore all shelves"}
        </button>
      </Link>
      {!isAuthenticated && (
        <>
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
          <Link to={"signup"}>
            <button>Sign Up</button>
          </Link>
        </>
      )}
      {isAuthenticated && currentUser && (
        <Link to={`/profile/${currentUser.userId}`}>
          <button>Take me to my profile</button>
        </Link>
      )}
    </div>
  );
};

export default TitlePage;
