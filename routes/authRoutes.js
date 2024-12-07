var express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/getUsers", async (request, response) => {
  try {
    console.log("started");
    let data = await request.db
      .collection("Account")
      .find({})
      .project()
      .toArray();
    return (
      response &&
      !response.headersSent &&
      response.json({ error: false, data: data })
    );
  } catch (e) {
    console.log(e.message);
    return (
      response &&
      !response.headersSent &&
      response.json({ error: true, message: e })
    );
  }
});


module.exports = router;
