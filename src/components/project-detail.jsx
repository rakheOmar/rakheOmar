import { GitForkIcon, StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function LazyMedia({ video, image, title, href }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

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

  return (
    <Link to={href || "#"} className="block cursor-pointer" aria-label={`View ${title} project`}>
      <div ref={containerRef} className="h-40 w-full overflow-hidden bg-muted/20">
        {video && isVisible ? (
          <video
            src={video}
            poster={image}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-full w-full object-cover object-top transition-opacity duration-500"
          />
        ) : (
          image && (
            <img
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          )
        )}
      </div>
    </Link>
  );
}

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

    if (match && match.length >= 3) {
      const owner = match[1];
      const repo = match[2].replace(/\/$/, "");

      fetch(`https://api.github.com/repos/${owner}/${repo}`)
        .then((res) => {
          if (!res.ok) throw new Error("Repo not found or limit exceeded");
          return res.json();
        })
        .then((data) => {
          setGithubStats({
            stars: data.stargazers_count,
            forks: data.forks_count,
          });
        })
        .catch((err) => {
          console.warn(`Could not fetch stats for ${owner}/${repo}:`, err);
        });
    }
  }, [links]);

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full p-0",
        className
      )}
    >
      <LazyMedia video={video} image={image} title={title} href={href} />

      <CardHeader className="px-2 pt-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="text-xs font-mono">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>

          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <Markdown
              components={{
                p: ({ children }) => <p className="mb-1 last:mb-0 inline">{children}</p>,
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
                <a
                  href={link.href}
                  key={idx}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${link.type} for ${title}`}
                >
                  <Badge className="flex gap-2 px-2 py-1 text-[10px] items-center">
                    {link.icon}
                    {link.type}

                    {isGitHub && githubStats.stars !== null && (
                      <div className="flex items-center gap-2 border-l pl-2 ml-1 border-gray-400/50">
                        <span className="flex items-center gap-0.5">
                          <HugeiconsIcon icon={StarIcon} size={10} strokeWidth={2} />
                          {githubStats.stars}
                        </span>

                        <span className="flex items-center gap-0.5">
                          <HugeiconsIcon icon={GitForkIcon} size={10} strokeWidth={2} />
                          {githubStats.forks}
                        </span>
                      </div>
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
