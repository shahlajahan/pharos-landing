import { LegalPage } from "../components/LegalPage";
import { legalContent } from "../legalContent";
import { pageMetadata } from "../metadata";

const content = legalContent.refund;

export const metadata = pageMetadata(content.title, content.description, "/refund");

export default function RefundPage() {
  return <LegalPage {...content} />;
}
