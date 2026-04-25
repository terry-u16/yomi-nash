import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { HELP_TUTORIAL_SECTION_ID } from "@/constants/help";
import { STORAGE_KEYS } from "@/constants/storage";
import { supportedLanguages, type SupportedLanguage } from "@/lib/i18n";
import { toaster } from "@/components/ui/toaster";

const toastId = "first-visit-help-toast";
let hasShownInSession = false;

const FirstVisitHelpToast: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lang || !supportedLanguages.includes(lang as SupportedLanguage)) {
      return;
    }

    const currentLanguage = lang as SupportedLanguage;

    try {
      if (
        hasShownInSession ||
        localStorage.getItem(STORAGE_KEYS.firstVisitHelpToastSeen)
      ) {
        return;
      }

      hasShownInSession = true;
      localStorage.setItem(STORAGE_KEYS.firstVisitHelpToastSeen, "true");
    } catch {
      if (hasShownInSession) {
        return;
      }

      hasShownInSession = true;
    }

    toaster.create({
      id: toastId,
      title: t("onboarding.helpToast.title"),
      description: t("onboarding.helpToast.description"),
      type: "info",
      duration: 15000,
      action: {
        label: t("onboarding.helpToast.action"),
        onClick: () =>
          navigate(`/${currentLanguage}/help#${HELP_TUTORIAL_SECTION_ID}`),
      },
      closable: true,
    });
  }, [lang, navigate, t]);

  return null;
};

export default FirstVisitHelpToast;
