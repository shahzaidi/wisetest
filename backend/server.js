const express = require("express");
const dataBaseConnection = require("./database");
const cors = require("cors");
let client = require("./routes/clientRoute");

const app = express();

const PORT = 8000;

dataBaseConnection();

app.use(express.json());
app.use(cors());
app.use("/api/v1", client);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
