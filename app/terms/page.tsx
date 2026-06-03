import { LegalPage } from "../components/LegalPage";
import { legalContent } from "../legalContent";
import { pageMetadata } from "../metadata";

const content = legalContent.terms;

export const metadata = pageMetadata(content.title, content.description, "/terms");

export default function TermsPage() {
  return <LegalPage {...content} />;
}
