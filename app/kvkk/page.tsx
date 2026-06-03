import { LegalPage } from "../components/LegalPage";
import { legalContent } from "../legalContent";
import { pageMetadata } from "../metadata";

const content = legalContent.kvkk;

export const metadata = pageMetadata(content.title, content.description, "/kvkk");

export default function KvkkPage() {
  return <LegalPage {...content} />;
}
