const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/members", require("./routes/api/members"));
app.use("/api/vehicles", require("./routes/api/vehicles"));
app.use("/api/combined", require("./routes/api/combined"));

app.listen(3001, () => {
  console.log("Your server is running on 3001");
});
