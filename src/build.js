const util = require('util')
const path = require('path')
const exec = util.promisify(require('child_process').exec)
const loadConfig = require('./loadConfig')

/**
 * @param dpath {string}
 */
module.exports = async (dpath) => {
  const gpath = path.resolve(__dirname, '..', 'gatsby')
  const { docsPath } = await loadConfig(dpath)

  await exec(`rm -rf ${gpath}/.cache ${gpath}/public`)
  await exec(`mkdir ${gpath}/src/markdown-pages/`)
  await exec(`cp -r ${docsPath} ${gpath}/src/markdown-pages/`)
  await exec(`cd ${gpath} && npm i && ./node_modules/.bin/gatsby build`)
  await exec(`mv ${gpath}/public/ ${dpath}/dist/`)
}
