import Link from "next/link";
import { HeroPreview } from "@/components/landing/HeroPreview";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LiveStats } from "@/components/landing/LiveStats";
import { FAQ } from "@/components/landing/FAQ";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <main className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <h1 className="font-heading text-h1-mobile text-on-surface md:text-h1">
            Your career, <span className="text-primary">operated intelligently.</span>
          </h1>
          <p className="mt-6 w-full max-w-xl font-body text-body-lg text-on-surface-variant">
            Discover roles, track every application, and let AI tailor your cover letters and resume bullets — all in one place.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroPreview />
        </div>
      </main>

      <Features />
      <HowItWorks />
      <LiveStats />
      <FAQ />
      <CTASection />
    </>
  );
}