const express = require("express");

const router = express.Router();
const Client = require("../models/client");

// Get All Client

router.get("/getclients", async (req, res) => {
  try {
    let clients = await Client.find({});

    res.status(200).json({ success: true, clients });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/getclient/:id", async (req, res) => {
  try {
    let client = await Client.findById(req.params.id);
    if (!client) {
      return res
        .status(500)
        .json({ success: false, message: "Client Not Available With this Id" });
    }
    res.status(200).json({ success: true, client });
  } catch (error) {
    console.log(error.message);
  }
});

// Create Client

router.post("/create", async (req, res) => {
  try {
    let client = await Client.findOne({ email: req.body.email });

    if (client) {
      return res.status(400).json({
        success: false,
        message: "Client already exist with this email adress",
      });
    }

    client = await Client.create(req.body);

    res.status(200).json({ success: true, client });
  } catch (error) {
    console.log(error.message);
  }
});

// Update Client

router.put("/client/update/:id", async (req, res) => {
  try {
    let client = await Client.findById(req.params.id);

    if (!client) {
      return res
        .status(500)
        .json({ success: false, message: "Client Not Available With this Id" });
    }

    client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ success: true, client });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Client

router.delete("/client/delete/:id", async (req, res) => {
  let client = await Client.findByIdAndDelete(req.params.id);

  if (!client) {
    return res
      .status(500)
      .json({ success: false, message: "Client Not Available With this Id" });
  }

  res
    .status(200)
    .json({ success: true, message: "Client Deleted Successfully" });
});

module.exports = router;
