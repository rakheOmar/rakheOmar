import AboutSection from "@/components/portfolio/AboutSection";
import CertificationSection from "@/components/portfolio/CertificationSection";
import ContributingSection from "@/components/portfolio/ContributingSection";
import EducationSection from "@/components/portfolio/EducationSection";
import HackathonSection from "@/components/portfolio/HackathonSection";
import IntroSection from "@/components/portfolio/IntroSection";
import ProjectSection from "@/components/portfolio/ProjectSection";

export default function Portfolio() {
  return (
    <main className="flex flex-col min-h-dvh space-y-10">
      <IntroSection />
      <AboutSection />
      <ContributingSection />
      <EducationSection />
      <CertificationSection />
      <ProjectSection />
      <HackathonSection />
    </main>
  );
}
