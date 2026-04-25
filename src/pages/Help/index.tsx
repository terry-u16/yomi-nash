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

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(HELP_TUTORIAL_SECTION_ID)?.scrollIntoView({
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash]);

  return <Content />;
};

export default Help;
