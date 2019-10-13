const path = require('path')
const util = require('util')
const fs = require('fs')
const exec = util.promisify(require('child_process').exec)

const readdir = util.promisify(fs.readdir)

describe('decaffeine CLI', () => {
  it('command omitted', async () => {
    await expect(exec('./bin/decaffeine')).rejects.toThrow()
  })
})

describe('decaffeine build', () => {
  async function execBuild() {
    const projectPath = path.resolve('tests', 'test-site')
    const command = './../../bin/decaffeine build'

    const { stdout } = await exec(`cd ${projectPath} && ${command}`)
    return { stdout, projectPath }
  }

  it('generates distribution', async () => {
    const { stdout, projectPath } = await execBuild()

    expect(stdout).not.toBeNull()

    const files = await readdir(projectPath)
    expect(files).toContain('dist')

    const dfiles = await readdir(`${projectPath}/dist`)
    expect(dfiles).toContain('index.html')
    expect(dfiles).toContain('papers')

    const pfiles = await readdir(`${projectPath}/dist/papers`)
    expect(pfiles).toContain('post1')
    expect(pfiles).toContain('post2')
  })

  it('multiple builds should work.', async () => {
    await expect(execBuild()).resolves.not.toThrow()
    await expect(execBuild()).resolves.not.toThrow()
  })
})
