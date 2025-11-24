import { HackathonCard } from "@/components/hackathon-details";

const hackathons = [
  {
    title: "Smart India Hackathon (SIH)",
    dates: "November 2024",
    location: "Remote / On-site",
    description:
      "Participated in the world's biggest open innovation model, solving real-world challenges posed by ministries and industries.",
    image: "/hackathons/sih.png",
    links: [],
  },
  {
    title: "Mumbai Hacks",
    dates: "October 2024",
    location: "Mumbai, India",
    description:
      "Collaborated to build innovative solutions for urban challenges in Mumbai's premier tech event.",
    image: "/hackathons/mumbai-hacks.png",
    links: [],
  },
  {
    title: "Codeisance",
    dates: "September 2024",
    location: "Mumbai, India",
    description:
      "Competed in a 24-hour hackathon focused on rapid prototyping and algorithmic problem solving.",
    image: "/hackathons/codeisance.png",
    links: [],
  },
  {
    title: "NABARD Hackathon",
    dates: "September 2024",
    location: "Mumbai, India",
    description:
      "Developed fintech solutions aimed at rural development and agricultural modernization.",
    image: "/hackathons/nabard.png",
    links: [],
  },
  {
    title: "VIT Hackbuild",
    dates: "August 2025",
    location: "Vellore / Hybrid",
    description:
      "Secured Top 3 in the Web/App domain. Built a scalable application solving key user pain points.",
    image: "/hackathons/vit.png",
    links: [],
  },
  {
    title: "Need for Code",
    dates: "August 2025",
    location: "Mumbai, India",
    description:
      "Engaged in intense coding challenges to optimize algorithms and system efficiency.",
    image: "/hackathons/need-for-code.png",
    links: [],
  },
  {
    title: "TSEC Innovatex",
    dates: "July 2025",
    location: "Mumbai, India",
    description:
      "Secured 3rd place among 65+ teams. Built a winning solution demonstrating technical complexity and user impact.",
    image: "/hackathons/innovatex.png",
    links: [],
  },
];

export default function HackathonSection() {
  return (
    <section id="hackathons">
      <h2 className="text-xl font-bold mb-10">Hackathons</h2>

      <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
        {hackathons.map((project) => (
          <HackathonCard
            key={project.title + project.dates}
            title={project.title}
            description={project.description}
            location={project.location}
            dates={project.dates}
            image={project.image}
            links={project.links}
          />
        ))}
      </ul>
    </section>
  );
}
