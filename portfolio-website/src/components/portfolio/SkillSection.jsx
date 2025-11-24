import { motion } from "framer-motion";
import { Badge } from "../ui/badge";

const skills = [
  "C",
  "Java",
  "Python",
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "MySQL",
  "MongoDB",
  "Supabase",
  "Git",
  "Postman",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "TensorFlow",
  "scikit-learn",
  "Microsoft AutoGen",
  "Agentic AI",
  "Transformers",
  "LLMs",
];

export default function SkillsSection() {
  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-3">
        <motion.h2
          className="text-xl font-bold font-serif"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skill
        </motion.h2>
        <motion.div
          className="flex flex-wrap gap-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <Badge>{skill}</Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
