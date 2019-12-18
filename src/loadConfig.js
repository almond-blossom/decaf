const path = require('path')
const util = require('util')
const readFile = util.promisify(require('fs').readFile)

/**
 * @param dpath {string}
 */
module.exports = async (dpath) => {
  const configPath = path.resolve(dpath, 'decaf.config.json')
  const config = await readFile(configPath, 'utf8').catch(() => '{}')
  const merged = {
    docsPath: 'documents',
    ...JSON.parse(config),
  }

  return {
    docsPath: path.resolve(dpath, merged.docsPath),
  }
}
