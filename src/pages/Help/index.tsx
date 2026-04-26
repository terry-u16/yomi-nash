import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { HELP_TUTORIAL_SECTION_ID } from "@/constants/help";
import { supportedLanguages, type SupportedLanguage } from "@/lib/i18n";
import HelpEn from "./locales/en";
import HelpJa from "./locales/ja";
import type React from "react";

const localeComponentMap: Record<SupportedLanguage, React.ComponentType> = {
  en: HelpEn,
  ja: HelpJa,
};

const prefersReducedMotion = () => {
  if (typeof window.matchMedia !== "function") {
    return true;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const Help: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language;
  const currentLanguage =
    supportedLanguages.find((language) =>
      resolvedLanguage?.toLowerCase().startsWith(language)
    ) ?? "en";
  const Content = localeComponentMap[currentLanguage];

  useEffect(() => {
    if (location.hash !== `#${HELP_TUTORIAL_SECTION_ID}`) {
      return;
    }

    let scrollFrameId: number | undefined;

    const startFrameId = window.requestAnimationFrame(() => {
      const target = document.getElementById(HELP_TUTORIAL_SECTION_ID);
      if (!target) {
        return;
      }

      if (prefersReducedMotion()) {
        target.scrollIntoView({ block: "start" });
        return;
      }

      window.scrollTo({ top: 0, behavior: "auto" });
      scrollFrameId = window.requestAnimationFrame(() => {
        target.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(startFrameId);
      if (scrollFrameId !== undefined) {
        window.cancelAnimationFrame(scrollFrameId);
      }
    };
  }, [location.hash]);

  return <Content />;
};

export default Help;
