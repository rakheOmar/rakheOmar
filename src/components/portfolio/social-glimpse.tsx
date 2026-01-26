import {
  GithubIcon,
  Linkedin02Icon,
  Mail02Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tooltip } from "@/components/ui/tooltip-card";

interface SocialGlimpseProps {
  name: string;
  url: string;
  iconName: string;
  glimpseData: {
    title: string | null;
    description: string | null;
    image: string | null;
  };
}

export function SocialGlimpse({
  name,
  url,
  iconName,
  glimpseData,
}: SocialGlimpseProps) {
  let Icon = GithubIcon;
  const lowerName = name.toLowerCase();
  const lowerIcon = iconName.toLowerCase();

  // Helper mapping for Icons
  if (lowerName.includes("linkedin") || lowerIcon === "linkedin") {
    Icon = Linkedin02Icon;
  } else if (
    lowerName.includes("note") ||
    lowerName.includes("twitter") ||
    lowerName.includes("x") ||
    lowerIcon === "note"
  ) {
    Icon = NewTwitterIcon;
  } else if (lowerName.includes("email") || lowerIcon === "mail") {
    Icon = Mail02Icon;
  }

  const isEmail = name === "Email";
  const containerClass = isEmail ? "w-48" : "w-64";
  const imageClass = isEmail ? "h-28" : "h-40";

  const tooltipContent = (
    <div className={`flex flex-col gap-2 ${containerClass}`}>
      <img
        alt={glimpseData.title ?? name}
        className={`${imageClass} w-full bg-muted/20 object-cover rounded-md`}
        src={glimpseData.image ?? ""}
      />
      <div>
        <p className="font-semibold text-foreground">
          {glimpseData.title || name}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {glimpseData.description || url}
        </p>
      </div>
    </div>
  );

  return (
    <Tooltip content={tooltipContent} containerClassName="block">
      <a
        aria-label={name}
        className="block cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <HugeiconsIcon icon={Icon} size={15} />
      </a>
    </Tooltip>
  );
}
