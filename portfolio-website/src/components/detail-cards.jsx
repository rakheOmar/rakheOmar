import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
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
    // 1. Added 'group' class here
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
                <ChevronRightIcon
                  className={cn(
                    "size-4 ml-1 transition-transform duration-300 ease-out",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              ) : (
                <ChevronRightIcon
                  className={cn(
                    "size-4 ml-1 transition-all duration-300 ease-out",
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
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  height: isExpanded ? "auto" : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-2 text-xs sm:text-sm text-foreground/80"
              >
                {description}
              </motion.div>
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
