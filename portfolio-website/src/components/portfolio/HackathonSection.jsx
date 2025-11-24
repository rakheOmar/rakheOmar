import { HackathonCard } from "@/components/hackathon-details";
import { GithubIcon } from "hugeicons-react";
import { motion } from "framer-motion";

const hackathons = [
  {
    title: "Minithon",
    dates: "September 22, 2024",
    location: "Mumbai, India",
    description:
      "Ranked in Top 8 finalists. Built 'Student Dashboard', a responsive front-end tool for managing student tasks and schedules.",
    image: "/hackathon-icons/minithon.png",
    links: [],
  },
  {
    title: "TSEC Innovatex",
    dates: "July 25, 2025",
    location: "Mumbai, India",
    description:
      "Secured 3rd place. Built 'PaperSprint', a 15-minute document print-and-delivery platform with secure auth and cloud storage.",
    image: "/hackathon-icons/tsec.png",
    links: [
      {
        title: "Github",
        icon: <GithubIcon className="size-3" />,
        href: "https://github.com/rakheOmar/print-sprint-2.0",
      },
    ],
  },
  {
    title: "Need for Code",
    dates: "August 6, 2025",
    location: "Mumbai, India",
    description:
      "Engaged in intense coding challenges to optimize algorithms and system efficiency in a competitive environment.",
    image: "/hackathon-icons/need-for-code.png",
    links: [],
  },
  {
    title: "VIT Hackbuild",
    dates: "August 23, 2025",
    location: "Mumbai, India",
    description:
      "Secured Top 3 in the Web/App domain. Built a scalable application solving key user pain points using modern web technologies.",
    image: "/hackathon-icons/vit.png",
    links: [],
  },
  {
    title: "NABARD Hackathon",
    dates: "September 4, 2025",
    location: "Mumbai, India",
    description:
      "Developed 'KisaanCredit', a fintech solution aimed at digitizing rural agricultural finance and modernizing credit access.",
    image: "/hackathon-icons/nabard.png",
    links: [
      {
        title: "Github",
        icon: <GithubIcon className="size-3" />,
        href: "https://github.com/rakheOmar/KisaanCredit",
      },
    ],
  },
  {
    title: "Codeisance",
    dates: "September 27, 2025",
    location: "Mumbai, India",
    description:
      "Competed in a 24-hour hackathon focused on rapid prototyping and algorithmic problem solving.",
    image: "/hackathon-icons/codeisance.png",
    links: [],
  },
  {
    title: "Smart India Hackathon (SIH)",
    dates: "September 16 & October 15, 2025",
    location: "Remote",
    description:
      "Participated in the world's biggest open innovation model, solving real-world challenges posed by ministries and industries.",
    image: "/hackathon-icons/sih.png",
    links: [],
  },
  {
    title: "Mumbai Hacks",
    dates: "November 28, 2025",
    location: "Mumbai, India",
    description:
      "Collaborated to build innovative solutions for urban challenges in Mumbai's premier tech event.",
    image: "/hackathon-icons/mumbai-hacks.png",
    links: [],
  },
];

export default function HackathonSection() {
  return (
    <section id="hackathons">
      <motion.h2
        className="text-xl font-bold mb-10 font-serif"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hackathons
      </motion.h2>

      <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
        {hackathons.map((project, index) => (
          <motion.div
            key={project.title + project.dates}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <HackathonCard
              title={project.title}
              description={project.description}
              location={project.location}
              dates={project.dates}
              image={project.image}
              links={project.links}
            />
          </motion.div>
        ))}
      </ul>
    </section>
  );
}