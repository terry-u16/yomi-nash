import { Separator } from "@chakra-ui/react";
import type React from "react";
import { HelpContentLayout } from "./shared";
import HelpJaControlPanelSection from "./ja/ControlPanelSection";
import HelpJaFooterSection from "./ja/FooterSection";
import HelpJaIntroSection from "./ja/IntroSection";
import HelpJaPayoffTableSection from "./ja/PayoffTableSection";
import HelpJaResultsSection from "./ja/ResultsSection";
import HelpJaTutorialSection from "./ja/TutorialSection";

const HelpJa: React.FC = () => {
  return (
    <HelpContentLayout>
      <HelpJaIntroSection />
      <Separator my={4} size="lg" />
      <HelpJaTutorialSection />
      <Separator my={4} size="lg" />
      <HelpJaPayoffTableSection />
      <Separator my={4} size="lg" />
      <HelpJaControlPanelSection />
      <Separator my={4} size="lg" />
      <HelpJaResultsSection />
      <Separator />
      <HelpJaFooterSection />
    </HelpContentLayout>
  );
};

export default HelpJa;
