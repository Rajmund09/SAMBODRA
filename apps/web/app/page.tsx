'use client';

import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Craft from '../components/Craft';
import RegionExplorer from '../components/RegionExplorer';
import Weaves from '../components/Weaves';
import Refine from '../components/Refine';
import Editorial from '../components/Editorial';
import Heritage from '../components/Heritage';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function Home() {
  const [animateIn, setAnimateIn] = useState(false);

  return (
    <>
      <Loader onComplete={() => setAnimateIn(true)} />
      <Nav />
      <Hero animateIn={animateIn} />
      <Marquee />
      <Craft />
      <RegionExplorer />
      <Weaves />
      <Refine />
      <Editorial />
      <Heritage />
      <Newsletter />
      <Footer />
    </>
  );
}
