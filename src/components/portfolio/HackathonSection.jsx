import { motion } from "framer-motion";
import { GithubIcon } from "hugeicons-react";
import { HackathonCard } from "@/components/hackathon-details";

const hackathons = [
  {
    title: "Minithon",
    dates: "September 22, 2024",
    location: "Mumbai, India",
    description:
      "Ranked in **Top 8 finalists**. Built **TSEC - Student Dashboard**, a responsive front-end tool for managing student tasks and schedules.",
    image: "/hackathon-icons/minithon.png",
    links: [],
  },
  {
    title: "TSEC Innovatex",
    dates: "July 25, 2025",
    location: "Mumbai, India",
    description:
      "Secured **3rd place**. Built **PaperSprint**, a 15-minute document print-and-delivery platform featuring secure authentication and cloud storage integration.",
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
      "Developed **MineSave**, a miner safety mechanism designed to detect hazards and improve communication in low-connectivity underground environments.",
    image: "/hackathon-icons/need-for-code.png",
    links: [],
  },
  {
    title: "VIT Hackbuild",
    dates: "August 23, 2025",
    location: "Mumbai, India",
    description:
      "Secured **Top 3 in Web/App domain**. Built **SkillVerse**, a secure student freelance marketplace. Features include AI-driven proposal generation, verified skill assessments, and a Solidity smart contract for transparent, immutable transaction records.",
    image: "/hackathon-icons/vit.png",
    links: [],
  },
  {
    title: "NABARD Hackathon",
    dates: "September 4, 2025",
    location: "Mumbai, India",
    description:
      "Developed **KisaanCredit**, a 'Soil to Sale' ecosystem using AI and Blockchain to democratize carbon markets for farmers.",
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
      "Competed in a 24-hour hackathon. Developed **LifeSave**, a comprehensive platform using Agentic AI systems to streamline blood and organ donation by intelligently connecting donors, hospitals, and blood banks.",
    image: "/hackathon-icons/codeisance.png",
    links: [],
  },
  {
    title: "Smart India Hackathon (SIH)",
    dates: "September 16 & October 15, 2025",
    location: "Remote",
    description:
      "Qualified in the internal round. Developed two major projects: **CiviSeva**, an AI-powered civic reporting platform with geospatial analysis and automated routing; and **Forensight**, a digital forensics tool utilizing multi-agent AI for automated evidence analysis and network visualization.",
    image: "/hackathon-icons/sih.png",
    links: [],
  },
  {
    title: "Mumbai Hacks",
    dates: "November 28, 2025",
    location: "Mumbai, India",
    description: "Upcoming participation in Mumbai's largest tech community hackathon.",
    image: "/hackathon-icons/mumbai-hacks.png",
    links: [],
  },
];

export default function HackathonSection() {
  return (
    <section id="hackathons">
      <motion.h2
        className="text-xl text-foreground font-serif mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
