import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useShelves } from "../contexts/ShelvesContext";

const Navigation = () => {
  const { logout, isAuthenticated } = useAuth();
  const { currentUser } = useShelves();

  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/");
    logout();
  };

  return (
    <div id="navigation">
      <div>
        <ul>
          <li>
            <Link to={"/explore-shelves"}>Explore Shelves</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to={`/profile/${currentUser.userId}`}>My Shelves</Link>
              </li>
              <li>
                <Link to={`/favorites/${currentUser.userId}`}>
                  My Favorites
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="user-nav">
        <ul>
          {isAuthenticated && (
            <>
              {currentUser && (
                <div>
                  <span>@{currentUser.username}</span>
                  <img src={`/imgs/${currentUser.image}`} width="50px" />
                </div>
              )}
              <li onClick={logoutHandler}>
                Logout
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
