import { LegalPage } from "../components/LegalPage";
import { legalContent } from "../legalContent";
import { pageMetadata } from "../metadata";

const content = legalContent.privacy;

export const metadata = pageMetadata(content.title, content.description, "/privacy");

export default function PrivacyPage() {
  return <LegalPage {...content} />;
}
