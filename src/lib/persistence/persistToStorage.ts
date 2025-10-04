import { DATA_SCHEMA_VERSION, STORAGE_KEYS } from "@/constants/storage";
import type { GameInputUI, GameResult } from "@/types/game";

export interface PersistPayload {
  inputUI: GameInputUI;
  result: GameResult | null;
}

export function persistToStorage({ inputUI, result }: PersistPayload): void {
  try {
    localStorage.setItem(
      STORAGE_KEYS.inputUI,
      JSON.stringify({
        version: DATA_SCHEMA_VERSION,
        payload: inputUI,
      })
    );

    if (result) {
      localStorage.setItem(
        STORAGE_KEYS.result,
        JSON.stringify({
          version: DATA_SCHEMA_VERSION,
          payload: result,
        })
      );
    } else {
      localStorage.removeItem(STORAGE_KEYS.result);
    }
  } catch (error) {
    console.warn("Failed to save to localStorage", error);
  }
}
