import {
  FileEditIcon,
  Github01Icon,
  Home01Icon,
  Linkedin01Icon,
  Moon02Icon,
  NewTwitterIcon,
  Sun03Icon,
} from "hugeicons-react";
import { FloatingDock } from "@/components/aceternity/floating-dock";
import { useTheme } from "@/components/theme-provider";

export default function PortfolioDock() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (e) => {
    e.preventDefault();
    console.log("Toggle clicked! Current theme:", theme);
    const newTheme = theme === "dark" ? "light" : "dark";
    console.log("Setting theme to:", newTheme);
    setTheme(newTheme);
  };

  const links = [
    {
      title: "Home",
      icon: <Home01Icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
    },
    {
      title: "Blog",
      icon: <FileEditIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/blog",
    },
    { separator: true },
    {
      title: "GitHub",
      icon: <Github01Icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://github.com/rakheOmar",
    },
    {
      title: "LinkedIn",
      icon: <Linkedin01Icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://www.linkedin.com/in/rakheomar/",
    },
    {
      title: "Twitter",
      icon: <NewTwitterIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://twitter.com/frostmage10",
    },
    { separator: true },
    {
      title: theme === "dark" ? "Light Mode" : "Dark Mode",
      icon:
        theme === "dark" ? (
          <Sun03Icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ) : (
          <Moon02Icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
      href: "#",
      onClick: toggleTheme,
    },
  ];

  return (
    <div className="flex items-center justify-center w-full pb-4">
      <FloatingDock items={links} />
    </div>
  );
}
