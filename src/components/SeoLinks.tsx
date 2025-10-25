import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supportedLanguages, type SupportedLanguage } from "@/lib/i18n";

const managedLinkAttribute = "data-yomi-seo-link";
const managedMetaAttribute = "data-yomi-seo-meta";
const ogLocaleMap: Record<SupportedLanguage, string> = {
  ja: "ja_JP",
  en: "en_US",
};

interface SeoLinksProps {
  currentLanguage: SupportedLanguage;
}

const SeoLinks: React.FC<SeoLinksProps> = ({ currentLanguage }) => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    // 現在のパスと言語から検索エンジン向けのリンクタグを再構築する。
    // SPA 遷移では head が保持され続けるため、不要なタグは都度削除する。
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const head = document.head;
    const removeManagedLinks = () => {
      head
        .querySelectorAll(`link[${managedLinkAttribute}="true"]`)
        .forEach((node) => head.removeChild(node));
    };

    const remainderPath = (() => {
      const parts = location.pathname.split("/");
      // parts[0] は常に ""、parts[1] は言語コード。
      const remainder = parts.slice(2).join("/");
      return remainder ? `/${remainder}` : "";
    })();
    const canonicalPath = `/${currentLanguage}${remainderPath}`;
    const search = location.search ?? "";
    const origin = window.location.origin;

    removeManagedLinks();

    const createLink = (rel: string, href: string, hreflang?: string) => {
      // canonical・alternate を同一パターンで生成できるよう抽象化。
      const link = document.createElement("link");
      link.setAttribute("rel", rel);
      link.setAttribute("href", href);
      if (hreflang) {
        link.setAttribute("hreflang", hreflang);
      }
      link.setAttribute(managedLinkAttribute, "true");
      head.appendChild(link);
    };

    const canonicalHref = `${origin}${canonicalPath}${search}`;
    createLink("canonical", canonicalHref);

    supportedLanguages.forEach((language) => {
      const href = `${origin}/${language}${remainderPath}${search}`;
      createLink("alternate", href, language);
    });

    const defaultHref = `${origin}/${supportedLanguages[0]}${remainderPath}${search}`;
    createLink("alternate", defaultHref, "x-default");

    return removeManagedLinks;
  }, [currentLanguage, location.pathname, location.search]);

  useEffect(() => {
    // ページ固有タイトルや description を URL 依存で差し替え、OG ロケールも整える。
    // 既存タグを使い回すことで不要なノード増殖を防ぐ。
    if (typeof document === "undefined") {
      return;
    }

    const remainderSegments = location.pathname
      .split("/")
      .filter(Boolean)
      .slice(1);
    const pageKey = remainderSegments[0] ?? "";
    const pageTitleKeyMap: Record<string, string> = {
      "": "header.nav.home",
      help: "header.nav.help",
      theory: "header.nav.theory",
    };
    const appName = t("common.appName");
    const pageTitleKey = pageTitleKeyMap[pageKey] ?? "header.nav.home";
    const pageTitle = t(pageTitleKey);
    const fullTitle = pageKey ? `${pageTitle} | ${appName}` : appName;
    document.title = fullTitle;

    const ensureMeta = (
      selector: string,
      attrs: Record<string, string>,
      managedValue: string
    ) => {
      let element = document.head.querySelector(
        selector
      ) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      const target = element;
      Object.entries(attrs).forEach(([key, value]) => {
        target.setAttribute(key, value);
      });
      target.setAttribute(managedMetaAttribute, managedValue);
      return target;
    };

    const description = t("common.appDescription");
    ensureMeta(
      `meta[name="description"][${managedMetaAttribute}]`,
      {
        name: "description",
        content: description,
      },
      "description"
    );

    const activeOgLocale = ogLocaleMap[currentLanguage];
    ensureMeta(
      `meta[property="og:locale"][${managedMetaAttribute}]`,
      {
        property: "og:locale",
        content: activeOgLocale,
      },
      "og:locale"
    );

    const managedAlternates = new Set<SupportedLanguage>();
    supportedLanguages.forEach((language) => {
      if (language === currentLanguage) {
        return;
      }
      managedAlternates.add(language);
      ensureMeta(
        `meta[property="og:locale:alternate"][${managedMetaAttribute}="${language}"]`,
        {
          property: "og:locale:alternate",
          content: ogLocaleMap[language],
        },
        language
      );
    });

    document.head
      .querySelectorAll(
        `meta[property="og:locale:alternate"][${managedMetaAttribute}]`
      )
      .forEach((element) => {
        const managedValue = element.getAttribute(
          managedMetaAttribute
        ) as SupportedLanguage | null;
        if (!managedValue || !managedAlternates.has(managedValue)) {
          document.head.removeChild(element);
        }
      });
  }, [currentLanguage, location.pathname, t]);

  return null;
};

export default SeoLinks;
