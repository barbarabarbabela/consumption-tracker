"use strict";
const express = require("express");
require("dotenv").config();
console.log(process.env); // remove this after you've confirmed it is working
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
