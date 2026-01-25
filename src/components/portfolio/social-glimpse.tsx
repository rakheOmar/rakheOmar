"use client";

import {
  GithubIcon,
  Linkedin02Icon,
  Mail02Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Glimpse,
  GlimpseContent,
  GlimpseDescription,
  GlimpseImage,
  GlimpseTitle,
  GlimpseTrigger,
} from "@/components/kibo-ui/glimpse";

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

  return (
    <Glimpse>
      <GlimpseTrigger
        aria-label={name}
        className="block cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <HugeiconsIcon icon={Icon} size={15} />
      </GlimpseTrigger>
      <GlimpseContent className="w-80">
        <GlimpseImage
          alt={glimpseData.title ?? name}
          className="mb-2 h-32 w-full bg-muted/20 object-cover"
          src={glimpseData.image ?? ""}
        />
        <GlimpseTitle>{glimpseData.title || name}</GlimpseTitle>
        <GlimpseDescription>
          {glimpseData.description || url}
        </GlimpseDescription>
      </GlimpseContent>
    </Glimpse>
  );
}
