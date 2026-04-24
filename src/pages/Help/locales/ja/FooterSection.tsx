import { Link, Text } from "@chakra-ui/react";
import type React from "react";
import { TbExternalLink } from "react-icons/tb";

const HelpJaFooterSection: React.FC = () => {
  return (
    <Text>
      お気付きの点やご要望があれば{" "}
      <Link
        href="https://github.com/terry-u16/yomi-nash"
        colorPalette="blue"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
        <TbExternalLink />
      </Link>{" "}
      の Issues でお知らせください。
    </Text>
  );
};

export default HelpJaFooterSection;
