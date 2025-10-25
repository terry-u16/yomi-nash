import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Theory from "./pages/Theory";
import { supportedLanguages, type SupportedLanguage } from "@/lib/i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SeoLinks from "./components/SeoLinks";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RedirectToPreferredLanguage />} />
      <Route path="/:lang/*" element={<LanguageGuard />}>
        <Route index element={<Home />} />
        <Route path="help" element={<Help />} />
        <Route path="theory" element={<Theory />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const RedirectToPreferredLanguage: React.FC = () => {
  const { i18n } = useTranslation();
  const resolved = (i18n.resolvedLanguage ?? i18n.language) as
    | SupportedLanguage
    | undefined;
  const fallback =
    resolved && supportedLanguages.includes(resolved)
      ? resolved
      : supportedLanguages[0];

  // `/` アクセス時は保存済みまたは自動判定した言語へ誘導する。
  return <Navigate to={`/${fallback}`} replace />;
};

const LanguageGuard: React.FC = () => {
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!lang) {
      return;
    }

    if (!supportedLanguages.includes(lang as SupportedLanguage)) {
      // 未対応の言語セグメントは既定言語に置き換えてフォールバックする。
      const segments = location.pathname.split("/").filter(Boolean);
      const fallbackSegments = [supportedLanguages[0], ...segments.slice(1)];
      const redirectPath = `/${fallbackSegments.join("/")}`;
      navigate(`${redirectPath}${location.search}${location.hash}`, {
        replace: true,
      });
      return;
    }

    const activeLanguage = (i18n.resolvedLanguage ?? i18n.language) as
      | SupportedLanguage
      | undefined;

    if (activeLanguage !== lang) {
      // URL が示す言語と i18next の状態を同期する。
      void i18n.changeLanguage(lang);
    }
  }, [lang, i18n, location.pathname, location.search, location.hash, navigate]);

  if (!lang || !supportedLanguages.includes(lang as SupportedLanguage)) {
    return null;
  }

  return (
    <>
      <SeoLinks currentLanguage={lang as SupportedLanguage} />
      <Layout />
    </>
  );
};

export default App;
