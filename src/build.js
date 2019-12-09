const util = require('util')
const path = require('path')
const exec = util.promisify(require('child_process').exec)
const loadConfig = require('./loadConfig')

/**
 * @param dpath {string}
 */
module.exports = async (dpath) => {
  const gatsby = path.resolve(__dirname, '..', 'gatsby')
  const { docsPath } = await loadConfig(dpath)
  const decaf = `${dpath}/.decaf`
  const gatsbyBin = `${decaf}/node_modules/.bin/gatsby`

  await exec(`cp -rn ${gatsby} ${decaf} || true`)
  await exec(`cd ${decaf} && npm i`)
  await exec(`cd ${decaf} && ${gatsbyBin} clean`)
  await exec(`mkdir -p ${decaf}/src/markdown-pages/`)
  await exec(`cp -r ${docsPath} ${decaf}/src/markdown-pages/`)
  await exec(`cd ${decaf} && ${gatsbyBin} build`)
  await exec(`rm -rf ${dpath}/dist && mv ${decaf}/public ${dpath}/dist`)
}
