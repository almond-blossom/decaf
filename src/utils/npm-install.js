const npm = require('npm')

module.exports = (dir) => {
  const previous = process.cwd()
  process.chdir(dir)

  return new Promise((res, rej) => {
    npm.load((err) => {
      process.chdir(previous)
      if (err) rej(err)
      npm.commands.install([], (er, data) => {
        if (er) rej(er)
        res(data)
      })
      npm.on('log', (message) => {
        console.log(message)
      })
    })
  })
}
