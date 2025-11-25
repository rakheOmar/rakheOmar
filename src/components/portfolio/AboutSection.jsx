import { motion } from "framer-motion";
import Markdown from "react-markdown";

export default function AboutSection() {
  return (
    <section id="about">
      <motion.h2
        className="text-xl text-foreground font-serif mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        About
      </motion.h2>
      <motion.div
        className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
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
      </motion.div>
    </section>
  );
}
