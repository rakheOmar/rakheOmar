import { GitFork, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ProjectDetailCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}) {
  const [githubStats, setGithubStats] = useState({ stars: null, forks: null });

  useEffect(() => {
    const githubLink = links?.find((l) => l.type?.toLowerCase() === "github");
    if (!githubLink) return;

    const match = githubLink.href.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return;

    const [, owner, repo] = match;

    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        setGithubStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch GitHub stats", err);
      });
  }, [links]);

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full p-0",
        className
      )}
    >
      <Link to={href || "#"} className="block cursor-pointer">
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        )}
        {image && (
          <img
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
            loading="lazy"
          />
        )}
      </Link>

      <CardHeader className="px-2 pt-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="text-xs font-mono">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>

          {/* Markdown Description */}
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <Markdown
              components={{
                // Optimize spacing for the card context
                p: ({ children }) => <p className="mb-1 last:mb-0 inline">{children}</p>,
                // Ensure links open in new tab and stand out slightly
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary transition-colors"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {description}
            </Markdown>
          </div>
        </div>
      </CardHeader>

      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge className="px-1 py-0 text-[10px]" variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links.map((link, idx) => {
              const isGitHub = link.type?.toLowerCase() === "github";

              return (
                <a href={link.href} key={idx} target="_blank" rel="noreferrer">
                  <Badge className="flex gap-2 px-2 py-1 text-[10px] items-center">
                    {link.icon}
                    {link.type}

                    {isGitHub && githubStats.stars !== null && (
                      <>
                        <span className="flex items-center gap-1 ml-1">
                          <Star size={14} />
                          {githubStats.stars}
                        </span>

                        <span className="flex items-center gap-1 ml-1">
                          <GitFork size={14} />
                          {githubStats.forks}
                        </span>
                      </>
                    )}
                  </Badge>
                </a>
              );
            })}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
