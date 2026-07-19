"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ensureScrollTrigger } from "../motion/Reveal";

const IMG_BASE = "/products/hubmonix";
const PETSUPO_IMG_BASE = "/products/petsupo";

/**
 * Minimal screenshot bezel: a thin border + rounded corners + shadow around
 * the raw screenshot. No decorative device chrome, per the brand's
 * "authentic over conceptual" asset guidance.
 */
export function PhoneFrame({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "200px",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] overflow-hidden rounded-[1.5rem] border border-white/15 bg-brand-navy-deep shadow-2xl shadow-black/50 ${className}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
    </div>
  );
}

/**
 * Lightweight homepage teaser: a single phone with a soft idle float.
 * Deliberately does not use the full hero composition — it must tease the
 * experience, not deliver it.
 */
export function HubmonixTeaser() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        normal: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };

        gsap.set(el, { rotationY: -8, transformPerspective: 800 });

        if (reduced) return;

        gsap.to(el, {
          y: -7,
          duration: 3.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div className="flex shrink-0 items-center justify-center" style={{ perspective: 800 }}>
      <div ref={cardRef} style={{ transformStyle: "preserve-3d" }}>
        <PhoneFrame
          src={`${IMG_BASE}/why-hubmonix.webp`}
          alt="Hubmonix uygulama karşılama ekranı"
          className="w-[92px] sm:w-[108px]"
          sizes="108px"
        />
      </div>
    </div>
  );
}

/**
 * Petsupo's homepage sibling to HubmonixTeaser — same mechanism (idle float,
 * minimal bezel), mirrored tilt and a real Petsupo screenshot so the two
 * flagship previews read as related but distinct, not duplicates.
 */
export function PetsupoTeaser() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        normal: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };

        gsap.set(el, { rotationY: 8, transformPerspective: 800 });

        if (reduced) return;

        gsap.to(el, {
          y: -7,
          duration: 3.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div className="flex shrink-0 items-center justify-center" style={{ perspective: 800 }}>
      <div ref={cardRef} style={{ transformStyle: "preserve-3d" }}>
        <PhoneFrame
          src={`${PETSUPO_IMG_BASE}/welcome.webp`}
          alt="Petsupo uygulama karşılama ekranı"
          className="w-[92px] sm:w-[108px]"
          sizes="108px"
        />
      </div>
    </div>
  );
}

/**
 * Dedicated-page hero: three layered phones (front + two depth layers).
 * Entrance plays once; the front card keeps a subtle idle float; a gentle
 * scroll parallax separates the depth layers as the section passes.
 * Motion stays restrained on purpose — every move exists to communicate
 * depth/quality, not to decorate.
 */
export function HubmonixHeroStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const front = frontRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!container || !front || !left || !right) return;

    ensureScrollTrigger();
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced, mobile } = context.conditions as { reduced: boolean; mobile: boolean };

        gsap.set(front, { rotationY: 0, z: 50, y: 0, opacity: 1 });
        gsap.set(left, { rotationY: -13, z: -50, x: -68, y: 20, scale: 0.9, opacity: mobile ? 0 : 0.85 });
        gsap.set(right, { rotationY: 13, z: -50, x: 68, y: 20, scale: 0.9, opacity: mobile ? 0 : 0.85 });

        if (reduced || mobile) return;

        gsap.to(front, {
          y: -6,
          duration: 3.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        const entrance = gsap.timeline({
          scrollTrigger: { trigger: container, start: "top 80%", once: true },
        });
        entrance
          .from(front, { opacity: 0, y: 28, duration: 0.7, ease: "power2.out" })
          .from(left, { opacity: 0, x: -24, duration: 0.6, ease: "power2.out" }, "-=0.35")
          .from(right, { opacity: 0, x: 24, duration: 0.6, ease: "power2.out" }, "-=0.5");

        gsap.to([left, right], {
          y: "-=18",
          ease: "none",
          scrollTrigger: { trigger: container, start: "top bottom", end: "bottom top", scrub: 1 },
        });
        gsap.to(front, {
          y: "-=8",
          ease: "none",
          scrollTrigger: { trigger: container, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto grid h-[380px] w-full max-w-md place-items-center sm:h-[440px]"
      style={{ perspective: 1400 }}
    >
      <div ref={leftRef} className="[grid-area:1/1]" style={{ transformStyle: "preserve-3d" }}>
        <PhoneFrame
          src={`${IMG_BASE}/home-feed.webp`}
          alt="Hubmonix ana akış ekranı"
          className="w-[136px] sm:w-[160px]"
          sizes="160px"
        />
      </div>
      <div ref={rightRef} className="[grid-area:1/1]" style={{ transformStyle: "preserve-3d" }}>
        <PhoneFrame
          src={`${IMG_BASE}/exclusive-page.webp`}
          alt="Hubmonix seçkin içerikler ekranı"
          className="w-[136px] sm:w-[160px]"
          sizes="160px"
        />
      </div>
      <div ref={frontRef} className="relative z-10 [grid-area:1/1]" style={{ transformStyle: "preserve-3d" }}>
        <PhoneFrame
          src={`${IMG_BASE}/why-hubmonix.webp`}
          alt="Hubmonix uygulama karşılama ekranı"
          className="w-[172px] sm:w-[200px]"
          sizes="200px"
          priority
        />
      </div>
    </div>
  );
}

const filmstripScreens = [
  { src: `${IMG_BASE}/today-hilights.webp`, alt: "Hubmonix öne çıkanlar ekranı", caption: "Öne Çıkanlar" },
  { src: `${IMG_BASE}/partner-list.webp`, alt: "Hubmonix partner listesi ekranı", caption: "Partner Listesi" },
  { src: `${IMG_BASE}/partner-collection.webp`, alt: "Hubmonix partner keşif ekranı", caption: "Partner Keşfi" },
  { src: `${IMG_BASE}/private-tutors.webp`, alt: "Hubmonix özel ders partnerleri ekranı", caption: "Özel Ders Partnerleri" },
  { src: `${IMG_BASE}/profile.png`, alt: "Hubmonix profil ekranı", caption: "Profil" },
];

/**
 * Category filmstrip: a flat, scroll-linked glide through 5 real screens.
 * No per-card tilt or decoration — clarity over effect. On touch/mobile and
 * under reduced motion it degrades to a plain swipeable row (no JS).
 */
export function HubmonixFilmstrip() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    ensureScrollTrigger();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(scroller, { overflowX: "visible" });

      gsap.to(track, {
        x: () => Math.min(0, scroller.clientWidth - track.scrollWidth),
        ease: "none",
        scrollTrigger: {
          trigger: scroller,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 1,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={scrollerRef}
      className="overflow-x-auto pb-2"
      style={{ scrollSnapType: "x mandatory" }}
    >
      <div ref={trackRef} className="flex w-max gap-4 px-1 sm:gap-5">
        {filmstripScreens.map((screen) => (
          <figure
            key={screen.src}
            className="w-[132px] shrink-0 sm:w-[160px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <PhoneFrame src={screen.src} alt={screen.alt} className="w-full" sizes="160px" />
            <figcaption className="mt-3 text-center text-xs font-semibold text-slate-400">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
