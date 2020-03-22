const util = require('util')
const path = require('path')
const exec = util.promisify(require('child_process').exec)
const loadConfig = require('./loadConfig')
const npmi = require('./utils/npm-install')
const fs = require('fs-extra')

/**
 * @param dpath {string}
 */
module.exports = async (dpath) => {
  const gatsby = path.resolve(__dirname, '..', 'gatsby')
  const { docsPath } = await loadConfig(dpath)
  const decaf = `${dpath}/.decaf`
  const decafDocsPath = `${decaf}/src/markdown-pages/${path.basename(docsPath)}`
  const gatsbyBin = `${decaf}/node_modules/.bin/gatsby`

  await fs.remove(decaf)
  await fs.copy(gatsby, decaf)
  await npmi(decaf)
  await exec(`cd ${decaf} && ${gatsbyBin} clean`)
  await fs.mkdirp(decafDocsPath)
  await fs.copy(docsPath, decafDocsPath)
  await exec(`cd ${decaf} && ${gatsbyBin} build`)
  await exec(`rm -rf ${dpath}/dist && mv ${decaf}/public ${dpath}/dist`)
}
