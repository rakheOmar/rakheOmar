import AboutSection from "@/components/portfolio/AboutSection";
import CertificationSection from "@/components/portfolio/CertificationSection";
import ContactSection from "@/components/portfolio/ContactSection";
import ContributingSection from "@/components/portfolio/ContributingSection";
import EducationSection from "@/components/portfolio/EducationSection";
import HackathonSection from "@/components/portfolio/HackathonSection";
import IntroSection from "@/components/portfolio/IntroSection";
import ProjectSection from "@/components/portfolio/ProjectSection";
import SkillsSection from "@/components/portfolio/SkillSection";

export default function Portfolio() {
  return (
    <main className="flex flex-col min-h-dvh space-y-10">
      <IntroSection />
      <AboutSection />
      <ContributingSection />
      <EducationSection />
      <CertificationSection />
      <SkillsSection />
      <ProjectSection />
      <HackathonSection />
      <ContactSection />
    </main>
  );
}
