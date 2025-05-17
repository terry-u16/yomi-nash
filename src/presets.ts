import type { GameInputUI } from "./types/game";

const rps = {
  strategyLabels1: ["グー", "チョキ", "パー"],
  strategyLabels2: ["グー", "チョキ", "パー"],
  payoffMatrix: [
    ["0", "-1", "1"],
    ["1", "0", "-1"],
    ["-1", "1", "0"],
  ],
};

const glico = {
  strategyLabels1: ["グリコ", "チョコレート", "パイナップル"],
  strategyLabels2: ["グリコ", "チョコレート", "パイナップル"],
  payoffMatrix: [
    ["0", "3", "-6"],
    ["-3", "0", "6"],
    ["6", "-6", "0"],
  ],
};

const okizeme = {
  strategyLabels1: ["中段", "下段", "様子見"],
  strategyLabels2: ["立ちガード", "しゃがみガード", "無敵技"],
  payoffMatrix: [
    ["0", "3860", "-1500"],
    ["4740", "0", "-1500"],
    ["0", "0", "6150"],
  ],
};

export const presets: Record<string, { label: string; data: GameInputUI }> = {
  rps: { label: "じゃんけん", data: rps },
  glico: { label: "グリコじゃんけん", data: glico },
  okizeme: { label: "起き攻め中下択", data: okizeme },
};
