import { HELP, runCommand } from '@/features/tuckshell/commands'
import { todayKey } from '@/stores/useCheckinStore'

function ctx(overrides = {}) {
  return { entries: {}, checkIn: vi.fn(), setTheme: vi.fn(), ...overrides }
}

describe('runCommand', () => {
  it('lists the commands for help', () => {
    expect(runCommand('help', ctx()).lines).toBe(HELP)
  })

  it('saves a check-in and answers in Tuck’s words', () => {
    const c = ctx()
    const { lines } = runCommand('checkin tired', c)
    expect(c.checkIn).toHaveBeenCalledWith('tired')
    expect(lines[0]).toEqual({ face: 'sleepy', text: 'noted. rest counts too.' })
  })

  it('adds the 988 line to a low check-in', () => {
    const { lines } = runCommand('checkin low', ctx())
    expect(lines.at(-1).text).toMatch(/988/)
  })

  it('accepts a leading "tuckshell" and any case', () => {
    const c = ctx()
    runCommand('TuckShell Checkin Good', c)
    expect(c.checkIn).toHaveBeenCalledWith('good')
  })

  it('asks again instead of guessing an unknown mood', () => {
    const c = ctx()
    const { lines } = runCommand('checkin great', c)
    expect(c.checkIn).not.toHaveBeenCalled()
    expect(lines[0].text).toMatch(/good, okay, tired, low, shell/)
  })

  it("reads back today's check-in and the month count", () => {
    const { lines } = runCommand('today', ctx({ entries: { [todayKey()]: 'shell' } }))
    expect(lines[0].text).toBe('today: shell day.')
    expect(lines[1].text).toMatch(/^1 days you showed up in /)
  })

  it('navigates with open', () => {
    expect(runCommand('open games', ctx()).navigate).toBe('/games')
    expect(runCommand('open nowhere', ctx()).navigate).toBeUndefined()
  })

  it('sets the theme', () => {
    const c = ctx()
    runCommand('theme dark', c)
    expect(c.setTheme).toHaveBeenCalledWith('dark')
  })

  it('clears, and answers unknown commands kindly', () => {
    expect(runCommand('clear', ctx()).clear).toBe(true)
    expect(runCommand('sudo', ctx()).lines[0].text).toBe(`"sudo" isn't a command i know. try help.`)
  })
})
