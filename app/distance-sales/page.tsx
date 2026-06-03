import { LegalPage } from "../components/LegalPage";
import { legalContent } from "../legalContent";
import { pageMetadata } from "../metadata";

const content = legalContent["distance-sales"];

export const metadata = pageMetadata(content.title, content.description, "/distance-sales");

export default function DistanceSalesPage() {
  return <LegalPage {...content} />;
}
