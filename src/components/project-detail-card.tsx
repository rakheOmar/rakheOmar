"use client";

import { GithubIcon, Globe02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Image } from "@unpic/react";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

// Regex patterns defined at module level for performance

interface LinkItem {
  type: string;
  href: string;
  icon: React.ReactNode | string;
}

interface ProjectDetailCardProps {
  title: string;
  href?: string;
  description: string;
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
      <div
        aria-label={`View ${title} project demo`}
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
  image,
  video,
  links,
  className,
}: ProjectDetailCardProps) {
  const [isOpen, setIsOpen] = useState(false);

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
      <div className={cn("block cursor-pointer", className)}>
        <Item className="flex-col items-start justify-between gap-3 px-0 py-0 hover:bg-transparent sm:flex-row">
          <ItemContent className="min-w-0 flex-1 flex-col items-start gap-1">
            <div className="flex w-full flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-1.5">
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
              </div>
            </div>

            {/* Mobile Media/Dates fallback */}

            <ItemDescription className="line-clamp-2 text-xs">
              {description}
            </ItemDescription>

            {links && links.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-2">
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
                      className="flex items-center gap-1 rounded-md border bg-background px-1.5 py-0.5 font-medium text-[10px] transition-colors hover:bg-accent hover:text-accent-foreground"
                      href={linkItem.href}
                      key={linkItem.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <HugeiconsIcon icon={Icon} size={10} strokeWidth={2} />
                      {linkItem.type}
                    </a>
                  );
                })}
              </div>
            )}
          </ItemContent>

          {/* Compact Thumbnail on the Right (Desktop) / Bottom (Mobile) */}
          <div className="mt-3 ml-0 block w-full sm:mt-0 sm:ml-4 sm:w-52">
            <div className="aspect-video w-full shrink-0 overflow-hidden rounded-md border bg-muted">
              <button
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
