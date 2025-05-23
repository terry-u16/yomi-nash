import { Flex, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import type React from "react";
import { TbHelp, TbHome } from "react-icons/tb";
import { ColorModeButton } from "./ui/color-mode";

const Header: React.FC = () => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align={{ base: "start", md: "center" }}
      gap={2}
      padding={4}
      bgGradient="to-r"
      gradientFrom={{ base: "red.600", _dark: "red.700" }}
      gradientTo={{ base: "blue.600", _dark: "blue.700" }}
      position="sticky"
      boxShadow="md"
      top={0}
      zIndex={1000}
    >
      <Heading size="2xl" color="white" as="h1">
        <ChakraLink asChild color="white">
          <RouterLink to="/">読み合いナッシュ（仮）</RouterLink>
        </ChakraLink>
      </Heading>
      <Flex gap={4} wrap="wrap">
        <ChakraLink asChild color="white">
          <RouterLink to="/">
            <TbHome /> Home
          </RouterLink>
        </ChakraLink>
        <ChakraLink asChild color="white">
          <RouterLink to="/help">
            <TbHelp /> Help
          </RouterLink>
        </ChakraLink>
        <ColorModeButton color="white" size="xs" />
      </Flex>
    </Flex>
  );
};

export default Header;
