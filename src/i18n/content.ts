import {
  assetMeta,
  collaborationTypeMeta,
  interestMeta,
  startingPointMeta,
} from "../data/contactForm";
import { processStepMeta } from "../data/processSteps";
import { serviceMeta } from "../data/services";
import { testimonialMeta } from "../data/testimonials";
import { workMedia } from "../data/workMedia";
import en from "./en";
import es from "./es";
import fr from "./fr";
import type { Dictionary, Locale } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { en, es, fr };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getServices(locale: Locale) {
  const copy = dictionaries[locale].services.items;

  return serviceMeta.map((service) => ({
    ...service,
    ...copy[service.id],
  }));
}

export function getProcessSteps(locale: Locale) {
  const copy = dictionaries[locale].process.items;

  return processStepMeta.map((step) => ({
    ...step,
    ...copy[step.id],
  }));
}

export function getTestimonials(locale: Locale) {
  const copy = dictionaries[locale].testimonials.items;

  return testimonialMeta.map((testimonial) => ({
    ...testimonial,
    ...copy[testimonial.id],
  }));
}

export function getWorkMedia(locale: Locale) {
  const copy = dictionaries[locale].work.items;

  return workMedia.map((item) => ({
    ...item,
    ...copy[item.id],
  }));
}

export function getInterests(locale: Locale) {
  const copy = dictionaries[locale].contact.form.interests;

  return interestMeta.map((interest) => ({
    ...interest,
    label: copy[interest.id],
  }));
}

export function getAssets(locale: Locale) {
  const copy = dictionaries[locale].contact.form.assets;

  return assetMeta.map((asset) => ({
    ...asset,
    label: copy[asset.id],
  }));
}

export function getCollaborationTypes(locale: Locale) {
  const copy = dictionaries[locale].contact.form.collaborationTypes;

  return collaborationTypeMeta.map((type) => ({
    ...type,
    label: copy[type.id],
  }));
}

export function getStartingPoints(locale: Locale) {
  const copy = dictionaries[locale].contact.form.startingPoints;

  return startingPointMeta.map((point) => ({
    ...point,
    ...copy[point.id],
  }));
}
