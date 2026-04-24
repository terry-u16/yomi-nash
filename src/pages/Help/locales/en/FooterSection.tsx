import { Link, Text } from "@chakra-ui/react";
import type React from "react";
import { TbExternalLink } from "react-icons/tb";

const HelpEnFooterSection: React.FC = () => {
  return (
    <Text>
      Found an issue or have feedback? Let us know via{" "}
      <Link
        href="https://github.com/terry-u16/yomi-nash"
        colorPalette="blue"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
        <TbExternalLink />
      </Link>{" "}
      Issues.
    </Text>
  );
};

export default HelpEnFooterSection;
