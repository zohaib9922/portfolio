import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";

const Experience = lazy(() => import("./components/Experience/Experience"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Services = lazy(() => import("./components/Services/Services"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Footer = lazy(() => import("./components/Footer/Footer"));

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <Hero />
        <About />
        <Skills />
        <Suspense fallback={null}>
          <Experience />
          <Projects />
          <Services />
          <Contact />
          <Footer />
        </Suspense>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
