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
import { useEffect } from "react";
import { LocaleProvider, useT } from "@/i18n";
import { ru } from "@/i18n/ru";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: ru.meta.title },
      { name: "description", content: ru.meta.desc },
      { property: "og:title", content: ru.meta.title },
      { property: "og:description", content: ru.meta.desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <LocaleProvider>
      <Page />
    </LocaleProvider>
  );
}

function Page() {
  const t = useT();
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <LocaleTitle />
      <Nav />
      <main>
        <section id="chapter-01" aria-label={t.hero.sectionAria}>
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

/** Keeps document title/description in sync with the selected locale. */
function LocaleTitle() {
  const t = useT();
  useEffect(() => {
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.desc);
  }, [t]);
  return null;
}
