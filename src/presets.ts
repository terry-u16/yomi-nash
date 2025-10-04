import type { GameInputUI } from "./types/game";

type PresetDefinition = { label: string; data: GameInputUI };

const rps: GameInputUI = {
  strategyLabels1: ["グー", "チョキ", "パー"],
  strategyLabels2: ["グー", "チョキ", "パー"],
  payoffMatrix: [
    ["0", "1", "-1"],
    ["-1", "0", "1"],
    ["1", "-1", "0"],
  ],
};

const glico: GameInputUI = {
  strategyLabels1: ["グリコ", "チョコレート", "パイナップル"],
  strategyLabels2: ["グリコ", "チョコレート", "パイナップル"],
  payoffMatrix: [
    ["0", "3", "-6"],
    ["-3", "0", "6"],
    ["6", "-6", "0"],
  ],
};

const okizeme: GameInputUI = {
  strategyLabels1: ["打撃重ね", "様子見"],
  strategyLabels2: ["ガード", "無敵技"],
  payoffMatrix: [
    ["1000", "-1500"],
    ["0", "5000"],
  ],
};

const okizemeHighLow: GameInputUI = {
  strategyLabels1: ["中段", "下段", "様子見"],
  strategyLabels2: ["立ちガード", "しゃがみガード", "無敵技"],
  payoffMatrix: [
    ["0", "3860", "-1500"],
    ["4740", "0", "-1500"],
    ["0", "0", "6150"],
  ],
};

const rawPresets = {
  rps: { label: "じゃんけん", data: rps },
  glico: { label: "グリコじゃんけん", data: glico },
  okizeme: { label: "起き攻め打撃重ね", data: okizeme },
  okizemeHighLow: { label: "起き攻め中下択", data: okizemeHighLow },
} satisfies Record<string, PresetDefinition>;

export type PresetKey = keyof typeof rawPresets;
export type Preset = (typeof rawPresets)[PresetKey];

export const presets: Record<PresetKey, Preset> = rawPresets;

export const DEFAULT_PRESET_KEY: PresetKey = "okizeme";

const cloneGameInputUI = (input: GameInputUI): GameInputUI => ({
  strategyLabels1: [...input.strategyLabels1],
  strategyLabels2: [...input.strategyLabels2],
  payoffMatrix: input.payoffMatrix.map((row) => [...row]),
});

export const createPresetSnapshot = (presetKey: PresetKey): GameInputUI =>
  cloneGameInputUI(presets[presetKey].data);

export const createDefaultGameInputUI = (): GameInputUI =>
  createPresetSnapshot(DEFAULT_PRESET_KEY);

export const presetEntries = Object.entries(presets) as [
  PresetKey,
  Preset
][];
