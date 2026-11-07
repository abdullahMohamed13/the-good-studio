export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  outcome: string;
  image: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "I",
    title: "Listen closely",
    description:
      "We start with the good stuff: your story, your people, and what you want to make possible.",
    outcome: "A clear creative direction",
    image:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794076733/img-15_n9k1xm.webp",
  },
  {
    number: "II",
    title: "Find the shape",
    description:
      "We turn the thinking into a visual world with a point of view, a rhythm, and a little spark.",
    outcome: "A confident design system",
    image:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794076732/img-13_kckwq1.webp",
  },
  {
    number: "III",
    title: "Make it real",
    description:
      "We build the thing with care, keeping the details considered and the experience feeling human.",
    outcome: "A polished, working experience",
    image:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794076732/img-12_o2dwwk.webp",
  },
  {
    number: "IV",
    title: "Send it into the world",
    description:
      "We launch together, learn from the response, and leave you with the confidence to keep going.",
    outcome: "A good thing in motion",
    image:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794076734/img-11_zigssw.webp",
  },
];
