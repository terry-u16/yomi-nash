import { vi } from "vitest";

type ViMockedFn = ReturnType<typeof vi.fn>;

export type MockLocalStorage = Storage & {
  store: Map<string, string>;
  snapshot: () => Record<string, string>;
  clear: ViMockedFn;
  getItem: ViMockedFn;
  key: ViMockedFn;
  removeItem: ViMockedFn;
  setItem: ViMockedFn;
};

export const createMockLocalStorage = (): MockLocalStorage => {
  const store = new Map<string, string>();

  const mock = {
    get length() {
      return store.size;
    },
    clear: vi.fn(() => {
      store.clear();
    }),
    getItem: vi.fn((key: string) => {
      return store.has(key) ? store.get(key)! : null;
    }),
    key: vi.fn((index: number) => {
      const keys = Array.from(store.keys());
      return keys[index] ?? null;
    }),
    removeItem: vi.fn((key: string) => {
      store.delete(key);
    }),
    setItem: vi.fn((key: string, value: string) => {
      store.set(key, value);
    }),
    store,
    snapshot: () => Object.fromEntries(store) as Record<string, string>,
  } satisfies Partial<MockLocalStorage>;

  return mock as MockLocalStorage;
};
