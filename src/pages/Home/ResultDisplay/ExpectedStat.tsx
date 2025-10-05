import {
  Badge,
  Box,
  FormatNumber,
  Heading,
  HStack,
  Stat,
} from "@chakra-ui/react";
import {
  TbArrowDown,
  TbArrowDownRight,
  TbArrowsExchange,
  TbArrowUp,
  TbArrowUpRight,
} from "react-icons/tb";
import { useTranslation } from "react-i18next";

interface Props {
  value: number;
  maxAbsPayoff: number;
  playerLabel: string;
}

const ExpectedStat: React.FC<Props> = ({
  value,
  maxAbsPayoff,
  playerLabel,
}: Props) => {
  const { t } = useTranslation();
  const normalizedValue = value / maxAbsPayoff;
  let colorPalette: string;
  let badgeKey:
    | "advantage"
    | "slightAdvantage"
    | "disadvantage"
    | "slightDisadvantage"
    | "even";
  let icon: React.ReactNode;

  if (normalizedValue > 0.15) {
    colorPalette = "red";
    badgeKey = "advantage";
    icon = <TbArrowUp />;
  } else if (normalizedValue > 0.02) {
    colorPalette = "red";
    badgeKey = "slightAdvantage";
    icon = <TbArrowUpRight />;
  } else if (normalizedValue < -0.15) {
    colorPalette = "blue";
    badgeKey = "disadvantage";
    icon = <TbArrowDown />;
  } else if (normalizedValue < -0.02) {
    colorPalette = "blue";
    badgeKey = "slightDisadvantage";
    icon = <TbArrowDownRight />;
  } else {
    colorPalette = "gray";
    badgeKey = "even";
    icon = <TbArrowsExchange />;
  }

  const badgeText = t(`home.resultDisplay.badge.${badgeKey}`);

  return (
    <Box>
      <Heading size="lg" as="h3" mb={1}>
        {t("home.resultDisplay.expectedValueHeading", { player: playerLabel })}
      </Heading>
      <Stat.Root size="lg">
        <HStack>
          <Stat.ValueText>
            <FormatNumber
              value={value}
              maximumFractionDigits={2}
              minimumFractionDigits={2}
            />
          </Stat.ValueText>
          <Badge colorPalette={colorPalette} py={1}>
            {icon} {badgeText}
          </Badge>
        </HStack>
      </Stat.Root>
    </Box>
  );
};

export default ExpectedStat;
