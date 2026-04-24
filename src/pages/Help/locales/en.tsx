import { Separator } from "@chakra-ui/react";
import type React from "react";
import { HelpContentLayout } from "./shared";
import HelpEnControlPanelSection from "./en/ControlPanelSection";
import HelpEnFooterSection from "./en/FooterSection";
import HelpEnIntroSection from "./en/IntroSection";
import HelpEnPayoffTableSection from "./en/PayoffTableSection";
import HelpEnResultsSection from "./en/ResultsSection";
import HelpEnTutorialSection from "./en/TutorialSection";

const HelpEn: React.FC = () => {
  return (
    <HelpContentLayout>
      <HelpEnIntroSection />
      <Separator my={4} size="lg" />
      <HelpEnTutorialSection />
      <Separator my={4} size="lg" />
      <HelpEnPayoffTableSection />
      <Separator my={4} size="lg" />
      <HelpEnControlPanelSection />
      <Separator my={4} size="lg" />
      <HelpEnResultsSection />
      <Separator />
      <HelpEnFooterSection />
    </HelpContentLayout>
  );
};

export default HelpEn;
