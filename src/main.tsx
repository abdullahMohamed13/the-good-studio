import { StrictMode, useEffect } from "react";
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
import { LocaleProvider } from "./i18n";
import { detectLocaleFromClient } from "./lib/locale";
import { localizedPath, parsePath } from "./lib/routes";
import { navigate, usePathname } from "./lib/usePathname";

function App() {
  const pathname = usePathname();
  const parsed = parsePath(pathname);
  const locale = parsed.locale ?? detectLocaleFromClient();
  const isContactRoute = parsed.path === "/contact";

  useEffect(() => {
    if (parsed.locale) return;

    navigate(localizedPath(locale, parsed.path) + window.location.hash, {
      replace: true,
    });
  }, [locale, parsed.locale, parsed.path]);

  return (
    <LocaleProvider locale={locale}>
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
    </LocaleProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
