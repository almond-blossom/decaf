const util = require('util')
const path = require('path')
const exec = util.promisify(require('child_process').exec)

/**
 * @param dpath {string}
 */
module.exports = async (dpath) => {
  const gpath = path.resolve(__dirname, '..', 'gatsby')
  await exec(`rm -rf ${gpath}/.cache ${gpath}/public`)
  await exec(`cp -r ${dpath}/papers/ ${gpath}/src/markdown-pages/`)
  await exec(`cd ${gpath} && ./node_modules/.bin/gatsby build`)
  await exec(`mv ${gpath}/public/ ${dpath}/dist/`)
}
