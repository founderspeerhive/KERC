import * as React from "react";
import Hero from "../components/hero";

import Feature from "../components/feature";
import Feature2 from "../components/feature2";
import Benefits from "../components/benefits";
import CTA from "../components/cta";
import KercSteps from "../components/steps";

export default function Home() {
  return (
    <div className=" ">
      <main className=" ">
        {/* Hero Section */}
        <Hero />

        {/* What We Do Section with Bento Grid */}
        <Feature />
        <Feature2 />
        {/* Benefits Section */}
        <Benefits />
        {/* Steps Section */}
        <KercSteps />
        {/* CTA Section */}
        <CTA />
      </main>
    </div>
  );
}
