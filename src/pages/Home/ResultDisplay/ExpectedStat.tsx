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

interface Props {
  value: number;
  maxAbsPayoff: number;
}

const ExpectedStat: React.FC<Props> = ({ value, maxAbsPayoff }: Props) => {
  const normalizedValue = value / maxAbsPayoff;
  let colorPalette: string;
  let badgeText: string;
  let icon: React.ReactNode;

  if (normalizedValue > 0.15) {
    colorPalette = "red";
    badgeText = "有利";
    icon = <TbArrowUp />;
  } else if (normalizedValue > 0.02) {
    colorPalette = "red";
    badgeText = "微有利";
    icon = <TbArrowUpRight />;
  } else if (normalizedValue < -0.15) {
    colorPalette = "blue";
    badgeText = "不利";
    icon = <TbArrowDown />;
  } else if (normalizedValue < -0.02) {
    colorPalette = "blue";
    badgeText = "微不利";
    icon = <TbArrowDownRight />;
  } else {
    colorPalette = "gray";
    badgeText = "互角";
    icon = <TbArrowsExchange />;
  }

  return (
    <Box>
      <Heading size="lg" as="h3" mb={1}>
        Player 1 期待値
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
