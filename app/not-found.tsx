import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-3xl flex-col items-center justify-center px-5 py-40 text-center">
      <p className="font-display text-8xl font-semibold tracking-tight text-gradient">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">This page doesn’t exist.</h1>
      <p className="mt-3 text-muted">The link may be broken or the page may have moved.</p>
      <ButtonLink href="/" className="mt-8">Back to home</ButtonLink>
    </section>
  );
}
