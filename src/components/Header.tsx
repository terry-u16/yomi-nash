import { Button, Flex, Heading, Icon, Menu, Portal } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import type React from "react";
import { TbBook, TbCheck, TbChevronDown, TbHelp, TbHome, TbLanguage } from "react-icons/tb";
import { ColorModeButton } from "./ui/color-mode";
import { useTranslation } from "react-i18next";
import { supportedLanguages, type SupportedLanguage } from "@/lib/i18n";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language;
  const currentLanguage: SupportedLanguage =
    supportedLanguages.find((language) =>
      resolvedLanguage?.toLowerCase().startsWith(language)
    ) ?? "ja";

  const handleLanguageChange = (value: string) => {
    if (value && value !== i18n.language) {
      void i18n.changeLanguage(value);
    }
  };

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
          <RouterLink to="/">{t("common.appName")}</RouterLink>
        </ChakraLink>
      </Heading>
      <Flex gap={4} wrap="wrap" align="center">
        <ChakraLink asChild color="white">
          <RouterLink to="/">
            <TbHome /> {t("header.nav.home")}
          </RouterLink>
        </ChakraLink>
        <ChakraLink asChild color="white">
          <RouterLink to="/help">
            <TbHelp /> {t("header.nav.help")}
          </RouterLink>
        </ChakraLink>
        <ChakraLink asChild color="white">
          <RouterLink to="/theory">
            <TbBook /> {t("header.nav.theory")}
          </RouterLink>
        </ChakraLink>
        <ColorModeButton
          color="white"
          size="xs"
          _hover={{ bg: "whiteAlpha.400" }}
          _active={{ bg: "whiteAlpha.500" }}
        />
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.400" }}
              _active={{ bg: "whiteAlpha.500" }}
              px="2"
            >
              <TbLanguage />
              {t(`language.${currentLanguage}`)}
              <TbChevronDown />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content minW="48">
                {supportedLanguages.map((language) => (
                  <Menu.Item
                    key={language}
                    value={language}
                    onClick={() => handleLanguageChange(language)}
                  >
                    <Flex align="center" gap={2}>
                      <Icon
                        as={TbCheck}
                        visibility={
                          language === currentLanguage ? "visible" : "hidden"
                        }
                        aria-hidden
                      />
                      {t(`language.${language}`)}
                    </Flex>
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
    </Flex>
  );
};

export default Header;
