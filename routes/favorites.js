var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/all/user", async (req, res) => {
  try {
    const { userId } = req.query;

    const results = await db(
      `SELECT shelf_id AS shelfId, s.user_id AS ownerId, shelf_name AS shelfName, shelf_description AS shelfDescription, category, num_voters AS numVoters, ROUND(count_rating / num_voters) AS rating, shelf_add_date AS shelfAddDate, is_public AS isPublic FROM shelves AS s INNER JOIN favorites AS f USING(shelf_id) WHERE f.user_id = ${userId};`
    );

    res.status(201).send(results.data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/new", async (req, res) => {
  try {
    const { userId, shelfId } = req.query;

    await db(
      `INSERT INTO favorites (user_id, shelf_id) VALUES (${userId}, ${shelfId});`
    );

    res.status(201).json({ message: "Favorite added successfully" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/remove", async (req, res) => {
  try {
    const { userId, shelfId } = req.query;

    const results = await db(
      `SELECT fav_id FROM favorites WHERE user_id = ${userId} AND shelf_id = ${shelfId}`
    );

    const { fav_id } = results.data[0];

    await db(`DELETE FROM favorites WHERE fav_id = ${fav_id};`);

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
