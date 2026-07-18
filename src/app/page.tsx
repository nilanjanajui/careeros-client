import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col items-center px-4 py-32 text-center">
      <h1 className="font-heading text-h1-mobile text-on-surface md:text-h1">
        Your career, <span className="text-primary">operated intelligently.</span>
      </h1>
      <p className="mt-6 w-full max-w-xl font-body text-body-lg text-on-surface-variant">
        Discover roles, track every application, and let AI tailor your cover letters and resume bullets — all in one place.
      </p>
      <Link
        href="/jobs"
        className="mt-10 rounded-input bg-primary px-8 py-4 font-body text-base font-medium text-on-primary shadow-card transition-colors hover:bg-primary-container"
      >
        Explore Jobs
      </Link>
    </main>
  );
}