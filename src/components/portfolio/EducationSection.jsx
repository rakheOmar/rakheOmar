import { ResumeCard } from "@/components/detail-cards";

const Education = [
  {
    title: "Thadomal Shahani Engineering College",
    href: "https://tsec.edu/",
    subtitle: "B.E. in Artificial Intelligence & Data Science",
    logoUrl: "/education-icons/tsec.webp",
    altText: "TSEC",
    period: "2023 - 2027",
  },
  {
    title: "Arya Gurukul International College",
    href: "https://agic.in/",
    subtitle: "Higher Secondary Certificate (HSC)",
    logoUrl: "/education-icons/agic.webp",
    altText: "AGIC",
    period: "2021 - 2023",
  },
  {
    title: "Saraswati Vidyalaya High School and Junior College of Science",
    href: "https://www.svptsaraswati.com/CBSE-School-Thane/",
    subtitle: "Secondary School Certificate (SSC)",
    logoUrl: "/education-icons/svpt.webp",
    altText: "SVPT",
    period: "2018 - 2021",
  },
];

export default function EducationSection() {
  return (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-3">
        <h2 className="text-xl text-foreground font-serif mb-3">Education</h2>
        {Education.map((education, index) => (
          <div key={education.title}>
            <ResumeCard
              href={education.href}
              logoUrl={education.logoUrl}
              altText={education.altText}
              title={education.title}
              subtitle={education.subtitle}
              period={education.period}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
