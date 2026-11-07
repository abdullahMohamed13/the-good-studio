import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";
import "./styles/motion.css";
import { Header } from "./components/Header";
import { Hero } from "./sections/Hero";
import { Work } from "./sections/Work";
import { Testimonials } from "./sections/Testimonials";
import { Footer } from "./sections/Footer";
import { Contact } from "./sections/Contact";
import { ContactCallout } from "./sections/ContactCallout";
import { Services } from "./sections/Services";
import { Process } from "./sections/Process";
import { ChatbotOrb } from "./components/ChatbotOrb";
import { ScrollProgress } from "./components/ui/ScrollProgress";

function App() {
  const isContactRoute =
    window.location.pathname === "/contact" ||
    window.location.pathname === "/contact/";

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        {isContactRoute ? (
          <Contact />
        ) : (
          <>
            <Hero />
            <Services />
            <Work />
            <Process />
            <Testimonials />
            <ContactCallout />
          </>
        )}
      </main>
      <Footer />
      <ChatbotOrb />
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
