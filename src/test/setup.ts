import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock File and FileReader
Object.defineProperty(window, 'File', {
  value: vi.fn().mockImplementation((fileBits, fileName, options) => ({
    name: fileName,
    size: fileBits.reduce((acc: number, bit: any) => acc + bit.length, 0),
    type: options?.type || '',
    lastModified: Date.now(),
  })),
});

Object.defineProperty(window, 'FileReader', {
  value: vi.fn().mockImplementation(() => ({
    readAsDataURL: vi.fn(),
    result: 'data:image/jpeg;base64,mock-data',
  })),
});