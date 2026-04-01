export type ThemeEntry = {
  name: string;
  label: string;
  swatch: string;
};

export const BASE_THEMES: ThemeEntry[] = [
  { name: "neutral", label: "Neutral", swatch: "oklch(0.556 0 0)" },
  { name: "stone",   label: "Stone",   swatch: "oklch(0.553 0.013 58.071)" },
  { name: "zinc",    label: "Zinc",    swatch: "oklch(0.552 0.016 285.938)" },
  { name: "mauve",   label: "Mauve",   swatch: "oklch(0.542 0.034 322.5)" },
  { name: "olive",   label: "Olive",   swatch: "oklch(0.58 0.031 107.3)" },
  { name: "mist",    label: "Mist",    swatch: "oklch(0.56 0.021 213.5)" },
  { name: "taupe",   label: "Taupe",   swatch: "oklch(0.547 0.021 43.1)" },
];

export const COLOR_THEMES: ThemeEntry[] = [
  { name: "neutral", label: "Mono",    swatch: "oklch(0.45 0 0)" },
  { name: "amber",   label: "Amber",   swatch: "oklch(0.769 0.188 70.08)" },
  { name: "yellow",  label: "Yellow",  swatch: "oklch(0.795 0.184 86.047)" },
  { name: "lime",    label: "Lime",    swatch: "oklch(0.768 0.233 130.85)" },
  { name: "green",   label: "Green",   swatch: "oklch(0.723 0.219 149.579)" },
  { name: "emerald", label: "Emerald", swatch: "oklch(0.696 0.17 162.48)" },
  { name: "teal",    label: "Teal",    swatch: "oklch(0.704 0.14 182.503)" },
  { name: "cyan",    label: "Cyan",    swatch: "oklch(0.715 0.143 215.221)" },
  { name: "sky",     label: "Sky",     swatch: "oklch(0.685 0.169 237.323)" },
  { name: "blue",    label: "Blue",    swatch: "oklch(0.623 0.214 259.815)" },
  { name: "indigo",  label: "Indigo",  swatch: "oklch(0.585 0.233 277.117)" },
  { name: "violet",  label: "Violet",  swatch: "oklch(0.606 0.25 292.717)" },
  { name: "purple",  label: "Purple",  swatch: "oklch(0.627 0.265 303.9)" },
  { name: "fuchsia", label: "Fuchsia", swatch: "oklch(0.667 0.295 322.15)" },
  { name: "pink",    label: "Pink",    swatch: "oklch(0.656 0.241 354.308)" },
  { name: "rose",    label: "Rose",    swatch: "oklch(0.645 0.246 16.439)" },
  { name: "red",     label: "Red",     swatch: "oklch(0.637 0.237 25.331)" },
  { name: "orange",  label: "Orange",  swatch: "oklch(0.705 0.213 47.604)" },
];

const BASE_CLASSES = BASE_THEMES
  .filter(t => t.name !== "neutral")
  .map(t => `base-${t.name}`);

const COLOR_CLASSES = COLOR_THEMES
  .filter(t => t.name !== "neutral")
  .map(t => `theme-${t.name}`);

export function applyBaseTheme(name: string) {
  const root = document.documentElement;
  root.classList.remove(...BASE_CLASSES);
  if (name !== "neutral") root.classList.add(`base-${name}`);
}

export function applyColorTheme(name: string) {
  const root = document.documentElement;
  root.classList.remove(...COLOR_CLASSES);
  if (name !== "neutral") root.classList.add(`theme-${name}`);
}
