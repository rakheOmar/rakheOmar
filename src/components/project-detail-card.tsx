"use client";

import { GithubIcon, Globe02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Image } from "@unpic/react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Regex patterns defined at module level for performance

interface LinkItem {
  type: string;
  href: string;
  icon: React.ReactNode | string;
}

interface Teammate {
  name: string;
  url?: string;
  avatar?: string;
}

interface ProjectDetailCardProps {
  title: string;
  href?: string;
  description: string;
  techStack?: string[];
  teammates?: Teammate[];
  link?: string;
  image?: string;
  video?: string;
  links?: LinkItem[];
  className?: string;
}

function LazyMedia({
  video,
  image,
  title,
  href,
  className,
  imageClassName,
}: {
  video?: string;
  image?: string;
  title: string;
  href?: string;
  className?: string;
  imageClassName?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play().catch((err) => {
        console.warn("Video play failed:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      setIsPlaying(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const renderMedia = () => {
    if (video && isVisible) {
      return (
        <div className="relative size-full">
          <video
            className="pointer-events-none absolute inset-0 size-full object-cover object-top"
            loop
            muted={true}
            playsInline
            ref={videoRef}
            src={video}
          />
          {image && (
            <div
              className={cn(
                "absolute inset-0 z-10 size-full transition-opacity duration-300",
                isPlaying ? "opacity-0" : "opacity-100"
              )}
            >
              <Image
                alt={title}
                className={cn(
                  "size-full object-cover object-top",
                  imageClassName
                )}
                height={360}
                layout="constrained"
                src={image}
                width={640}
              />
            </div>
          )}
        </div>
      );
    }

    if (image) {
      return (
        <Image
          alt={title}
          className={cn("size-full object-cover object-top", imageClassName)}
          height={360}
          layout="constrained"
          src={image}
          width={640}
        />
      );
    }

    return null;
  };

  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  if (video) {
    return (
      // biome-ignore lint/a11y/noStaticElementInteractions: Hover logic for video preview
      // biome-ignore lint/a11y/noNoninteractiveElementInteractions: Visual preview only, interaction handled by parent
      <div
        className={cn(
          "block w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="h-full w-full overflow-hidden bg-muted"
          ref={containerRef}
        >
          {renderMedia()}
        </div>
      </div>
    );
  }

  return (
    <Wrapper
      aria-label={`View ${title} project`}
      className={cn(
        "block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...wrapperProps}
    >
      <div
        className="h-full w-full overflow-hidden bg-muted"
        ref={containerRef}
      >
        {renderMedia()}
      </div>
    </Wrapper>
  );
}

export function ProjectDetailCard({
  title,
  href,
  description,
  techStack,
  teammates,
  image,
  video,
  links,
  className,
}: ProjectDetailCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Logic to determine if "Read more" is needed
  // Simple heuristic: string length > 200 chars?
  const isLong = description.length > 200;

  return (
    <>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent className="max-w-4xl overflow-hidden border-none bg-black p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{title} Demo</DialogTitle>
          </DialogHeader>
          {video && (
            // biome-ignore lint/a11y/useMediaCaption: Project demos do not have spoken audio
            <video
              autoPlay
              className="h-auto max-h-[80vh] w-full object-contain"
              controls
              loop
              playsInline
              src={video}
            />
          )}
        </DialogContent>
      </Dialog>
      <div className={cn("block", className)}>
        <Item className="flex-col items-start justify-between gap-3 px-0 py-0 hover:bg-transparent sm:flex-row">
          <ItemContent className="min-w-0 flex-1 flex-col items-start gap-1">
            <div className="flex w-full flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <ItemTitle className="font-medium text-sm">
                  {href ? (
                    <a
                      className="hover:underline"
                      href={href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {title}
                    </a>
                  ) : (
                    title
                  )}
                </ItemTitle>
                {links && links.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    {links.map((linkItem) => {
                      const iconName = linkItem.type?.toLowerCase() || "";
                      let Icon = Globe02Icon;
                      if (
                        iconName.includes("github") ||
                        iconName.includes("source")
                      ) {
                        Icon = GithubIcon;
                      }

                      return (
                        <a
                          className="text-muted-foreground hover:text-foreground"
                          href={linkItem.href}
                          key={linkItem.href}
                          rel="noopener noreferrer"
                          target="_blank"
                          title={linkItem.type}
                        >
                          <HugeiconsIcon
                            icon={Icon}
                            size={14}
                            strokeWidth={2}
                          />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-2">
              <div
                className={cn(
                  "relative text-muted-foreground text-xs [&>h1]:font-bold [&>h2]:font-bold [&>p]:mb-1.5 [&>ul]:list-disc [&>ul]:pl-4",
                  !isExpanded && isLong && "max-h-[4.5em] overflow-hidden"
                )}
              >
                <ReactMarkdown>{description}</ReactMarkdown>
                {!isExpanded && isLong && (
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent" />
                )}
              </div>

              {isLong && (
                <button
                  aria-expanded={isExpanded}
                  className="-mt-1 ml-0 block cursor-pointer text-foreground text-xs underline hover:opacity-80 focus:outline-none"
                  onClick={() => setIsExpanded(!isExpanded)}
                  type="button"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}

              {(!isLong || isExpanded) && techStack && techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <Badge
                      className="h-5 px-1 py-0 text-[10px]"
                      key={tech}
                      variant="secondary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}

              {teammates && teammates.length > 0 && (
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-medium text-[10px] text-muted-foreground">
                    Built with:
                  </span>
                  <div className="flex -space-x-1.5">
                    {teammates.map((teammate) => (
                      <Tooltip key={teammate.name}>
                        <TooltipTrigger className="cursor-default">
                          {teammate.url ? (
                            <a
                              className="block rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
                              href={teammate.url}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Avatar className="size-5 border border-background">
                                <AvatarImage
                                  alt={teammate.name}
                                  src={teammate.avatar}
                                />
                                <AvatarFallback className="text-[8px]">
                                  {teammate.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            </a>
                          ) : (
                            <div className="block rounded-full focus:outline-none focus:ring-2 focus:ring-ring">
                              <Avatar className="size-5 border border-background">
                                <AvatarImage
                                  alt={teammate.name}
                                  src={teammate.avatar}
                                />
                                <AvatarFallback className="text-[8px]">
                                  {teammate.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{teammate.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ItemContent>

          {/* Compact Thumbnail on the Right (Desktop) / Bottom (Mobile) */}
          <div className="mt-3 ml-0 block w-full sm:mt-0 sm:ml-4 sm:w-52">
            <div className="aspect-video w-full shrink-0 overflow-hidden rounded-md border bg-muted">
              <button
                aria-label={`View ${title} demo`}
                className="size-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => {
                  if (video) {
                    setIsOpen(true);
                  }
                }}
                type="button"
              >
                <LazyMedia
                  className="size-full"
                  href={video ? undefined : href}
                  image={image}
                  title={title}
                  video={video}
                />
              </button>
            </div>
          </div>
        </Item>
      </div>
    </>
  );
}
