export const interests = [
  "Website Design",
  "Squarespace Development",
  "Shopify Development",
  "Web Development (Other)",
  "Collaboration",
  "Site Maintenance",
  "Studio Day",
  "Brand Identity",
  "Something Else",
];

export const assets = ["Copy", "Photography / Videos", "Branding Style"];

export const collaborationTypes = [
  "Creative partnership",
  "Guest talk",
  "Studio day",
  "Something else",
];

export type StartingPoint = "project" | "collaboration" | "hello";

export const startingPoints: {
  id: StartingPoint;
  label: string;
  subject: string;
  submitLabel: string;
}[] = [
  {
    id: "project",
    label: "New project",
    subject: "New project enquiry",
    submitLabel: "Send enquiry",
  },
  {
    id: "collaboration",
    label: "Collaboration",
    subject: "Collaboration enquiry",
    submitLabel: "Send note",
  },
  {
    id: "hello",
    label: "Just saying hi",
    subject: "Hello!",
    submitLabel: "Say hello",
  },
];
