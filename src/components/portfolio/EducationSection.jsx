import { motion } from "framer-motion";
import { ResumeCard } from "@/components/detail-cards";

const Education = [
  {
    title: "Thadomal Shahani Engineering College",
    href: "https://tsec.edu/",
    subtitle: "B.E. in Artificial Intelligence & Data Science",
    logoUrl: "/education-icons/tsec.png",
    altText: "TSEC",
    period: "2023 - 2027",
  },
  {
    title: "Arya Gurukul International College",
    href: "https://agic.in/",
    subtitle: "Higher Secondary Certificate (HSC)",
    logoUrl: "/education-icons/agic.png",
    altText: "AGIC",
    period: "2021 - 2023",
  },
  {
    title: "Saraswati Vidyalaya High School and Junior College of Science",
    href: "https://www.svptsaraswati.com/CBSE-School-Thane/",
    subtitle: "Secondary School Certificate (SSC)",
    logoUrl: "/education-icons/svpt.png",
    altText: "SVPT",
    period: "2018 - 2021",
  },
];

export default function EducationSection() {
  return (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-3">
        <motion.h2
          className="text-xl text-foreground font-serif mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education
        </motion.h2>
        {Education.map((education, index) => (
          <motion.div
            key={education.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <ResumeCard
              href={education.href}
              logoUrl={education.logoUrl}
              altText={education.altText}
              title={education.title}
              subtitle={education.subtitle}
              period={education.period}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
