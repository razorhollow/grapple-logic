import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import FAQSection from "~/components/landing/FAQSection";
import FeatureSection from "~/components/landing/FeaturesSection";
import HeroSection from "~/components/landing/Hero";
import HowSection from "~/components/landing/HowSection";
import { useOptionalUser } from "~/utils";


export const meta: MetaFunction = () => [{ title: "Grapple Logic" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main>
      <HeroSection user={user}/>
      <FeatureSection />
      <HowSection />
      <FAQSection />
    </main>
  );
}
