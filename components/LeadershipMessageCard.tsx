"use client";

import { useEffect, useRef, useState } from "react";

type LeadershipMessageCardProps = {
  title: string;
  name: string;
  role: string;
  institute: string;
  image: string;
  imageAlt: string;
  message: string;
  index: number;
};

export function LeadershipMessageCard({
  title,
  name,
  role,
  image,
  imageAlt,
  message,
  index,
}: LeadershipMessageCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_4px_24px_rgba(16,42,67,0.08)] transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(36,65,182,0.15)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[#eef1f5] px-3 py-4 sm:min-h-[280px] md:min-h-[300px]">
        <img
          src={image}
          alt={imageAlt}
          className="max-h-56 w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] sm:max-h-64 md:max-h-72"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#2441B6]">
          {title}
        </p>
        <h3 className="mb-1 text-xl font-bold text-gray-900 md:text-2xl">{name}</h3>
        <p className="mb-5 text-sm text-gray-500">{role}</p>
        <p className="text-sm leading-relaxed text-gray-600 text-justify md:text-[15px] md:leading-7">
          {message}
        </p>
      </div>
    </article>
  );
}
