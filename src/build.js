const util = require('util')
const path = require('path')
const mkdir = util.promisify(require('fs').mkdir)
const writeFile = util.promisify(require('fs').writeFile)
const readdir = util.promisify(require('fs').readdir)

module.exports = async (dpath) => {
  const ddsit = `${dpath}/dist`
  await mkdir(ddsit)
  await Promise.all([
    writeFile(`${ddsit}/index.html`, '', 'utf8'),
    mkdir(`${ddsit}/posts`),
  ])
  const markdownFiles = await readdir(`${dpath}/papers`)
  const fileNames = markdownFiles.map((file) => path.parse(file).name)
  await Promise.all(
    fileNames.map((name) => writeFile(`${ddsit}/posts/${name}.html`, '', 'utf8')),
  )
}
