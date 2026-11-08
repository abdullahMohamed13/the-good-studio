export const interestMeta = [
  { id: "website-design" },
  { id: "squarespace-development" },
  { id: "shopify-development" },
  { id: "web-development-other" },
  { id: "collaboration" },
  { id: "site-maintenance" },
  { id: "studio-day" },
  { id: "brand-identity" },
  { id: "something-else" },
] as const;

export type InterestId = (typeof interestMeta)[number]["id"];

export const assetMeta = [
  { id: "copy" },
  { id: "photography" },
  { id: "branding" },
] as const;

export type AssetId = (typeof assetMeta)[number]["id"];

export const collaborationTypeMeta = [
  { id: "creative-partnership" },
  { id: "guest-talk" },
  { id: "studio-day" },
  { id: "something-else" },
] as const;

export type CollaborationTypeId = (typeof collaborationTypeMeta)[number]["id"];

export const startingPointMeta = [
  { id: "project" },
  { id: "collaboration" },
  { id: "hello" },
] as const;

export type StartingPoint = (typeof startingPointMeta)[number]["id"];
