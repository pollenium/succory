#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var __1 = require("../");
var configJsPath = process.argv[0];
console.log(configJsPath);
var config = require(configJsPath);
var ts = __1.getTs(config);
console.log(ts);
