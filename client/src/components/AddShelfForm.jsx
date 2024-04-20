import { useShelves } from "../contexts/ShelvesContext";
import { useState } from "react";

//Material icons
import { Tooltip, IconButton } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

const AddShelfForm = ({ closeHandler }) => {
  const { addShelf, categoriesArray } = useShelves();

  const [newShelfDetails, setNewShelfDetails] = useState({
    shelfName: null,
    shelfDescription: null,
    category: null,
    isPublic: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Error message if shelf name and/or category is empty
    if (!newShelfDetails.shelfName.trim() || !newShelfDetails.category.trim()) {
      alert("Shelf Name and Category cannot be empty");
      return;
    }

    addShelf(newShelfDetails);
    closeHandler();
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setNewShelfDetails((prev) => ({
      ...prev,
      [name]: value,
      isPublic: event.target.checked || prev.isPublic,
    }));
  };

  return (
    <div id="AddShelfForm">
      <form onSubmit={handleSubmit}>
        <h2>Create a new shelf!</h2>

        <input
          type="text"
          name="shelfName"
          onChange={handleChange}
          placeholder="Shelf Name"
        />
        <input
          type="text"
          name="shelfDescription"
          onChange={handleChange}
          placeholder="Shelf Description"
        />
        <select name="category" onChange={handleChange}>
          <option value="">--Select Category--</option>
          {categoriesArray &&
            categoriesArray.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
        <div className="public">
          <label>
            <input type="checkbox" name="isPublic" onChange={handleChange} />
            Public
          </label>
          <span>
            <Tooltip title="Set to Public to allow other users to see the shelf">
              <IconButton>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </span>
        </div>
        <div className="buttons">
          <button id="main" type="submit">
            Add Shelf
          </button>
          <button id="secondary" type="button" onClick={closeHandler}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShelfForm;
