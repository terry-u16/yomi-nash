import { useTranslation } from "react-i18next";
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
  const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language;
  const currentLanguage =
    supportedLanguages.find((language) =>
      resolvedLanguage?.toLowerCase().startsWith(language)
    ) ?? "en";
  const Content = localeComponentMap[currentLanguage];

  return <Content />;
};

export default Help;
