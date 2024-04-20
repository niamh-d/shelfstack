const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const mime = require("mime-types");
//node packages for working with files (renaming, creating, deleting etc)
const fs = require("fs/promises");
const path = require("path");
//multer package
const multer = require("multer");
const upload = multer({ dest: "public/imgs/" });

router.put("/image/add", upload.single("avatar"), async (req, res) => {
  // file info is available at req.file, multer middleware places the info there
  const file = req.file;

  // check the extension of the file
  const extension = mime.extension(file.mimetype);
  //create name including extension
  const fullfilename = file.filename + "." + extension;

  // grab the filepath for the temporary file
  const tmp_path = file.path;

  // construct the new path for the final file
  const target_path = path.join(__dirname, "../public/imgs/") + fullfilename;

  try {
    const { userId } = req.query;

    // rename the file
    await fs.rename(tmp_path, target_path);

    // store image in the DB
    await db(
      `UPDATE users SET image = "${fullfilename}" WHERE user_id = ${userId};`
    );
    res.status(201).json({ message: "Profile image added successfully" });
  } catch (err) {
    console.error("Error adding user profile image:", err);
    res.status(500).send(err);
  }
});

router.get("/user", async (req, res) => {
  try {
    const { userId } = req.query;

    const results = await db(`
      SELECT user_id AS userId, first_name AS firstName, last_name AS lastName, user_bio AS userBio, username, email, follower_count AS followerCount, image FROM users WHERE user_id = ${userId};
    `);

    res.status(200).send(results.data[0]);
  } catch (error) {
    console.error("Error retrieving user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
