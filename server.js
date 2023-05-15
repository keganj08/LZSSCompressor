const express = require("express");
const app = express();
const path = require("path");
const port = 3003;

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`LempelZiv app is running on port ${port}`);
});