import { LegalPage } from "../components/LegalPage";
import { legalContent } from "../legalContent";
import { pageMetadata } from "../metadata";

const content = legalContent.cookies;

export const metadata = pageMetadata(content.title, content.description, "/cookies");

export default function CookiesPage() {
  return <LegalPage {...content} />;
}
