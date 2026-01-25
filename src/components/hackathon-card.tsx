"use client";

import Markdown from "react-markdown";
import { transformUrl } from "unpic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

interface HackathonCardProps {
  title: string;
  description: string;
  dates: string;
  location: string;
  image: string;
  links?: Array<{
    title: string;
    icon: React.ReactNode;
    href: string;
  }>;
}

export function HackathonCard({
  title,
  description,
  dates,
  location,
  image,
  links,
}: HackathonCardProps) {
  return (
    <div className="relative pl-12">
      <span className="absolute inset-y-0 left-0 border-border border-l" />

      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background">
        <Avatar className="size-10 border-none bg-muted">
          <AvatarImage
            alt={title}
            className="object-contain"
            src={image}
          />
          <AvatarFallback className="text-xs">{title[0]}</AvatarFallback>
        </Avatar>
      </div>

      <Item className="flex-col items-start gap-1 px-0 py-3">
        <ItemContent className="w-full gap-0.5">
          {dates ? (
            <time className="font-mono text-muted-foreground text-xs">
              {dates}
            </time>
          ) : null}

          <ItemTitle className="font-medium text-sm">{title}</ItemTitle>

          {location ? (
            <ItemDescription className="text-xs">{location}</ItemDescription>
          ) : null}

          {description ? (
            <div className="prose dark:prose-invert mt-1 max-w-none text-muted-foreground text-xs">
              <Markdown>{description}</Markdown>
            </div>
          ) : null}

          {links && links.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] hover:bg-muted"
                >
                  {link.icon}
                  {link.title}
                </a>
              ))}
            </div>
          )}
        </ItemContent>
      </Item>
    </div>
  );
}
