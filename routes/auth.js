var express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var router = express.Router();

const BCRYPT_WORK_FACTOR = 12;

const supersecret = process.env.SUPERSECRET;

const db = require("../model/helper");

const renderUserObj = (user) => {
  return {
    userId: user.user_id,
    username: user.username,
    userBio: user.user_bio,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    followerCount: user.follower_count,
    image: user.image,
  };
};

router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const credential = usernameOrEmail.split("").includes("@")
    ? "email"
    : "username";

  try {
    const results = await db(
      `SELECT * FROM users WHERE ${credential} = '${usernameOrEmail}';`
    );
    const user = results.data[0];

    if (user) {
      const userId = user.user_id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      const token = jwt.sign({ userId }, supersecret);

      const userObj = renderUserObj(user);

      res.send({ token, user: userObj });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/signup", async function (req, res, next) {
  try {
    const { firstName, lastName, email, username, password, userBio } =
      req.body;

    const hashedPW = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    await db(`INSERT INTO users(first_name, last_name, email, username, password, image, user_bio)
  VALUES ('${firstName}', '${lastName}', '${email}', '${username}', '${hashedPW}', 'default.png', '${userBio}');`);

    const results = await db(
      `SELECT * FROM users ORDER BY user_id DESC LIMIT 1;`
    );
    const userObj = renderUserObj(results.data[0]);

    res.send(userObj);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/check_auth", async function (req, res, next) {
  try {
    const authHeading = req.headers.authorization;

    const token = authHeading.substring(7);
    const decoded = jwt.verify(token, supersecret);
    const { userId } = decoded;

    const results = await db(`SELECT * FROM users WHERE user_id = ${userId};`);
    const userObj = renderUserObj(results.data[0]);

    res.send(userObj);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
