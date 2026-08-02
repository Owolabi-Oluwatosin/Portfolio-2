import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center px-5 py-32 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted">That route doesn&apos;t exist.</p>
      <Link href="/" className="mt-8 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg">
        Back home
      </Link>
    </div>
  );
}
