const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const bodyParser = require("body-parser");

const usersRouter = require("./core/routes/users");
const authRouter = require("./core/routes/auth");
const clientRouter = require("./core/routes/client");

const mockClient = require("./clients");

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost/buckit";

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

// Core APIs
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/client", clientRouter);

// Mock client APIs
app.use("/mock/client", mockClient);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port);