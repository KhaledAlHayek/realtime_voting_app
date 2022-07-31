const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// DB Config
const connectDB = require("./config/db");
connectDB();

// Init app
const app = express();

// logging
app.use(morgan("dev"));

// Set atatic folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable cors
app.use(cors());

// Routes
app.use("/poll", require("./routes/poll"));

// port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app is listening on PORT ${PORT}`);
});