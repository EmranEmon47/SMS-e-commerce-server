const mongoose = require("mongoose");
const app = require("./app");

// Application port
const port = process.env.PORT || 3000;

// Connect to databsae and run this application
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
    // Application running
    app.listen(port, () => console.log("Server runing is port", port));
  })
  .catch((err) => console.log("MongoDB Connection Error: ", err));