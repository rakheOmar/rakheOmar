import { motion } from "framer-motion";
import { GithubIcon, Globe02Icon } from "hugeicons-react";
import { ProjectDetailCard } from "../project-detail";

const Icons = {
  globe: (props) => <Globe02Icon {...props} />,
  github: (props) => <GithubIcon {...props} />,
};

const DATA = {
  projects: [
    {
      title: "Markdrop",
      href: "https://markdrop.vercel.app/",
      dates: "Oct 2025 - Ongoing",
      active: true,
      description:
        "I built Markdrop to streamline documentation. It is a visual editor with a drag-and-drop interface and cloud sync, allowing developers to create professional READMEs without dealing with raw syntax.",
      technologies: [
        "React 18",
        "Vite",
        "Shadcn UI",
        "Tailwind CSS",
        "Supabase",
        "dnd-kit",
        "Remark",
      ],
      links: [
        {
          type: "Website",
          href: "https://markdrop.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/rakheOmar/Markdrop",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/project-demo/markdrop-a-powerful-visual-markdown-editor-and-builder.mp4",
    },
  ],
};

export default function ProjectSection() {
  return (
    <section id="projects">
      <motion.h2
        className="text-xl font-bold text-foreground mb-3 font-serif"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
        {DATA.projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectDetailCard
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
