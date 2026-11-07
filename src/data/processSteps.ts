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
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "II",
    title: "Find the shape",
    description:
      "We turn the thinking into a visual world with a point of view, a rhythm, and a little spark.",
    outcome: "A confident design system",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "III",
    title: "Make it real",
    description:
      "We build the thing with care, keeping the details considered and the experience feeling human.",
    outcome: "A polished, working experience",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "IV",
    title: "Send it into the world",
    description:
      "We launch together, learn from the response, and leave you with the confidence to keep going.",
    outcome: "A good thing in motion",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1000&q=85",
  },
];
