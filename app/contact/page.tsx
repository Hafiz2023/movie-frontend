'use client';
import React from 'react';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black pb-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[128px] opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[128px] opacity-20" />
      </div>

      {/* Hero Section */}
      <ContactHero />

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Column: Contact Form (Takes up 2/3 space on large screens) */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Right Column: Contact Info (Takes up 1/3 space on large screens) */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
