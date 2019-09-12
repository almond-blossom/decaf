const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

describe('decaffeine CLI', () => {
  it('command exists', async () => {
    try {
      const { stderr } = await exec('./bin/decaffeine')
      expect(stderr).toBe('')
    } catch (e) {
      expect(e).toBe(null)
    }
  })

  it('decaffeine build', async () => {
    const projectPath = path.resolve('tests', 'test-site')
    const command = './../../bin/decaffeine build'

    const { stdout } = await exec(`cd ${projectPath} && ${command}`)

    expect(stdout).not.toBeNull()
  })
})
