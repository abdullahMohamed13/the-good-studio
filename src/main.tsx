import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";
import { Header } from "./components/Header";
import { Hero } from "./sections/Hero";
import { Work } from "./sections/Work";
import { Testimonials } from "./sections/Testimonials";
import { Footer } from "./sections/Footer";
import { Contact } from "./sections/Contact";
import { ContactCallout } from "./sections/ContactCallout";
function App() {
  const isContactRoute =
    window.location.pathname === "/contact" ||
    window.location.pathname === "/contact/";

  return (
    <>
      <Header />
      <main>
        {isContactRoute ? (
          <Contact />
        ) : (
          <>
            <Hero />
            <Work />
            <Testimonials />
            <ContactCallout />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
