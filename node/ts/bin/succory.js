#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var __1 = require("../");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var cwd = process.cwd();
var configJsPath = path_1["default"].resolve(cwd, process.argv[2] || 'succory.config.js');
var config = require(configJsPath);
var ts = __1.getTs(config);
var tsPath = path_1["default"].resolve(cwd, config.tsPath);
fs_1["default"].writeFileSync(tsPath, ts, 'utf8');
