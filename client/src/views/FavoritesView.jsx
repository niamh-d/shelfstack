/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router";

import Navigation from "../components/Navigation";
import ShelvesFilterAndSort from "../components/ShelvesFilterAndSort";
import ShelvesGrid from "../components/ShelvesGrid";

import { useAuth } from "../contexts/AuthContext";
import { useShelves } from "../contexts/ShelvesContext";

const Favorites = () => {
  const { displayedUsersFavorites, currentUser } = useShelves();
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      navigate("/login");
    }
  }, [isAuthenticated, currentUser]);

  return (
    <div>
      <Navigation />
      <div id="Favorites">
        <h2 className="page-title">My Favorites</h2>
        <ShelvesFilterAndSort arrayType="favor" />
        <ShelvesGrid shelves={displayedUsersFavorites} />
      </div>
    </div>
  );
};

export default Favorites;
