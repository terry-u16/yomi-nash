import { vi } from "vitest";

type ViMockedFn<Args extends unknown[], Return> = ReturnType<
  typeof vi.fn<Args, Return>
>;

export type MockLocalStorage = Storage & {
  store: Map<string, string>;
  snapshot: () => Record<string, string>;
  clear: ViMockedFn<[], void>;
  getItem: ViMockedFn<[string], string | null>;
  key: ViMockedFn<[number], string | null>;
  removeItem: ViMockedFn<[string], void>;
  setItem: ViMockedFn<[string, string], void>;
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
    snapshot: () => Object.fromEntries(store),
  } satisfies Partial<MockLocalStorage>;

  return mock as MockLocalStorage;
};
