const express = require("express");
const cors = require("cors");
const app = express();
const DB = require("./config/DB");
require('./config/passport');

const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
const AuthRouter = require("./routes/AuthRouter");
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/", AuthRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
