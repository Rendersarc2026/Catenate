import { ArrowButton } from "@/components/site/arrow-button";
import { HeroBackdrop } from "@/components/site/hero-backdrop";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

const shortcuts = [
  { label: "Industries we serve", href: "/#industries" },
  { label: "Brands and products", href: "/brands" },
  { label: "Solutions finder", href: "/#finder" },
  { label: "Approvals", href: "/about" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="on-blue content-pad relative flex min-h-[min(88vh,760px)] flex-col items-center justify-center overflow-hidden py-40 text-center text-white">
          <div className="absolute inset-0 z-0">
            <HeroBackdrop />
          </div>

          <div className="relative z-2 max-w-[46ch]">
            <span className="eyebrow tracking-[0.24em] opacity-62">Error 404</span>

            <h1 className="mb-7 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.18] font-light tracking-[-0.022em]">
              This page isn&rsquo;t in the specification.
            </h1>

            <p className="mx-auto mb-10 text-[16.5px] leading-[1.7] text-white/72">
              The link may be out of date, or the page may have moved. The sections
              below cover most of what people come here looking for.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5">
              <ArrowButton href="/" variant="onBlue">
                Back to the homepage
              </ArrowButton>
              <ArrowButton href="/#contact" variant="line">
                Talk to us
              </ArrowButton>
            </div>
          </div>

          <nav
            aria-label="Popular sections"
            className="relative z-2 mt-14 flex flex-wrap justify-center gap-2"
          >
            {shortcuts.map((shortcut) => (
              <a
                key={shortcut.href}
                href={shortcut.href}
                className="rounded-full px-4.5 py-2.25 text-sm text-white/82 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.24)] transition-all duration-250 ease-expo hover:bg-white hover:text-blue hover:shadow-none"
              >
                {shortcut.label}
              </a>
            ))}
          </nav>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
