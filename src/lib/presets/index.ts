import i18n from "@/lib/i18n";
import type { GameInputUI } from "@/types/game";

type PresetDefinition = {
  labelKey: string;
  strategyLabelKeys1: readonly string[];
  strategyLabelKeys2: readonly string[];
  payoffMatrix: readonly (readonly string[])[];
};

const rawPresets = {
  rps: {
    labelKey: "presets.rps.label",
    strategyLabelKeys1: [
      "presets.rps.strategyLabels1.rock",
      "presets.rps.strategyLabels1.scissors",
      "presets.rps.strategyLabels1.paper",
    ],
    strategyLabelKeys2: [
      "presets.rps.strategyLabels2.rock",
      "presets.rps.strategyLabels2.scissors",
      "presets.rps.strategyLabels2.paper",
    ],
    payoffMatrix: [
      ["0", "1", "-1"],
      ["-1", "0", "1"],
      ["1", "-1", "0"],
    ],
  },
  glico: {
    labelKey: "presets.glico.label",
    strategyLabelKeys1: [
      "presets.glico.strategyLabels1.glico",
      "presets.glico.strategyLabels1.chocolate",
      "presets.glico.strategyLabels1.pineapple",
    ],
    strategyLabelKeys2: [
      "presets.glico.strategyLabels2.glico",
      "presets.glico.strategyLabels2.chocolate",
      "presets.glico.strategyLabels2.pineapple",
    ],
    payoffMatrix: [
      ["0", "3", "-6"],
      ["-3", "0", "6"],
      ["6", "-6", "0"],
    ],
  },
  okizeme: {
    labelKey: "presets.okizeme.label",
    strategyLabelKeys1: [
      "presets.okizeme.strategyLabels1.meaty",
      "presets.okizeme.strategyLabels1.wait",
    ],
    strategyLabelKeys2: [
      "presets.okizeme.strategyLabels2.guard",
      "presets.okizeme.strategyLabels2.reversal",
    ],
    payoffMatrix: [
      ["1000", "-1500"],
      ["0", "5000"],
    ],
  },
  okizemeHighLow: {
    labelKey: "presets.okizemeHighLow.label",
    strategyLabelKeys1: [
      "presets.okizemeHighLow.strategyLabels1.overhead",
      "presets.okizemeHighLow.strategyLabels1.low",
      "presets.okizemeHighLow.strategyLabels1.wait",
    ],
    strategyLabelKeys2: [
      "presets.okizemeHighLow.strategyLabels2.standGuard",
      "presets.okizemeHighLow.strategyLabels2.crouchGuard",
      "presets.okizemeHighLow.strategyLabels2.reversal",
    ],
    payoffMatrix: [
      ["0", "3860", "-1500"],
      ["4740", "0", "-1500"],
      ["0", "0", "6150"],
    ],
  },
} satisfies Record<string, PresetDefinition>;

export type PresetKey = keyof typeof rawPresets;
export type Preset = (typeof rawPresets)[PresetKey];

export const presets: Record<PresetKey, Preset> = rawPresets;

export const DEFAULT_PRESET_KEY: PresetKey = "okizeme";

const translateStrategyLabels = (keys: readonly string[]): string[] =>
  keys.map((key) => i18n.t(key));

const clonePayoffMatrix = (
  matrix: readonly (readonly string[])[]
): string[][] => matrix.map((row) => [...row]);

export const createPresetSnapshot = (presetKey: PresetKey): GameInputUI => {
  const preset = presets[presetKey];
  return {
    strategyLabels1: translateStrategyLabels(preset.strategyLabelKeys1),
    strategyLabels2: translateStrategyLabels(preset.strategyLabelKeys2),
    payoffMatrix: clonePayoffMatrix(preset.payoffMatrix),
  };
};

export const createDefaultGameInputUI = (): GameInputUI =>
  createPresetSnapshot(DEFAULT_PRESET_KEY);

export const presetEntries = Object.entries(presets) as [
  PresetKey,
  Preset
][];
