"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ensureScrollTrigger } from "../motion/Reveal";
import { PhoneFrame } from "./HubmonixShowcase";

const IMG_BASE = "/products/petsupo";

type OrbitKey = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

const orbitRest: Record<OrbitKey, gsap.TweenVars> = {
  topLeft: { x: -148, y: -88, z: -30, rotationY: -11, scale: 0.72, opacity: 0.88 },
  topRight: { x: 148, y: -88, z: -30, rotationY: 11, scale: 0.72, opacity: 0.88 },
  bottomLeft: { x: -138, y: 96, z: -22, rotationY: -8, scale: 0.66, opacity: 0.82 },
  bottomRight: { x: 138, y: 96, z: -22, rotationY: 8, scale: 0.66, opacity: 0.82 },
};

/**
 * Petsupo's answer to HubmonixHeroStack: instead of one focused hero with
 * two depth layers, five real surfaces (owner, vet, business, taxi,
 * adoption) sit in a hub-and-spoke cluster — the composition itself
 * communicates "one ecosystem, many connected services" without resorting
 * to a labeled node diagram. Same restrained motion philosophy: one idle
 * float, a single entrance, a subtle scroll parallax.
 */
export function PetsupoEcosystemShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const center = centerRef.current;
    const orbitEls: Record<OrbitKey, HTMLDivElement | null> = {
      topLeft: topLeftRef.current,
      topRight: topRightRef.current,
      bottomLeft: bottomLeftRef.current,
      bottomRight: bottomRightRef.current,
    };
    if (!container || !center || Object.values(orbitEls).some((el) => !el)) return;

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

        gsap.set(center, { rotationY: 0, z: 44, x: 0, y: 0, scale: 1, opacity: 1 });
        (Object.keys(orbitEls) as OrbitKey[]).forEach((key) => {
          gsap.set(orbitEls[key], { ...orbitRest[key], opacity: mobile ? 0 : orbitRest[key].opacity });
        });

        if (reduced || mobile) return;

        gsap.to(center, {
          y: -6,
          duration: 3.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        const entrance = gsap.timeline({
          scrollTrigger: { trigger: container, start: "top 80%", once: true },
        });
        entrance.from(center, { opacity: 0, y: 24, scale: 0.92, duration: 0.7, ease: "power2.out" });
        (Object.keys(orbitEls) as OrbitKey[]).forEach((key, index) => {
          const rest = orbitRest[key];
          entrance.from(
            orbitEls[key],
            {
              opacity: 0,
              x: (rest.x as number) * 1.5,
              y: (rest.y as number) * 1.5,
              scale: (rest.scale as number) * 0.7,
              duration: 0.6,
              ease: "power2.out",
            },
            index === 0 ? "-=0.3" : "-=0.42",
          );
        });

        gsap.to(center, {
          y: "-=10",
          ease: "none",
          scrollTrigger: { trigger: container, start: "top bottom", end: "bottom top", scrub: 1 },
        });
        gsap.to(Object.values(orbitEls), {
          y: "-=22",
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
      className="relative mx-auto grid h-[380px] w-full max-w-lg place-items-center sm:h-[440px]"
      style={{ perspective: 1500 }}
    >
      <div ref={topLeftRef} className="[grid-area:1/1]" style={{ transformStyle: "preserve-3d" }}>
        <PhoneFrame
          src={`${IMG_BASE}/vet-booking.webp`}
          alt="Petsupo veteriner randevu ekranı"
          className="w-[112px] sm:w-[128px]"
          sizes="128px"
        />
      </div>
      <div ref={topRightRef} className="[grid-area:1/1]" style={{ transformStyle: "preserve-3d" }}>
        <PhoneFrame
          src={`${IMG_BASE}/business-dashboard.webp`}
          alt="Petsupo işletme paneli ekranı"
          className="w-[112px] sm:w-[128px]"
          sizes="128px"
        />
      </div>
      <div ref={bottomLeftRef} className="[grid-area:1/1]" style={{ transformStyle: "preserve-3d" }}>
        <PhoneFrame
          src={`${IMG_BASE}/adoption.webp`}
          alt="Petsupo sahiplendirme ekranı"
          className="w-[104px] sm:w-[120px]"
          sizes="120px"
        />
      </div>
      <div ref={bottomRightRef} className="[grid-area:1/1]" style={{ transformStyle: "preserve-3d" }}>
        <PhoneFrame
          src={`${IMG_BASE}/taxi-booking.webp`}
          alt="Petsupo pet taksi ekranı"
          className="w-[104px] sm:w-[120px]"
          sizes="120px"
        />
      </div>
      <div ref={centerRef} className="relative z-10 [grid-area:1/1]" style={{ transformStyle: "preserve-3d" }}>
        <PhoneFrame
          src={`${IMG_BASE}/home-feed.webp`}
          alt="Petsupo evcil hayvan sahibi ana akış ekranı"
          className="w-[164px] sm:w-[188px]"
          sizes="188px"
          priority
        />
      </div>
    </div>
  );
}
