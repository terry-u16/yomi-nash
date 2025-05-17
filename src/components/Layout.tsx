import { Box, Flex, Stack, useBreakpointValue } from "@chakra-ui/react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const maxWidth = useBreakpointValue({
    base: "100%",
    sm: "90%",
    md: "768px",
    lg: "960px",
  });

  return (
    <Stack bg="bg.muted" minH="100vh" gap={4}>
      <Header />
      <Flex justify="center" px={4}>
        <Box w="100%" maxW={maxWidth} p={{ base: 2, md: 4 }}>
          <Outlet />
        </Box>
      </Flex>
    </Stack>
  );
};

export default Layout;
