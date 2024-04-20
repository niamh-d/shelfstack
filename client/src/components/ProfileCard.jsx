import { useShelves } from "../contexts/ShelvesContext";
import { useState } from "react";
import { Tooltip } from "@mui/material";

const ProfileCard = () => {
  const { currentUser, addUserAvatar } = useShelves();
  const [avatar, setAvatar] = useState(null);
  const [isFileInputVisible, setIsFileInputVisible] = useState(false);

  const { firstName, username, followerCount, image, userBio } = currentUser;

  const onFileChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const onFileUpload = () => {
    addUserAvatar(avatar);
    setIsFileInputVisible(!isFileInputVisible); // Toggle file input visibility
  };

  const toggleFileInputVisibility = () => {
    setIsFileInputVisible(!isFileInputVisible); // Toggle file input visibility
  };

  return (
    <div className="profile-card">
      <div className="top">
        <div className="image">
          <Tooltip title="Click image to update">
            {/* UPDATE TO USE CURRENT USER IMAGE */}
            <img
              onClick={toggleFileInputVisibility}
              id="profile-img"
              src={`/imgs/${image}`}
              alt="profile image"
            />
          </Tooltip>
        </div>

        <div className="info">
          <h2>{firstName}</h2>
          <h3>@{username}</h3>
          <p>{userBio}</p>
          <h3>Followers: {followerCount}</h3>
        </div>
      </div>
      {isFileInputVisible && (
        <div className="upload">
          {/* CHANGE INPUT SIZE */}
          <input
            type="file"
            onChange={onFileChange}
            style={{ display: "block", margin: "10px 0" }}
          />
          <button onClick={onFileUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
