import { motion } from "framer-motion";
import { ResumeCard } from "@/components/detail-cards";

const certifications = [
  {
    title: "Building AI Agents & Agentic AI System via Microsoft AutoGen",
    href: "https://www.udemy.com/certificate/UC-5d01b2ac-3b24-4a5a-8bda-1f3c91b38a53/",
    subtitle: "Udemy",
    logoUrl: "/certification-icons/udemy.png",
    altText: "Udemy",
    period: "Oct 2025",
  },
  {
    title: "Complete Data Science, Machine Learning, Deep Learning & NLP Bootcamp",
    href: "https://www.udemy.com/certificate/UC-3ba3fed5-1cc2-4830-874e-26fdd9f6700c/",
    subtitle: "Udemy",
    logoUrl: "/certification-icons/udemy.png",
    altText: "Udemy",
    period: "Oct 2025",
  },
];

export default function CertificationSection() {
  return (
    <section id="certifications">
      <div className="flex min-h-0 flex-col gap-y-3">
        <motion.h2
          className="text-xl font-bold text-foreground font-serif mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Certifications
        </motion.h2>
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <ResumeCard
              title={cert.title}
              subtitle={cert.subtitle}
              href={cert.href}
              logoUrl={cert.logoUrl}
              altText={cert.altText}
              period={cert.period}
              description={cert.description}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
