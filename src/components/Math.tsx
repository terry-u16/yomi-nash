import { useMemo, type ReactNode } from "react";
import katex, { type KatexOptions } from "katex";

interface BaseMathProps {
  math?: string;
  children?: string;
  errorColor?: string;
  renderError?: (error: Error) => ReactNode;
  strict?: KatexOptions["strict"];
}

interface MathProps extends BaseMathProps {
  displayMode: boolean;
}

const Math: React.FC<MathProps> = ({
  children,
  displayMode,
  errorColor,
  math,
  renderError,
  strict,
}) => {
  const formula = math ?? children ?? "";
  const { error, html } = useMemo(() => {
    try {
      return {
        html: katex.renderToString(formula, {
          displayMode,
          errorColor,
          strict,
          throwOnError: Boolean(renderError),
        }),
      };
    } catch (error) {
      if (error instanceof katex.ParseError || error instanceof TypeError) {
        return { error };
      }

      throw error;
    }
  }, [displayMode, errorColor, formula, renderError, strict]);

  if (error) {
    return renderError ? renderError(error) : <>{error.message}</>;
  }

  const Component = displayMode ? "div" : "span";

  return (
    <Component
      data-testid="katex"
      dangerouslySetInnerHTML={{ __html: html ?? "" }}
    />
  );
};

export const InlineMath: React.FC<BaseMathProps> = (props) => (
  <Math {...props} displayMode={false} />
);

export const BlockMath: React.FC<BaseMathProps> = (props) => (
  <Math {...props} displayMode />
);
