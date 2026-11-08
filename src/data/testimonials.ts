export const testimonialMeta = [
  {
    id: "maya-ellis",
    name: "MAYA ELLIS",
    avatar:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794118378/7f1a3367-8d29-43e9-ac0e-ae64648b48e7_likxcp.webp",
  },
  {
    id: "jordan-lee",
    name: "JORDAN LEE",
    avatar:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794118378/389188af-0ba5-428e-8c7a-b3c517f50df1_k61py7.webp",
  },
  {
    id: "nora-bennett",
    name: "NORA BENNETT",
    avatar:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794118377/307622eb-552b-41b0-bc23-8f28ed1e29ed_twqc3f.webp",
  },
  {
    id: "theo-martin",
    name: "THEO MARTIN",
    avatar:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794118376/39c40fda-c385-49c7-a037-fa7d88851b04_h3fno9.webp",
  },
  {
    id: "aisha-patel",
    name: "AISHA PATEL",
    avatar:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794118376/5946111d-688a-4d1a-9b38-9f135ea72e9b_hza7ne.webp",
  },
  {
    id: "luca-moretti",
    name: "LUCA MORETTI",
    avatar:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794118375/b0f79e2a-0fb9-44a2-a723-06e0818e2ee2_yqwlta.webp",
  },
  {
    id: "sophie-williams",
    name: "SOPHIE WILLIAMS",
    avatar:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794118375/7d916c55-d259-4192-b738-cfce8b4c0f56_zbjgwz.webp",
  },
  {
    id: "emily-park",
    name: "EMILY PARK",
    avatar:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794118375/c5efb040-9288-4292-a066-d5da225d65e2_rgt7ym.webp",
  },
  {
    id: "daniel-kim",
    name: "DANIEL KIM",
    avatar:
      "https://res.cloudinary.com/uwwnts8h/image/upload/v1794118375/882e5bca-a5aa-4d4a-8bcd-bcd841c6c996_wbrhqa.webp",
  },
] as const;

export type TestimonialId = (typeof testimonialMeta)[number]["id"];
