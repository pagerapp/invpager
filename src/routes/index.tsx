import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/pager/Nav";
import { Hero } from "@/components/pager/chapters/Hero";
import { Evolution } from "@/components/pager/chapters/Evolution";
import { PagerId } from "@/components/pager/chapters/PagerId";
import { Multiprofile } from "@/components/pager/chapters/Multiprofile";
import { ContactContext } from "@/components/pager/chapters/ContactContext";
import { ProductStatus } from "@/components/pager/chapters/ProductStatus";
import { Business } from "@/components/pager/chapters/Business";
import { FinalCta } from "@/components/pager/chapters/FinalCta";

const TITLE = "PAGER — мессенджер с управляемым доступом";
const DESC =
  "PAGER — один аккаунт, разные профили общения и разные границы доступа. PAGER ID, мультипрофиль и правила связи. Private beta — Q3 2026.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <section id="chapter-01" aria-label="Хаос, контекст, контроль">
          <Hero />
        </section>
        <Evolution />
        <PagerId />
        <Multiprofile />
        <ContactContext />
        <ProductStatus />
        <Business />
        <FinalCta />
      </main>
    </div>
  );
}
