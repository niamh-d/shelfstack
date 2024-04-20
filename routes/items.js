var express = require("express");
var router = express.Router();

const { getLinkPreview } = require("link-preview-js");

const db = require("../model/helper");

const MAX_L = 250;

function shortenStr(str) {
  return str.length > MAX_L ? str.substring(0, MAX_L) : str;
}

// All routes take /items on fetch requests

// 1. ADD ITEM TO SHELF
router.post("/item/new", async (req, res) => {
  try {
    const { shelfId } = req.query;
    const { url } = req.body;

    const preview = await getLinkPreview(url);

    const title = shortenStr(preview.title);
    const siteName = shortenStr(preview.siteName);
    const description = shortenStr(preview.description);

    const image = preview.images[0].length > MAX_L ? null : preview.images[0];

    // Insert the item into the items table with the provided data and the shelfId
    await db(
      `INSERT INTO items (shelf_id, url, title, site_name, description, image) VALUES ('${shelfId}', '${url}', '${title}', '${siteName}', '${description}', '${image}');`
    );

    res.status(201).json({ message: "Item added to shelf successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// 2. GET ALL ITEMS FOR SELECTED SHELF
router.get("/shelf", async (req, res) => {
  try {
    const { shelfId } = req.query;

    // Query to select the items in the specified shelf
    const results = await db(`
      SELECT * FROM items WHERE shelf_id = ${shelfId};
    `);

    const items = results.data;

    res.status(200).send(items);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// 3. DELETE ITEM
router.delete("/item/delete", async (req, res) => {
  try {
    const { itemId } = req.query;

    // Query to delete the specified item
    await db(`
      DELETE FROM items WHERE item_id = ${itemId};
    `);

    res.status(202).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
