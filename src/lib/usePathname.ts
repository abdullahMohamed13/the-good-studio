import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("popstate", emit);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", emit);
  };
}

function getSnapshot() {
  return window.location.pathname;
}

function getServerSnapshot() {
  return "/";
}

export function usePathname() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function navigate(
  href: string,
  options: { replace?: boolean; preserveScroll?: boolean } = {},
) {
  const url = new URL(href, window.location.href);
  const pathChanged = url.pathname !== window.location.pathname;

  if (options.replace) {
    window.history.replaceState(null, "", url);
  } else {
    window.history.pushState(null, "", url);
  }

  emit();

  if (options.preserveScroll) return;

  if (url.hash) {
    requestAnimationFrame(() => {
      document.getElementById(url.hash.slice(1))?.scrollIntoView();
    });
  } else if (pathChanged) {
    window.scrollTo(0, 0);
  }
}
