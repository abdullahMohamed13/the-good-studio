export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  outcome: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "I",
    title: "Listen closely",
    description:
      "We start with the good stuff: your story, your people, and what you want to make possible.",
    outcome: "A clear creative direction",
  },
  {
    number: "II",
    title: "Find the shape",
    description:
      "We turn the thinking into a visual world with a point of view, a rhythm, and a little spark.",
    outcome: "A confident design system",
  },
  {
    number: "III",
    title: "Make it real",
    description:
      "We build the thing with care, keeping the details considered and the experience feeling human.",
    outcome: "A polished, working experience",
  },
  {
    number: "IV",
    title: "Send it into the world",
    description:
      "We launch together, learn from the response, and leave you with the confidence to keep going.",
    outcome: "A good thing in motion",
  },
];
