const express = require("express");
const user_routes = require("./user_routes");
const banner_routes = require("./banner_routes");
const router = express.Router();

router.use('/users', user_routes);
router.use('/banners', banner_routes);

module.exports = router;