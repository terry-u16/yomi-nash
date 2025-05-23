import { Progress } from "@chakra-ui/react";
import React from "react";

interface Props {
  probability: number;
  colorpalette?: string;
}

const ProbabilityProgress: React.FC<Props> = React.memo(
  ({ probability, colorpalette }: Props) => {
    return (
      <Progress.Root value={probability * 100} colorPalette={colorpalette}>
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    );
  }
);

export default ProbabilityProgress;
