import { Badge } from "@/components/ui/badge";

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
        <h2 className="text-xl text-foreground font-serif mb-3">Skills</h2>
        <div className="flex flex-wrap gap-1">
          {skills.map((skill, index) => (
            <div key={skill}>
              <Badge>{skill}</Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
