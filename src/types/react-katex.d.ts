declare module "react-katex" {
  import type { ComponentType, ReactNode } from "react";

  export interface BaseMathProps {
    math?: string;
    children?: ReactNode;
    errorColor?: string;
    renderError?: (error: Error) => ReactNode;
    strict?: "warn" | "ignore" | boolean;
  }

  export const InlineMath: ComponentType<BaseMathProps>;
}
