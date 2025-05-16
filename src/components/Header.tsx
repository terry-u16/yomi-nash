import { Flex, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import type React from "react";

export const Header: React.FC = () => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align={{ base: "start", md: "center" }}
      gap={2}
      padding={4}
      bg="bg.muted"
      borderBottom="1px solid"
      borderColor="border.emphasized"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Heading size="2xl">読み合いナッシュ</Heading>
      <Flex gap={4} wrap="wrap">
        <ChakraLink as={RouterLink} to="/">
          Home
        </ChakraLink>
        <ChakraLink as={RouterLink} to="/help">
          Help
        </ChakraLink>
      </Flex>
    </Flex>
  );
};
