import { useParams } from "react-router-dom";

import { useShelves } from "../contexts/ShelvesContext";

import Item from "./Item";
import Navigation from "./Navigation.jsx";
import AddItemForm from "./AddItemForm.jsx";

const StandAloneShelf = () => {
  const { usersShelvesItems, appsShelvesItems, appsShelves, usersShelves } =
    useShelves();

  let { shelfId } = useParams();

  shelfId = +shelfId;

  let isOwner = false;

  if (usersShelves.length > 0)
    isOwner = usersShelves.map((shelf) => shelf.shelfId).includes(shelfId);

  const combinedShelvesItemsArray = [...usersShelvesItems, ...appsShelvesItems];
  const combinedShelvesArray = [...usersShelves, ...appsShelves];

  const itemsObj = combinedShelvesItemsArray.find(
    (obj) => obj.shelfId === shelfId
  );

  const { shelfName } = combinedShelvesArray.find(
    (shelf) => shelf.shelfId === shelfId
  );

  return (
    <div id="StandAloneShelf">
      <Navigation />
      <h2 className="page-title">{shelfName}</h2>
      {isOwner && <AddItemForm shelfId={shelfId} />}
      <div className="shelves">
        {!itemsObj && <p>This shelf does not have any items yet.</p>}
        {!itemsObj && isOwner && <p>Why not add some!?</p>}
        {itemsObj &&
          itemsObj.items.map((item) => <Item key={item.itemId} item={item} />)}
      </div>
    </div>
  );
};

export default StandAloneShelf;
