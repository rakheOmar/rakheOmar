import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function HackathonCard({ title, description, dates, location, image, links }) {
  return (
    <li className="relative py-6 pl-14">
      <span className="absolute left-0 top-0 bottom-0 border-l border-border"></span>

      <div className="absolute left-0 top-1/2 -translate-y-[95%] -translate-x-1/2 bg-white rounded-full">
        <Avatar className="border size-12">
          <AvatarImage src={image} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col gap-1">
        {dates && <time className="text-xs text-muted-foreground">{dates}</time>}
        <h2 className="font-semibold leading-none">{title}</h2>
        {location && <p className="text-sm text-muted-foreground">{location}</p>}
        {description && (
          <span className="prose dark:prose-invert text-sm text-muted-foreground">
            {description}
          </span>
        )}

        {links?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {links.map((link, i) => (
              <Link key={i} to={link.url} target="_blank" rel="noopener noreferrer">
                <Badge variant="secondary">{link.label}</Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
