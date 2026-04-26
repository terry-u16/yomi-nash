import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  defaultLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from "@/lib/i18n";

const managedLinkAttribute = "data-yomi-seo-link";
const managedMetaAttribute = "data-yomi-seo-meta";
const ogLocaleMap: Record<SupportedLanguage, string> = {
  ja: "ja_JP",
  en: "en_US",
};

interface SeoLinksProps {
  currentLanguage: SupportedLanguage;
}

const getSeoPathDetails = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  const remainderSegments = supportedLanguages.includes(
    segments[0] as SupportedLanguage
  )
    ? segments.slice(1)
    : segments;

  return {
    pageKey: remainderSegments[0] ?? "",
    remainderPath: remainderSegments.length
      ? `/${remainderSegments.join("/")}`
      : "",
  };
};

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

    const { remainderPath } = getSeoPathDetails(location.pathname);
    const origin = window.location.origin;
    const canonicalUrl = `${origin}/${currentLanguage}${remainderPath}`;

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

    createLink("canonical", canonicalUrl);

    supportedLanguages.forEach((language) => {
      const href = `${origin}/${language}${remainderPath}`;
      createLink("alternate", href, language);
    });

    const defaultHref = `${origin}/${defaultLanguage}${remainderPath}`;
    createLink("alternate", defaultHref, "x-default");

    return removeManagedLinks;
  }, [currentLanguage, location.pathname]);

  useEffect(() => {
    // ページ固有タイトルや description を URL 依存で差し替え、OG ロケールも整える。
    // 既存タグを使い回すことで不要なノード増殖を防ぐ。
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const { pageKey, remainderPath } = getSeoPathDetails(location.pathname);
    const pageTitleKeyMap: Record<string, string> = {
      "": "header.nav.home",
      help: "header.nav.help",
      theory: "header.nav.theory",
    };
    const appName = t("common.appName");
    const seoTitle = t("common.seoTitle");
    const pageTitleKey = pageTitleKeyMap[pageKey] ?? "header.nav.home";
    const pageTitle = t(pageTitleKey);
    const fullTitle = pageKey ? `${appName} | ${pageTitle}` : seoTitle;
    const canonicalUrl = `${window.location.origin}/${currentLanguage}${remainderPath}`;
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
    ensureMeta(
      `meta[property="og:title"][${managedMetaAttribute}]`,
      {
        property: "og:title",
        content: fullTitle,
      },
      "og:title"
    );
    ensureMeta(
      `meta[property="og:url"][${managedMetaAttribute}]`,
      {
        property: "og:url",
        content: canonicalUrl,
      },
      "og:url"
    );
    ensureMeta(
      `meta[property="og:description"][${managedMetaAttribute}]`,
      {
        property: "og:description",
        content: description,
      },
      "og:description"
    );
    ensureMeta(
      `meta[name="twitter:title"][${managedMetaAttribute}]`,
      {
        name: "twitter:title",
        content: fullTitle,
      },
      "twitter:title"
    );
    ensureMeta(
      `meta[name="twitter:description"][${managedMetaAttribute}]`,
      {
        name: "twitter:description",
        content: description,
      },
      "twitter:description"
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
