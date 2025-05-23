import { Stack, useBreakpointValue } from "@chakra-ui/react";
import Header from "./Header";
import Main from "./Main";

const Layout: React.FC = () => {
  const maxWidth = useBreakpointValue({
    base: "100%",
    sm: "90%",
    md: "768px",
    lg: "960px",
  });

  return (
    <Stack bg="bg.muted" minH="100vh">
      <Header />
      <Main maxWidth={maxWidth} />
    </Stack>
  );
};

export default Layout;
