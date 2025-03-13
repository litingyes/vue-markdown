import { describe, expect, it } from 'vitest'
import { count } from '../src'

describe('test', () => {
  it('count', () => {
    expect(count(1)).toBe(2)
  })
})
