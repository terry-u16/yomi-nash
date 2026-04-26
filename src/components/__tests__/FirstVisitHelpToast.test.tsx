import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { STORAGE_KEYS } from "@/constants/storage";
import { createMockLocalStorage } from "@/test/utils/createMockLocalStorage";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
  toasterCreate: vi.fn(),
  route: {
    lang: "ja",
    pathname: "/ja",
  },
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@/components/ui/toaster", () => ({
  toaster: {
    create: mocks.toasterCreate,
  },
}));

vi.mock("@/lib/i18n", () => ({
  supportedLanguages: ["ja", "en"],
}));

vi.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: mocks.route.pathname }),
  useNavigate: () => mocks.navigate,
  useParams: () => ({ lang: mocks.route.lang }),
}));

let localStorageMock = createMockLocalStorage();

const renderFirstVisitHelpToast = async () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    vi.resetModules();
    const FirstVisitHelpToast = (
      await import("@/components/FirstVisitHelpToast")
    ).default;
    root.render(
      <React.StrictMode>
        <FirstVisitHelpToast />
      </React.StrictMode>
    );
  });

  act(() => {
    root.unmount();
  });
  container.remove();
};

beforeEach(() => {
  localStorageMock = createMockLocalStorage();
  vi.stubGlobal("localStorage", localStorageMock);
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: localStorageMock,
  });
  mocks.navigate.mockReset();
  mocks.toasterCreate.mockReset();
  mocks.route.lang = "ja";
  mocks.route.pathname = "/ja";
});

afterEach(() => {
  Reflect.deleteProperty(window, "localStorage");
  vi.unstubAllGlobals();
});

describe("FirstVisitHelpToast", () => {
  it("shows the help toast once and routes to the localized help page", async () => {
    await renderFirstVisitHelpToast();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.firstVisitHelpToastSeen,
      "true"
    );
    expect(mocks.toasterCreate).toHaveBeenCalledTimes(1);

    const toast = mocks.toasterCreate.mock.calls[0][0];
    expect(toast).toMatchObject({
      title: "onboarding.helpToast.title",
      description: "onboarding.helpToast.description",
      type: "info",
      closable: true,
    });

    act(() => {
      toast.action.onClick();
    });

    expect(mocks.navigate).toHaveBeenCalledWith("/ja/help#tutorial");
  });

  it("does not show the toast when the user has already seen it", async () => {
    localStorage.setItem(STORAGE_KEYS.firstVisitHelpToastSeen, "true");
    localStorageMock.setItem.mockClear();

    await renderFirstVisitHelpToast();

    expect(mocks.toasterCreate).not.toHaveBeenCalled();
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it("still shows the toast when localStorage cannot persist it", async () => {
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error("Storage disabled");
    });

    await renderFirstVisitHelpToast();

    expect(mocks.toasterCreate).toHaveBeenCalledTimes(1);
    expect(mocks.toasterCreate.mock.calls[0][0]).toMatchObject({
      title: "onboarding.helpToast.title",
      type: "info",
    });
  });

  it("shows the toast on the help page so users can jump to the tutorial", async () => {
    mocks.route.pathname = "/ja/help";

    await renderFirstVisitHelpToast();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.firstVisitHelpToastSeen,
      "true"
    );
    expect(mocks.toasterCreate).toHaveBeenCalledTimes(1);

    const toast = mocks.toasterCreate.mock.calls[0][0];

    act(() => {
      toast.action.onClick();
    });

    expect(mocks.navigate).toHaveBeenCalledWith("/ja/help#tutorial");
  });
});
