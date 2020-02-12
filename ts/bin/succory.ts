#!/usr/bin/env node

import { getTs } from '../'
import path from 'path'

const [configJsPath] = process.argv
console.log(configJsPath)
const config = require(configJsPath)

const ts = getTs(config)

console.log(ts)
