'use client';

import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-1 group">
      <span className="bg-primary text-primary-foreground font-bold text-2xl px-2 py-0.5 rounded-[4px] flex items-center justify-center tracking-tighter shadow-[0_0_15px_rgba(250,157,5,0.4)] transition-transform group-hover:scale-105">
        TUBE
      </span>
    </Link>
  );
};

export default Logo;
