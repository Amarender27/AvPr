var express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/getOrders", async (request, response) => {
  try {
    let data = await request.db
      .collection("Orders")
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
