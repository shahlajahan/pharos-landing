import { LegalPage } from "../components/LegalPage";
import { legalContent } from "../legalContent";
import { pageMetadata } from "../metadata";

const content = legalContent["platform-disclaimer"];

export const metadata = pageMetadata(content.title, content.description, "/platform-disclaimer");

export default function PlatformDisclaimerPage() {
  return <LegalPage {...content} />;
}
