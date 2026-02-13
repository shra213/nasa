"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const summarize_1 = require("../controllers/summarize");
const router = (0, express_1.Router)();
router.route('/summarize').post(summarize_1.summarize);
exports.default = router;
