const path = require('path')
const util = require('util')
const fs = require('fs')
const exec = util.promisify(require('child_process').exec)

const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

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
    expect(dfiles).toContain('posts')

    const pfiles = await readdir(`${projectPath}/dist/posts`)
    expect(pfiles).toContain('post1.html')
    expect(pfiles).toContain('post2.html')
  })

  it('test index.html', async () => {
  })

  it('test posts', async () => {
    const { projectPath } = await execBuild()

    const post1 = await readFile(`${projectPath}/dist/posts/post1.html`, 'utf8')
    expect(post1).toMatch('테스트 입니다.')

    const post2 = await readFile(`${projectPath}/dist/posts/post2.html`, 'utf8')
    expect(post2).toMatch('테스트2 입니다.')
  })
})
