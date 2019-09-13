const path = require('path')
const util = require('util')
const fs = require('fs')

const exists = util.promisify(fs.exists)

const deleteFolderRecursive = (tpath) => {
  const isExists = fs.existsSync(tpath)

  if (isExists) {
    const files = fs.readdirSync(tpath)
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i]
      const curPath = `${tpath}/${file}`
      const isDirectory = fs.lstatSync(curPath).isDirectory()

      if (isDirectory) {
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    }

    fs.rmdirSync(tpath)
  }
}

const removeDistFolder = async () => {
  const projectPath = path.resolve('tests', 'test-site')
  const isExists = await exists(`${projectPath}/dist`)
  if (isExists) await deleteFolderRecursive(`${projectPath}/dist`)
}

global.beforeEach(removeDistFolder)
global.afterAll(removeDistFolder)
