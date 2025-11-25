import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function HackathonCard({ title, description, dates, location, image, links }) {
  return (
    <li className="relative py-6 pl-14">
      <span className="absolute left-0 top-0 bottom-0 border-l border-border"></span>

      <div className="absolute left-0 top-1/2 -translate-y-[95%] -translate-x-1/2 bg-background rounded-full">
        <Avatar className="border size-12 m-auto">
          <AvatarImage src={image} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-1 flex-col justify-start gap-1 font-mono">
        {dates && <time className="text-xs text-muted-foreground">{dates}</time>}

        <h2 className="font-semibold leading-none">{title}</h2>

        {location && <p className="text-sm font-serif text-muted-foreground">{location}</p>}

        {description && (
          <div className="prose dark:prose-invert text-sm text-muted-foreground max-w-none font-sans">
            <Markdown>{description}</Markdown>
          </div>
        )}
      </div>

      {links && links.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {links.map((link, idx) => (
            <Link to={link.href} key={idx} target="_blank">
              <Badge title={link.title} className="flex gap-2">
                {link.icon}
                {link.title}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
