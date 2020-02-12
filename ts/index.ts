import solc from 'solc'
import fs from 'fs'

export interface Out {
  constName: string, fileName: string, contractName: string
}

export interface Config {
  sources: Record<string, string>,
  outs: Array<Out>
}

export interface BinConfig extends Config {
  tsPath: string
}

export function getTs(config: Config): string {
  const solcOutput = getSolcOutput(config)
  const tsParts = config.outs.map((out) => {
    const contractOutput = solcOutput.contracts[out.fileName][out.contractName]
    return [
      `export const ${out.constName}: ContractOutput = {`,
      `  abiJson: '${JSON.stringify(contractOutput.abi)}',`,
      `  bytecode: Uu.fromHexish('${contractOutput.evm.bytecode.object}')`,
      `}`
    ].join('\n')
  })
  return [
    [
      "import { Uu } from 'pollenium-uvaursi'",
      "import { ContractOutput } from 'pollenium-clover'"
    ].join('\n'),
    ...tsParts
  ].join('\n\n')
}

export function getSolcOutput(config: Config) {

  const sources = {}

  Object.keys(config.sources).forEach((key) => {
    const content = fs.readFileSync(config.sources[key], 'utf8')
    sources[key] = { content }
  })

  const input = {
    language: 'Solidity',
    sources,
    settings: {
      optimizer: { 'enabled': true },
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode.object'],
          '': ['ast']
        }
      }
    }
  }
  const outputJson = solc.compile(JSON.stringify(input))
  const output = JSON.parse(outputJson)

  if (output.errors && output.errors.length > 0) {
    const solcErrorishes = output.errors.filter((solcErrorish) => {
      if (solcErrorish.formattedMessage.indexOf('Warning:') >= 0) {
        console.log(solcErrorish.formattedMessage)
        return false
      }
      return true
    })
    if (solcErrorishes.length > 0) {
      const errorMessage = solcErrorishes.map((solcErrorish) => {
        return `[solc]: ${solcErrorish.formattedMessage}`
      }).join('\r\n')
      throw new Error(errorMessage)
    }
  }

  return output
}
