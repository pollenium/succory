module.exports = {
  sources: {
    'Hello.sol': `${__dirname}/Hello.sol`
  },
  outs: [{
    constName: 'helloA',
    fileName: 'Hello.sol',
    contractName: 'HelloA'
  },{
    constName: 'helloB',
    fileName: 'Hello.sol',
    contractName: 'HelloB'
  }],
  tsPath: `${__dirname}/hello.test`
}
