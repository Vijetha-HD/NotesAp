const express = require("express");
const path = require("path");
const connectToDatabase = require("./database/dbConfig");
const noteRoutes = require("./routes/index");
const errorMiddleware = require("./middlewares/error");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// API routes
app.use(noteRoutes);

// Serve React frontend (after building React app into `client/build`)
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(app.get("env"));
  });
});
