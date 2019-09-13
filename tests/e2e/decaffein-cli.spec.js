const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const readdir = util.promisify(require('fs').readdir)

describe('decaffeine CLI', () => {
  it('command omitted', async () => {
    await expect(exec('./bin/decaffeine')).rejects.toThrow()
  })
})

describe('decaffeine build', () => {
  it('generates distribution', async () => {
    const projectPath = path.resolve('tests', 'test-site')
    const command = './../../bin/decaffeine build'

    const { stdout } = await exec(`cd ${projectPath} && ${command}`)

    expect(stdout).not.toBeNull()

    const files = await readdir(projectPath)
    expect(files).toContain('dist')

    const dfiles = await readdir(`${projectPath}/dist`)
    expect(dfiles).toContain('index.html')
    expect(dfiles).toContain('posts')

    const pfiles = await readdir(`${projectPath}/dist/posts`)
    expect(pfiles).toContain('post1.html')
    expect(pfiles).toContain('post2.html')
  })
})
