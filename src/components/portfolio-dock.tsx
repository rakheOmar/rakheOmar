"use client";

import {
  FileEditIcon,
  Github01Icon,
  Home01Icon,
  Linkedin01Icon,
  Moon02Icon,
  NewTwitterIcon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Dock, DockIcon } from "@/components/ui/dock";

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export function PortfolioDock() {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const commonIconClass =
    "h-full w-full text-neutral-500 dark:text-neutral-300";

  const links = [
    {
      title: "Home",
      icon: <HugeiconsIcon className={commonIconClass} icon={Home01Icon} />,
      href: "/",
    },
    {
      title: "Blog",
      icon: <HugeiconsIcon className={commonIconClass} icon={FileEditIcon} />,
      href: "/blog",
    },
    { separator: true, id: "sep-1" },
    {
      title: "GitHub",
      icon: <HugeiconsIcon className={commonIconClass} icon={Github01Icon} />,
      href: "https://github.com/rakheOmar",
      target: "_blank",
    },
    {
      title: "LinkedIn",
      icon: <HugeiconsIcon className={commonIconClass} icon={Linkedin01Icon} />,
      href: "https://www.linkedin.com/in/rakheOmar/",
      target: "_blank",
    },
    {
      title: "Twitter",
      icon: <HugeiconsIcon className={commonIconClass} icon={NewTwitterIcon} />,
      href: "https://twitter.com/rakheOmar",
      target: "_blank",
    },
    { separator: true, id: "sep-2" },
    {
      title: "Theme",
      // When not mounted (SSR), default to Sun to avoid hydration mismatch or show nothing
      icon:
        !mounted || theme === "dark" ? (
          <HugeiconsIcon className={commonIconClass} icon={Sun03Icon} />
        ) : (
          <HugeiconsIcon className={commonIconClass} icon={Moon02Icon} />
        ),
      href: "#",
      onClick: toggleTheme,
    },
  ];

  return (
    <div className="flex w-full items-center justify-center pb-4">
      <Dock
        direction="middle"
        disableMagnification={isMobile}
        iconSize={isMobile ? 32 : 40}
      >
        {links.map((item) => {
          if (item.separator) {
            return (
              <div
                className="mx-1 h-6 w-px bg-neutral-200 sm:h-8 dark:bg-neutral-800"
                key={item.id}
              />
            );
          }

          const isExternal = item.href?.startsWith("http");
          // Just use 'a' tag for everything in Astro/MPA context usually, or separate logic if needed.
          // Since it's a portfolio, single page usually, or MPA. 'a' tag works for both internal/external.
          const isButton = item.onClick;

          return (
            <DockIcon key={item.title}>
              {isButton ? (
                <button
                  className="flex h-full w-full items-center justify-center"
                  onClick={item.onClick}
                  title={item.title}
                  type="button"
                >
                  {item.icon}
                </button>
              ) : (
                <a
                  aria-label={item.title}
                  className="flex h-full w-full items-center justify-center"
                  href={item.href}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  target={item.target}
                  title={item.title}
                >
                  {item.icon}
                </a>
              )}
            </DockIcon>
          );
        })}
      </Dock>
    </div>
  );
}
