import { useState, useCallback } from "react";

import useTheme from "./hooks/useTheme";
import useLang from "./hooks/useLang";
import useScrollMemory from "./hooks/useScrollMemory";
import useActiveSection from "./hooks/useActiveSection";

import ParticleBackground from "./components/ParticleBackground";
import ScrollProgress from "./components/ScrollProgress";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import MobileDrawer from "./components/MobileDrawer";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certificates from "./components/Certificates";
import CertModal from "./components/CertModal";
import Projects from "./components/Projects";
import ProjectModal from "./components/ProjectModal";
import Platforms from "./components/Platforms";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const SECTION_IDS = ["about", "skills", "experience", "education", "certificates", "projects", "contact"];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLang();
  useScrollMemory();
  const activeSection = useActiveSection(SECTION_IDS);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const anyOverlayOpen = drawerOpen || !!activeCert || !!activeProject;

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const openCert = useCallback((cert) => setActiveCert(cert), []);
  const closeCert = useCallback(() => setActiveCert(null), []);
  const openProject = useCallback((project) => setActiveProject(project), []);
  const closeProject = useCallback(() => setActiveProject(null), []);

  return (
    <>
      <LoadingScreen lang={lang} />

      <ParticleBackground theme={theme} paused={anyOverlayOpen} />
      <ScrollProgress />

      <Navbar
        t={t}
        lang={lang}
        toggleLang={toggleLang}
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        onOpenDrawer={openDrawer}
        drawerOpen={drawerOpen}
      />
      <MobileDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        t={t}
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <ScrollToTop />

      <CertModal cert={activeCert} lang={lang} t={t} onClose={closeCert} />
      <ProjectModal project={activeProject} lang={lang} t={t} onClose={closeProject} />

      <Hero t={t} />
      <About t={t} />
      <Skills t={t} />
      <Experience t={t} />
      <Education t={t} />
      <Certificates t={t} lang={lang} onOpenCert={openCert} />
      <Projects t={t} lang={lang} onOpenProject={openProject} />
      <Platforms t={t} />
      <Contact t={t} lang={lang} />
      <Footer t={t} />
    </>
  );
}
