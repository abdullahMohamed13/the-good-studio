import type {
  AssetId,
  CollaborationTypeId,
  InterestId,
  StartingPoint,
} from "../data/contactForm";
import type { ProcessId } from "../data/processSteps";
import type { ServiceId } from "../data/services";
import type { TestimonialId } from "../data/testimonials";
import type { WorkId } from "../data/workMedia";

export type Locale = "en" | "es" | "fr";

export type Segment = {
  text: string;
  tone?: "accent" | "secondary" | "primary";
  italic?: boolean;
  serif?: boolean;
  underline?: boolean;
};

export type ServiceCopy = {
  title: string;
  description: string;
  tags: string;
};

export type ProcessStepCopy = {
  title: string;
  description: string;
  outcome: string;
};

export type TestimonialCopy = {
  quote: string;
  role: string;
};

export type WorkCopy = {
  name: string;
  alt: string;
};

export type StartingPointCopy = {
  label: string;
  subject: string;
  submitLabel: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogLocale: string;
  };
  nav: {
    services: string;
    process: string;
    work: string;
    opinions: string;
    letsTalk: string;
    contact: string;
    language: string;
    homeLabel: string;
    mobileLabel: string;
    openMenu: string;
    closeMenu: string;
    languageNames: Record<Locale, string>;
  };
  header: {
    tagline: Segment[];
  };
  hero: {
    kicker: string;
    kickerLocation: string;
    headline: Segment[][];
    introLine1: string;
    introLine2: string;
    scroll: string;
    footnoteLine1: string;
    footnoteLine2: string;
    figure: string;
  };
  services: {
    eyebrow: string;
    headline: Segment[][];
    intro: string;
    items: Record<ServiceId, ServiceCopy>;
  };
  work: {
    label: string;
    loadingItem: string;
    videoLabel: string;
    items: Record<WorkId, WorkCopy>;
  };
  process: {
    eyebrow: string;
    headline: Segment[];
    intro: string;
    navLabel: string;
    imageryLabel: string;
    items: Record<ProcessId, ProcessStepCopy>;
  };
  testimonials: {
    eyebrow: string;
    headline: Segment[];
    noteLine1: string;
    noteLine2: string;
    previous: string;
    next: string;
    avatarAlt: string;
    items: Record<TestimonialId, TestimonialCopy>;
  };
  contactCallout: {
    eyebrow: string;
    headline: Segment[][];
    cta: string;
  };
  footer: {
    exploring: string;
    github: string;
  };
  contact: {
    title: string;
    languagesLine1: string;
    languagesLine2: string;
    intro: {
      eyebrow: string;
      headline: Segment[][];
      description: string;
      startWith: string;
      figureAlt: string;
      figureCaption: string;
      directLine: string;
      replyTime: string;
      signature: string;
    };
    form: {
      startWith: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      newsletter: string;
      interestsLegend: string;
      interests: Record<InterestId, string>;
      budget: string;
      budgetAria: string;
      budgetCurrency: string;
      collaborationLegend: string;
      collaborationTypes: Record<CollaborationTypeId, string>;
      messageLabels: Record<StartingPoint, string>;
      messagePlaceholders: Record<StartingPoint, string>;
      assetsLegend: string;
      assets: Record<AssetId, string>;
      referralLegend: string;
      referralPlaceholder: string;
      startingPoints: Record<StartingPoint, StartingPointCopy>;
      toast: string;
    };
  };
  chatbot: {
    welcome: string;
    name: string;
    title: string;
    close: string;
    open: string;
    thinking: string;
    disclaimer: string;
    contactLink: string;
    placeholder: string;
    inputLabel: string;
    send: string;
    orbAlt: string;
    errors: {
      timeout: string;
      unavailable: string;
      tooLarge: string;
      invalidRequest: string;
      missingMessage: string;
      rateLimited: string;
      noAnswer: string;
      serviceUnavailable: string;
      breather: string;
    };
  };
};
