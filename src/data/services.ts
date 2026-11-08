export const serviceMeta = [
  { id: "brand-worlds", number: "01" },
  { id: "digital-homes", number: "02" },
  { id: "good-motion", number: "03" },
  { id: "ongoing-care", number: "04" },
] as const;

export type ServiceId = (typeof serviceMeta)[number]["id"];
