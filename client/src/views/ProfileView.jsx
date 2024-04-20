import { useState } from "react";

import ProfileCard from "../components/ProfileCard";
import AddShelfForm from "../components/AddShelfForm";
import ShelvesFilterAndSort from "../components/ShelvesFilterAndSort";
import ShelvesGrid from "../components/ShelvesGrid";
import Navigation from "../components/Navigation";

import { useShelves } from "../contexts/ShelvesContext";

const ProfileView = () => {
  const { displayedUsersShelves } = useShelves();

  const userHasShelves = displayedUsersShelves.length > 0;

  const [showShelfForm, setShowShelfForm] = useState(false);

  const toggleView = () => {
    setShowShelfForm(!showShelfForm);
  };

  return (
    <div id="profile-view">
      <Navigation />
      <div className="profile">
        <div className="left">
          <ProfileCard />
          {!showShelfForm && (
            <button id="add-new" onClick={toggleView}>
              Add new shelf
            </button>
          )}
        </div>
        <div className="right">
          {!showShelfForm && userHasShelves && (
            <ShelvesFilterAndSort arrayType="user" />
          )}
          {!showShelfForm && !userHasShelves && (
            <p>You do not have any shelves yet.</p>
          )}
          {showShelfForm && <AddShelfForm closeHandler={toggleView} />}
        </div>
      </div>
      {userHasShelves && <ShelvesGrid shelves={displayedUsersShelves} />}
    </div>
  );
};

export default ProfileView;
