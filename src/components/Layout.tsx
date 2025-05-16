import { Box, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function Layout() {
  const maxWidth = useBreakpointValue({
    base: "100%",
    sm: "90%",
    md: "768px",
    lg: "960px",
  });

  return (
    <Flex justify="center" px={4}>
      <Box w="100%" maxW={maxWidth} p={{ base: 2, md: 4 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "start", md: "center" }}
          mb={4}
          gap={2}
        >
          <Heading size="xl">読み合いナッシュ</Heading>
          <Flex gap={4} wrap="wrap">
            <ChakraLink as={RouterLink} to="/">
              Home
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/help">
              Help
            </ChakraLink>
          </Flex>
        </Flex>
        <Outlet />
      </Box>
    </Flex>
  );
}
