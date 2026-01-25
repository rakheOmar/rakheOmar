"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { transformUrl } from "unpic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle: string;
  href?: string;
  badges?: string[];
  period: string;
  description?: string;
}

export function ResumeCard({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  const Wrapper = href && !description ? "a" : "div";
  const wrapperProps =
    href && !description
      ? { href, target: "_blank", rel: "noopener noreferrer" }
      : { onClick: handleClick };

  return (
    <Wrapper className="group block cursor-pointer" {...wrapperProps}>
      <Item className="gap-3 rounded-lg px-0 py-0 hover:bg-transparent">
        <ItemMedia variant="image">
          <Avatar className="size-10 border-none bg-muted">
            <AvatarImage
              alt={altText}
              className="object-contain"
              src={
                transformUrl({ url: logoUrl, width: 80, height: 80 }) || logoUrl
              }
            />
            <AvatarFallback className="text-xs">{altText[0]}</AvatarFallback>
          </Avatar>
        </ItemMedia>

        <ItemContent className="min-w-0 flex-1 gap-0.5">
          <ItemTitle className="font-medium text-sm">
            {title}
            {description ? (
              <HugeiconsIcon
                className={cn(
                  "ml-1 size-3.5 text-muted-foreground transition-transform duration-200",
                  isExpanded ? "rotate-90" : "rotate-0"
                )}
                icon={ArrowRight01Icon}
                strokeWidth={2}
              />
            ) : (
              <HugeiconsIcon
                className="ml-1 size-3.5 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                icon={ArrowRight01Icon}
                strokeWidth={2}
              />
            )}
          </ItemTitle>

          <ItemDescription className="text-xs">{subtitle}</ItemDescription>

          {Array.isArray(badges) && badges.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {badges.map((badge) => (
                <Badge
                  className="h-5 px-1.5 text-[10px]"
                  key={badge}
                  variant="secondary"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {description ? (
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isExpanded
                  ? "mt-2 grid-rows-[1fr] opacity-100"
                  : "mt-0 grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden text-muted-foreground text-xs">
                {description}
              </div>
            </div>
          ) : null}
        </ItemContent>

        <span className="shrink-0 font-mono text-muted-foreground text-xs tabular-nums">
          {period}
        </span>
      </Item>
    </Wrapper>
  );
}
