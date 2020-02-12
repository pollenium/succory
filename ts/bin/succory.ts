#!/usr/bin/env node

import { getTs, BinConfig } from '../'
import path from 'path'
import fs from 'fs'

const cwd = process.cwd()
const configJsPath = path.resolve(cwd, process.argv[2] || 'succory.config.js')
const outTsPath = path.resolve(cwd, process.argv[3])
const config: BinConfig = require(configJsPath)

const ts = getTs(config)
const tsPath = path.resolve(cwd, config.outPath)

fs.writeFileSync(tsPath, ts, 'utf8')
