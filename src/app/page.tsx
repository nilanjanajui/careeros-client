"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroPreview } from "@/components/landing/HeroPreview";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LiveStats } from "@/components/landing/LiveStats";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <main className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-24 lg:grid-cols-2 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }}
            className="font-heading text-h1-mobile text-on-surface md:text-h1"
          >
            Your career, <span className="text-primary">operated intelligently.</span>
          </motion.h1>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }}
            className="mt-6 w-full max-w-xl font-body text-body-lg text-on-surface-variant"
          >
            Discover roles, track every application, and let AI tailor your cover letters and resume bullets — all in one place.
          </motion.p>
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/register"
              className="rounded-input bg-primary px-8 py-4 text-center font-body text-base font-medium text-on-primary shadow-card transition-colors hover:bg-primary-container"
            >
              Get Started
            </Link>
            <Link
              href="/jobs"
              className="rounded-input border border-outline px-8 py-4 text-center font-body text-base font-medium text-on-surface hover:bg-surface-container-low"
            >
              Explore Jobs
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 30 }}
          className="flex justify-center lg:justify-end"
        >
          <HeroPreview />
        </motion.div>
      </main>

      <Features />
      <HowItWorks />
      <LiveStats />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}