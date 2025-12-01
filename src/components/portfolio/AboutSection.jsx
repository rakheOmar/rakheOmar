import Markdown from "react-markdown";

export default function AboutSection() {
  return (
    <section id="about">
      <h2 className="text-xl text-foreground font-serif mb-3">About</h2>
      <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
        <Markdown
          components={{
            a: ({ href, children }) => (
              <a
                href={href}
                className="font-bold text-foreground underline underline-offset-4 decoration-foreground transition-opacity hover:opacity-80"
              >
                {children}
              </a>
            ),
          }}
        >
          I am currently [pursuing a B.E. in Artificial Intelligence & Data Science](#education)
          while exploring the frontiers of Agentic AI. Over the last few years, I've competed in
          over **[10+ hackathons](#hackathon)**, securing top podium finishes at events like
          Innovatex and VIT Hackbuild. Right now, I'm focused on building [Markdrop](#projects), a
          powerful visual markdown editor for developers.
        </Markdown>
      </div>
    </section>
  );
}
