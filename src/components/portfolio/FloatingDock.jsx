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
import { Link } from "react-router-dom";

import { Dock, DockIcon } from "@/components/magic-ui/Dock";
import { useTheme } from "@/components/theme-provider";

export default function PortfolioDock() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (e) => {
    e.preventDefault();
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const commonIconClass = "h-full w-full text-neutral-500 dark:text-neutral-300";

  const links = [
    {
      title: "Home",
      icon: <HugeiconsIcon icon={Home01Icon} className={commonIconClass} />,
      href: "/",
    },
    {
      title: "Blog",
      icon: <HugeiconsIcon icon={FileEditIcon} className={commonIconClass} />,
      href: "/blog",
    },
    { separator: true },
    {
      title: "GitHub",
      icon: <HugeiconsIcon icon={Github01Icon} className={commonIconClass} />,
      href: "https://github.com/rakheOmar",
      target: "_blank",
    },
    {
      title: "LinkedIn",
      icon: <HugeiconsIcon icon={Linkedin01Icon} className={commonIconClass} />,
      href: "https://www.linkedin.com/in/rakheOmar/",
      target: "_blank",
    },
    {
      title: "Twitter",
      icon: <HugeiconsIcon icon={NewTwitterIcon} className={commonIconClass} />,
      href: "https://twitter.com/frostmage10",
      target: "_blank",
    },
    { separator: true },
    {
      title: theme === "dark" ? "Light Mode" : "Dark Mode",
      icon:
        theme === "dark" ? (
          <HugeiconsIcon icon={Sun03Icon} className={commonIconClass} />
        ) : (
          <HugeiconsIcon icon={Moon02Icon} className={commonIconClass} />
        ),
      href: "#",
      onClick: toggleTheme,
    },
  ];

  return (
    <div className="flex items-center justify-center w-full pb-4">
      <Dock direction="middle">
        {links.map((item, idx) => {
          if (item.separator) {
            return (
              <div
                key={`sep-${idx}`}
                className="h-8 w-[1px] bg-neutral-200 dark:bg-neutral-800 mx-1"
              />
            );
          }

          const isExternal = item.href.startsWith("http");
          const LinkComponent = isExternal ? "a" : Link;

          return (
            <DockIcon key={item.title || idx}>
              <LinkComponent
                to={item.href}
                href={item.href}
                target={item.target}
                rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                onClick={item.onClick}
                className="flex h-full w-full items-center justify-center"
                title={item.title}
              >
                {item.icon}
              </LinkComponent>
            </DockIcon>
          );
        })}
      </Dock>
    </div>
  );
}
