import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { STORAGE_KEYS } from "@/constants/storage";
import { supportedLanguages, type SupportedLanguage } from "@/lib/i18n";
import { toaster } from "@/components/ui/toaster";

const toastId = "first-visit-help-toast";
let hasShownInSession = false;

const FirstVisitHelpToast: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lang || !supportedLanguages.includes(lang as SupportedLanguage)) {
      return;
    }

    const currentLanguage = lang as SupportedLanguage;
    const isHelpPage = location.pathname === `/${currentLanguage}/help`;

    try {
      if (
        hasShownInSession ||
        localStorage.getItem(STORAGE_KEYS.firstVisitHelpToastSeen)
      ) {
        return;
      }

      hasShownInSession = true;
      localStorage.setItem(STORAGE_KEYS.firstVisitHelpToastSeen, "true");

      if (isHelpPage) {
        return;
      }
    } catch {
      if (hasShownInSession) {
        return;
      }

      hasShownInSession = true;
      if (isHelpPage) {
        return;
      }
    }

    toaster.create({
      id: toastId,
      title: t("onboarding.helpToast.title"),
      description: t("onboarding.helpToast.description"),
      type: "info",
      duration: 15000,
      action: {
        label: t("onboarding.helpToast.action"),
        onClick: () => navigate(`/${currentLanguage}/help`),
      },
      closable: true,
    });
  }, [lang, location.pathname, navigate, t]);

  return null;
};

export default FirstVisitHelpToast;
