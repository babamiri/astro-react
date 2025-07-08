import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, afterAll, vi } from 'vitest'

// بعد از هر تست، DOM رو پاک کن
afterEach(() => {
  cleanup()
})

// Mock کردن alert برای تست‌ها
global.alert = vi.fn()

// Mock کردن window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    origin: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: ''
  },
  writable: true
})

// Mock کردن fetch
global.fetch = vi.fn()

// Mock کردن console.error برای تست‌های clean
const originalError = console.error
beforeAll(() => {
  console.error = vi.fn()
})

afterAll(() => {
  console.error = originalError
}) 