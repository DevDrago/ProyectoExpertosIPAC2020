const express = require("express");
const tower = express();

tower.use(require("./usuarios"));

module.exports = tower;