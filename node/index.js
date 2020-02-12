"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var solc_1 = __importDefault(require("solc"));
var fs_1 = __importDefault(require("fs"));
function getTs(config) {
    var solcOutput = getSolcOutput(config);
    var tsParts = config.outs.map(function (out) {
        var contractOutput = solcOutput.contracts[out.fileName][out.contractName];
        var outValue = {
            abi: contractOutput.abi,
            bytecodeHex: contractOutput.evm.bytecode.object
        };
        return "export const " + out.constName + ": ContractOutput = " + JSON.stringify(outValue, null, 2);
    });
    return __spreadArrays([
        'export interface ContractOutput { abi: Object, bytecodeHex: string }'
    ], tsParts).join('\n\n');
}
exports.getTs = getTs;
function getSolcOutput(config) {
    var sources = {};
    Object.keys(config.sources).forEach(function (key) {
        var content = fs_1["default"].readFileSync(config.sources[key], 'utf8');
        sources[key] = { content: content };
    });
    var input = {
        language: 'Solidity',
        sources: sources,
        settings: {
            optimizer: { 'enabled': true },
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode.object'],
                    '': ['ast']
                }
            }
        }
    };
    var outputJson = solc_1["default"].compile(JSON.stringify(input));
    var output = JSON.parse(outputJson);
    if (output.errors && output.errors.length > 0) {
        var solcErrorishes = output.errors.filter(function (solcErrorish) {
            if (solcErrorish.formattedMessage.indexOf('Warning:') >= 0) {
                console.log(solcErrorish.formattedMessage);
                return false;
            }
            return true;
        });
        if (solcErrorishes.length > 0) {
            var errorMessage = solcErrorishes.map(function (solcErrorish) {
                return "[solc]: " + solcErrorish.formattedMessage;
            }).join('\r\n');
            throw new Error(errorMessage);
        }
    }
    return output;
}
exports.getSolcOutput = getSolcOutput;
