import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import Layout from "./components/Layout";
import {
  defaultLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from "@/lib/i18n";
import {
  Component,
  lazy,
  Suspense,
  useEffect,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import SeoLinks from "./components/SeoLinks";
import FirstVisitHelpToast from "./components/FirstVisitHelpToast";
import PageScrollRestoration from "./components/PageScrollRestoration";

const Home = lazy(() => import("./pages/Home"));
const Help = lazy(() => import("./pages/Help"));
const Theory = lazy(() => import("./pages/Theory"));

interface RouteLoadErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface RouteLoadErrorBoundaryState {
  hasError: boolean;
}

class RouteLoadErrorBoundary extends Component<
  RouteLoadErrorBoundaryProps,
  RouteLoadErrorBoundaryState
> {
  state: RouteLoadErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): RouteLoadErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.error("Failed to load route chunk", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const RouteLoadErrorFallback: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack
      align="center"
      justify="center"
      minH="100vh"
      gap={4}
      px={6}
      textAlign="center"
    >
      <Heading size="lg" as="h1">
        {t("common.routeLoadError.title")}
      </Heading>
      <Text color="fg.muted" maxW="md">
        {t("common.routeLoadError.description")}
      </Text>
      <Button colorPalette="blue" onClick={() => window.location.reload()}>
        {t("common.routeLoadError.reload")}
      </Button>
    </Stack>
  );
};

const App: React.FC = () => {
  return (
    <>
      <PageScrollRestoration />
      <RouteLoadErrorBoundary fallback={<RouteLoadErrorFallback />}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<RedirectToPreferredLanguage />} />
            <Route path="/:lang/*" element={<LanguageGuard />}>
              <Route index element={<Home />} />
              <Route path="help" element={<Help />} />
              <Route path="theory" element={<Theory />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </RouteLoadErrorBoundary>
    </>
  );
};

const RedirectToPreferredLanguage: React.FC = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const resolved = (i18n.resolvedLanguage ?? i18n.language) as
    | SupportedLanguage
    | undefined;
  const fallback =
    resolved && supportedLanguages.includes(resolved)
      ? resolved
      : defaultLanguage;

  // `/` アクセス時は保存済みまたは自動判定した言語へ誘導する。
  return (
    <Navigate to={`/${fallback}${location.search}${location.hash}`} replace />
  );
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
      const fallbackSegments = [defaultLanguage, ...segments.slice(1)];
      const redirectPath = `/${fallbackSegments.join("/")}`;
      navigate(`${redirectPath}${location.search}${location.hash}`, {
        replace: true,
      });
      return;
    }

    const activeLanguage = (i18n.resolvedLanguage ?? i18n.language) as
      | SupportedLanguage
      | undefined;

    if (activeLanguage !== undefined && activeLanguage !== lang) {
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
      <FirstVisitHelpToast />
      <Layout />
    </>
  );
};

export default App;
