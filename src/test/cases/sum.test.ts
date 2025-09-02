// eslint-disable-next-line test/consistent-test-it
import { expect, test } from 'vitest'
import { sum } from '../func/sum'

// eslint-disable-next-line test/consistent-test-it
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
