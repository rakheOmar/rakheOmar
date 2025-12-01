import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link to={href || "#"} className="block cursor-pointer group" onClick={handleClick}>
      <Card className="flex flex-row items-start gap-x-4 border-none shadow-none bg-transparent p-0">
        <Avatar className="inline-flex size-12 bg-muted-background dark:bg-foreground border flex-none shrink-0">
          <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-row grow items-start justify-between">
          <div className="flex flex-col">
            <div className="inline-flex items-center font-semibold text-sm sm:text-base leading-tight">
              {title}

              {description ? (
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={16}
                  strokeWidth={1.5}
                  className={cn(
                    "ml-1 transition-transform duration-300 ease-out",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              ) : (
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={16}
                  strokeWidth={1.5}
                  className={cn(
                    "ml-1 transition-all duration-300 ease-out",
                    "opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"
                  )}
                />
              )}
            </div>

            <div className="text-xs text-muted-foreground leading-tight mt-0.5">{subtitle}</div>

            {badges && (
              <div className="flex gap-1 mt-1">
                {badges.map((badge, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="text-[10px] px-1 py-0 h-4 leading-none"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {description && (
              <div
                className={cn(
                  "grid transition-all duration-500 ease-out",
                  isExpanded ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"
                )}
              >
                <div className="overflow-hidden text-xs sm:text-sm text-foreground/80">
                  {description}
                </div>
              </div>
            )}
          </div>

          <div className="text-xs font-mono sm:text-sm tabular-nums text-muted-foreground text-right whitespace-nowrap ml-4">
            {period}
          </div>
        </div>
      </Card>
    </Link>
  );
};
