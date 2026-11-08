export const processStepMeta = [
  {
    id: "listen-closely",
    number: "I",
    image:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794076733/img-15_n9k1xm.webp",
  },
  {
    id: "find-the-shape",
    number: "II",
    image:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794076732/img-13_kckwq1.webp",
  },
  {
    id: "make-it-real",
    number: "III",
    image:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794076732/img-12_o2dwwk.webp",
  },
  {
    id: "send-it-into-the-world",
    number: "IV",
    image:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794076734/img-11_zigssw.webp",
  },
] as const;

export type ProcessId = (typeof processStepMeta)[number]["id"];
