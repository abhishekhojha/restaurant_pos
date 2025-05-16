const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
const UserRouter = require("./routes/UserRouter");
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", UserRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
