/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import FavoriteBorder from "@mui/icons-material/FavoriteBorder.js";
import Favorite from "@mui/icons-material/Favorite.js";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import LaunchIcon from "@mui/icons-material/Launch";

import { useShelves } from "../contexts/ShelvesContext";

const Shelf = ({ shelf }) => {
  const {
    usersFavorites,
    usersShelvesItems,
    appsShelvesItems,
    favorShelf,
    removeFavor,
  } = useShelves();

  const {
    shelfId,
    shelfName,
    category,
    isPublic,
    rating,
    numVoters,
    shelfDescription,
  } = shelf;

  const shelfIsFavored = usersFavorites
    .map((fav) => fav.shelfId)
    .includes(shelfId)
    ? true
    : false;

  const combinedItemsArray = [...usersShelvesItems, ...appsShelvesItems];
  const itemsObj = combinedItemsArray.find((obj) => obj.shelfId === shelfId);

  const image = itemsObj ? itemsObj.items[0].preview.image : null;

  const itemsCount = itemsObj ? itemsObj.items.length : 0;

  const navigate = useNavigate();

  const favorHandler = () => {
    if (!shelfIsFavored) favorShelf(shelfId);
    if (shelfIsFavored) removeFavor(shelfId);
  };

  return (
    <div className="shelf">
      <div className="rate">
        {rating > 0 && (
          <ul className="stars">
            <li>
              {Array.from({ length: rating }, () => 0).map((_, i) => (
                <StarRateRoundedIcon key={i} />
              ))}
            </li>
          </ul>
        )}
        <div className="fav">
          <div onClick={() => navigate(`/shelf/${shelfId}`)}>
            <LaunchIcon />
          </div>
          <div onClick={favorHandler}>
            {!shelfIsFavored && <FavoriteBorder />}
            {shelfIsFavored && <Favorite />}
            {!isPublic && <LockOutlinedIcon />}
          </div>
        </div>
      </div>
      <h2>{shelfName}</h2>

      {image ? <img src={image} alt="shelf preview image" /> : null}

      <p>{shelfDescription}</p>
      <ul>
        <li id="category-li">{category}</li>
        {isPublic === 1 && (
          <>
            <li>No. Votes: {numVoters}</li>
          </>
        )}
      </ul>
      <ul>
        {itemsCount > 1 && <li>{itemsCount} items</li>}
        {itemsCount === 1 && <li>1 item</li>}
        {itemsCount === 0 && <li>no items yet</li>}
      </ul>
    </div>
  );
};

export default Shelf;
