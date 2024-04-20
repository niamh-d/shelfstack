var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// All routes take /shelves on fetch requests

/* 1. ADD SHELF */
router.post("/shelf/new", async (req, res) => {
  try {
    console.log(req.query);
    const userId = req.query.userId;
    const { shelfName, shelfDescription, category, isPublic } = req.body;

    console.log(req.body);

    // Query to create a new shelf for the given user with supplied user_id
    await db(
      `INSERT INTO shelves (user_id, shelf_name, shelf_description, category, is_public) VALUES ('${userId}', '${shelfName}', '${shelfDescription}', '${category}', ${isPublic});`
    );
    res.status(201).json({ message: "Shelf created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// 2. GET ALL OF USER'S SHELVES
router.get("/all/user", async (req, res) => {
  try {
    const userId = req.query.userId;

    // Query to select all shelves for the given user_id
    const results = await db(
      `SELECT * FROM shelves WHERE user_id = ${userId};`
    );

    res.status(200).send(results.data);
  } catch (error) {
    console.error("Error retrieving shelves for user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//3. GET ALL SHELVES FOR THIS APP
router.get("/all/app", async (req, res) => {
  try {
    // Query to return all data in shelves table
    const results = await db(`
      SELECT * FROM shelves WHERE is_public = 1;
    `);

    res.status(200).send(results.data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//4. DELETE SHELF FROM SHELVES TABLE AND ALL ASSOCIATED ITEMS IN ITEMS TABLE
router.delete("/shelf/delete", async (req, res) => {
  try {
    const { shelfId } = req.query;

    // Query to delete all items associated with the shelf
    // Query to delete the specified shelf
    await db(`
      DELETE FROM items WHERE shelf_id = ${shelfId};
      DELETE FROM shelves WHERE shelf_id = ${shelfId};
    `);

    res.status(202).json({ message: "Shelf deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
