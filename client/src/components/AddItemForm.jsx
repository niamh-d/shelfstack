import { useState } from "react";
import { useShelves } from "../contexts/ShelvesContext";

const AddItemForm = ({ shelfId }) => {
  const { addItemToShelf } = useShelves();

  const [newItemDetails, setNewItemDetails] = useState({
    url: "",
  });

  const [URLIsInvalid, setURLIsInvalid] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value.trim();
    const elId = e.target.id;

    setNewItemDetails((prev) => ({
      ...prev,
      [elId]: val,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newItemDetails.url.substring(0, 4) !== "http") {
      setURLIsInvalid(true);
      return;
    } else setURLIsInvalid(false);

    // MAKE SURE TO REMOVE HARD-CODED SHELF-ID WHEN COMPONENT INTEGRATED INTO REST OF APP
    addItemToShelf(newItemDetails, shelfId);
  };

  return (
    <div id="AddItemForm">
      <form onSubmit={handleSubmit}>
        <h2>Add New Item</h2>
        <label htmlFor="url">Item URL</label>
        <input type="text" id="url" onChange={handleChange} />
        {URLIsInvalid && (
          <p>
            Please provide a valid URL beginning with &apos;http(s)://&apos;.
          </p>
        )}
        <button id="main" type="submit" onClick={handleSubmit}>
          Add item
        </button>
        <button>Cancel</button>
      </form>
    </div>
  );
};

export default AddItemForm;
