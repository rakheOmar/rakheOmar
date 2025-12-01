import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { HackathonCard } from "@/components/hackathon-details";

const hackathons = [
  {
    title: "Minithon",
    dates: "September 22, 2024",
    location: "Mumbai, India",
    description:
      "Ranked in **Top 8 finalists**. Built **TSEC - Student Dashboard**, a responsive front-end tool for managing student tasks and schedules.",
    image: "/hackathon-icons/minithon.webp",
    links: [],
  },
  {
    title: "TSEC Innovatex",
    dates: "July 25, 2025",
    location: "Mumbai, India",
    description:
      "Secured **3rd place**. Built **PaperSprint**, a 15-minute document print-and-delivery platform featuring secure authentication and cloud storage integration.",
    image: "/hackathon-icons/tsec.webp",
    links: [
      {
        title: "Github",
        icon: <HugeiconsIcon icon={GithubIcon} size={12} strokeWidth={1.5} />,
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
    image: "/hackathon-icons/need-for-code.webp",
    links: [],
  },
  {
    title: "VIT Hackbuild",
    dates: "August 23, 2025",
    location: "Mumbai, India",
    description:
      "Secured **Top 3 in Web/App domain**. Built **SkillVerse**, a secure student freelance marketplace. Features include AI-driven proposal generation, verified skill assessments, and a Solidity smart contract for transparent, immutable transaction records.",
    image: "/hackathon-icons/vit.webp",
    links: [],
  },
  {
    title: "NABARD Hackathon",
    dates: "September 4, 2025",
    location: "Mumbai, India",
    description:
      "Developed **KisaanCredit**, a 'Soil to Sale' ecosystem using AI and Blockchain to democratize carbon markets for farmers.",
    image: "/hackathon-icons/nabard.webp",
    links: [
      {
        title: "Github",
        icon: <HugeiconsIcon icon={GithubIcon} size={12} strokeWidth={1.5} />,
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
    image: "/hackathon-icons/codeisance.webp",
    links: [],
  },
  {
    title: "Smart India Hackathon (SIH)",
    dates: "September 16 & October 15, 2025",
    location: "Remote",
    description:
      "Qualified in the internal round. Developed two major projects: **CiviSeva**, an AI-powered civic reporting platform with geospatial analysis and automated routing; and **Forensight**, a digital forensics tool utilizing multi-agent AI for automated evidence analysis and network visualization.",
    image: "/hackathon-icons/sih.webp",
    links: [
      {
        title: "Github - CiviSeva",
        icon: <HugeiconsIcon icon={GithubIcon} size={12} strokeWidth={1.5} />,
        href: "https://github.com/TejasS1233/CiviSeva-TheErudition",
      },
      {
        title: "Github - Forensight",
        icon: <HugeiconsIcon icon={GithubIcon} size={12} strokeWidth={1.5} />,
        href: "https://github.com/TejasS1233/Forensight-TheErudition",
      },
    ],
  },
];

export default function HackathonSection() {
  return (
    <section id="hackathons">
      <h2 className="text-xl text-foreground font-serif mb-3">Hackathons</h2>

      <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
        {hackathons.map((project, index) => (
          <li key={project.title + project.dates}>
            <HackathonCard
              title={project.title}
              description={project.description}
              location={project.location}
              dates={project.dates}
              image={project.image}
              links={project.links}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
