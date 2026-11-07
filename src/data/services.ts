export type Service = {
  number: string;
  title: string;
  description: string;
  tags: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Brand worlds",
    description:
      "Visual identities with enough personality to be remembered and enough room to grow.",
    tags: "IDENTITY / ART DIRECTION",
  },
  {
    number: "02",
    title: "Digital homes",
    description:
      "Thoughtful websites that make your work clear, compelling, and easy to find.",
    tags: "WEB DESIGN / DEVELOPMENT",
  },
  {
    number: "03",
    title: "Good motion",
    description:
      "Small moments of movement that bring a brand to life without stealing the show.",
    tags: "MOTION / INTERACTION",
  },
  {
    number: "04",
    title: "Ongoing care",
    description:
      "A steady creative partner for the updates, refinements, and next good ideas.",
    tags: "SUPPORT / EVOLUTION",
  },
];
