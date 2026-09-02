import { createFileRoute } from "@tanstack/react-router";

import { Loader } from "@/components/luxe/Loader";
import { Navigation } from "@/components/luxe/Navigation";
import { Hero } from "@/components/luxe/Hero";
import { StateShowcase } from "@/components/luxe/StateShowcase";
import { CollectionGrid } from "@/components/luxe/CollectionGrid";
import { HeritageTimeline } from "@/components/luxe/HeritageTimeline";
import { ArtisanSection } from "@/components/luxe/ArtisanSection";
import { Footer } from "@/components/luxe/Footer";
import { FlowingBand } from "@/components/luxe/FlowingBand";
import { BandGallery } from "@/components/luxe/BandGallery";

const TITLE = "SAMBODRA — Handwoven Luxury Indian Sarees";
const DESC =
  "A private register of handwoven Banarasi, Kanjeevaram, Sambalpuri and Jamdani sarees, commissioned directly from master weavers in editions of one to twelve.";

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
    <>
      <Loader />
      <Navigation />
      <main>
        <Hero />
        <FlowingBand />
        <StateShowcase />
        <FlowingBand reverse={true} />
        <CollectionGrid />
        <BandGallery />
        <HeritageTimeline />
        <ArtisanSection />
      </main>
      <Footer />
    </>
  );
}
