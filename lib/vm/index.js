const vm = require('vm')

class BackendVM {
  constructor (code) {
    this.code = code
    this.script = new vm.Script(code)
    this.sandbox = createNewSandbox(this)
    this.context = new vm.createContext(this.sandbox)
    this.hasEvaluated = false
  }

  evaluate () {
    if (this.hasEvaluated) {
      throw new Error('This backend has already been evaluated')
    }
    this.script.runInContext(this.context)
    this.hasEvaluated = true
  }

  get exports () {
    return this.sandbox.exports
  }
}

function createNewSandbox (self) {
  var exports = {}
  return {
    // exports
    module: {exports},
    exports,

    // builtin apis
    console,
    Buffer,
    Backend: {
      callerId: false, // TODO
      files: false, // TODO
      oracle: false // TODO
    }
  }
}
module.exports = BackendVM