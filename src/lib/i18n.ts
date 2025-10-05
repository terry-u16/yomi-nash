import i18n, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";

export const languageStorageKey = "yomi-nash.language";
export const supportedLanguages = ["ja", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const isSupportedLanguage = (
  value: string | null | undefined
): value is SupportedLanguage => {
  return !!value && supportedLanguages.includes(value as SupportedLanguage);
};

const resources = {
  ja: {
    translation: {
      language: {
        ja: "日本語",
        en: "英語",
      },
      common: {
        appName: "読み合いナッシュ",
        player1: "Player 1",
        player2: "Player 2",
        optionLabel: "選択肢{{index}}",
        total: "合計",
        cancel: "キャンセル",
      },
      header: {
        nav: {
          home: "Home",
          help: "Help",
          theory: "Theory",
        },
        languageLabel: "表示言語",
      },
      presets: {
        rps: {
          label: "じゃんけん",
          strategyLabels1: {
            rock: "グー",
            scissors: "チョキ",
            paper: "パー",
          },
          strategyLabels2: {
            rock: "グー",
            scissors: "チョキ",
            paper: "パー",
          },
        },
        glico: {
          label: "グリコじゃんけん",
          strategyLabels1: {
            glico: "グリコ",
            chocolate: "チョコレート",
            pineapple: "パイナップル",
          },
          strategyLabels2: {
            glico: "グリコ",
            chocolate: "チョコレート",
            pineapple: "パイナップル",
          },
        },
        okizeme: {
          label: "起き攻め打撃重ね",
          strategyLabels1: {
            meaty: "打撃重ね",
            wait: "様子見",
          },
          strategyLabels2: {
            guard: "ガード",
            reversal: "無敵技",
          },
        },
        okizemeHighLow: {
          label: "起き攻め中下択",
          strategyLabels1: {
            overhead: "中段",
            low: "下段",
            wait: "様子見",
          },
          strategyLabels2: {
            standGuard: "立ちガード",
            crouchGuard: "しゃがみガード",
            reversal: "無敵技",
          },
        },
      },
      home: {
        toasts: {
          calcSuccess: "計算が完了しました",
          calcError: "計算に失敗しました",
          restore: {
            schemaMismatch: "共有データのバージョンが古いため読み込めません",
            inputError: "入力の復元に失敗しました",
            resultError: "結果の復元に失敗しました",
            loaded: "共有データを読み込みました",
          },
        },
        payoffTable: {
          heading: "戦略相性表",
          playerHeader: "{{player1}} \\ {{player2}}",
          transposeButton: "行列入替",
          transposeToast: "Player 1とPlayer 2を入れ替えました",
          addRow: "行追加",
          addCol: "列追加",
          deleteRow: "行削除",
          deleteCol: "列削除",
        },
        tableControls: {
          heading: "操作パネル",
          calculate: "計算",
          share: "シェア",
          presets: "サンプルプリセット",
          upload: "CSVアップロード",
          download: "CSVダウンロード",
          reset: "リセット",
          dialogTitle: "リセット確認",
          dialogBody: "入力内容と計算結果を初期化します。よろしいですか？",
          confirmReset: "リセット",
          csvLoadSuccess: "CSVを読み込みました",
          csvLoadError: "CSVの読み込みに失敗しました",
          csvDownloading: "CSVをダウンロードしています...",
          inputError: "入力にエラーがあります",
          inputErrorPosition: "({{row}}行 {{col}}列)",
          presetError: "プリセットの読み込みに失敗しました",
          presetApplied: "プリセット{{label}}を適用しました",
          shareError: "シェアURL生成に失敗しました",
          shareTweet: "ゲーム入力と結果を共有します #yomiNash",
          resetSuccess: "リセットしました",
        },
        resultDisplay: {
          heading: "計算結果",
          expectedValueHeading: "{{player}} 期待値",
          probabilityHeading: "選択割合",
          expectedHeading: "期待値",
          detailHeading: "詳細結果表",
          playerHeader: "{{player1}} \\ {{player2}}",
          playerStrategy: "{{player}} 戦略",
          badge: {
            advantage: "有利",
            slightAdvantage: "微有利",
            disadvantage: "不利",
            slightDisadvantage: "微不利",
            even: "互角",
          },
        },
      },
    },
  },
  en: {
    translation: {
      language: {
        ja: "Japanese",
        en: "English",
      },
      common: {
        appName: "Yomi Nash",
        player1: "Player 1",
        player2: "Player 2",
        optionLabel: "Option {{index}}",
        total: "Total",
        cancel: "Cancel",
      },
      header: {
        nav: {
          home: "Home",
          help: "Help",
          theory: "Theory",
        },
        languageLabel: "Language",
      },
      presets: {
        rps: {
          label: "Rock Paper Scissors",
          strategyLabels1: {
            rock: "Rock",
            scissors: "Scissors",
            paper: "Paper",
          },
          strategyLabels2: {
            rock: "Rock",
            scissors: "Scissors",
            paper: "Paper",
          },
        },
        glico: {
          label: "Glico Rock Paper Scissors",
          strategyLabels1: {
            glico: "Glico",
            chocolate: "Chocolate",
            pineapple: "Pineapple",
          },
          strategyLabels2: {
            glico: "Glico",
            chocolate: "Chocolate",
            pineapple: "Pineapple",
          },
        },
        okizeme: {
          label: "Meaty Oki",
          strategyLabels1: {
            meaty: "Meaty Attack",
            wait: "Wait",
          },
          strategyLabels2: {
            guard: "Guard",
            reversal: "Reversal",
          },
        },
        okizemeHighLow: {
          label: "High/Low Oki Mix-up",
          strategyLabels1: {
            overhead: "Overhead",
            low: "Low",
            wait: "Wait",
          },
          strategyLabels2: {
            standGuard: "Standing Guard",
            crouchGuard: "Crouching Guard",
            reversal: "Reversal",
          },
        },
      },
      home: {
        toasts: {
          calcSuccess: "Calculation completed",
          calcError: "Calculation failed",
          restore: {
            schemaMismatch: "The shared data version is too old to load",
            inputError: "Failed to restore the shared input",
            resultError: "Failed to restore the shared result",
            loaded: "Loaded the shared data",
          },
        },
        payoffTable: {
          heading: "Payoff Table",
          playerHeader: "{{player1}} \\ {{player2}}",
          transposeButton: "Transpose",
          transposeToast: "Swapped Player 1 and Player 2",
          addRow: "Add Row",
          addCol: "Add Column",
          deleteRow: "Remove Row",
          deleteCol: "Remove Column",
        },
        tableControls: {
          heading: "Controls",
          calculate: "Calculate",
          share: "Share",
          presets: "Sample Presets",
          upload: "Upload CSV",
          download: "Download CSV",
          reset: "Reset",
          dialogTitle: "Reset Confirmation",
          dialogBody: "This will reset the inputs and results. Continue?",
          confirmReset: "Reset",
          csvLoadSuccess: "CSV loaded",
          csvLoadError: "Failed to load the CSV",
          csvDownloading: "Preparing CSV download...",
          inputError: "There are errors in the input",
          inputErrorPosition: "(Row {{row}}, Column {{col}})",
          presetError: "Failed to load the preset",
          presetApplied: "Applied preset {{label}}",
          shareError: "Failed to generate the share URL",
          shareTweet: "Sharing the game input and result #yomiNash",
          resetSuccess: "Reset completed",
        },
        resultDisplay: {
          heading: "Results",
          expectedValueHeading: "{{player}} Expected Value",
          probabilityHeading: "Selection Ratio",
          expectedHeading: "Expected Value",
          detailHeading: "Detailed Table",
          playerHeader: "{{player1}} \\ {{player2}}",
          playerStrategy: "{{player}} Strategy",
          badge: {
            advantage: "Advantage",
            slightAdvantage: "Slight advantage",
            disadvantage: "Disadvantage",
            slightDisadvantage: "Slight disadvantage",
            even: "Even",
          },
        },
      },
    },
  },
} satisfies Resource;

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem(languageStorageKey);
  if (isSupportedLanguage(stored)) {
    return stored;
  }

  const navigatorLanguages = window.navigator.languages ?? [];
  for (const lang of navigatorLanguages) {
    const normalized = lang.split("-")[0];
    if (isSupportedLanguage(normalized)) {
      return normalized;
    }
  }

  const fallbackNavigator = window.navigator.language?.split("-")[0];
  if (isSupportedLanguage(fallbackNavigator)) {
    return fallbackNavigator;
  }

  return "en";
};

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = i18n.language;
    }
  });

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(languageStorageKey, lng);
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng;
  }
});

export default i18n;
