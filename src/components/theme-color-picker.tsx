"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Paintbrush } from "lucide-react";
import {
  BASE_THEMES,
  COLOR_THEMES,
  applyBaseTheme,
  applyColorTheme,
} from "@/lib/theme-config";

const Checkmark = () => (
  <svg className="h-3 w-3 text-white drop-shadow" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface ThemeColorPickerProps {
  storagePrefix: string;
}

export function ThemeColorPicker({ storagePrefix }: ThemeColorPickerProps) {
  const colorKey = `${storagePrefix}-color-theme`;
  const baseKey  = `${storagePrefix}-base-theme`;

  const [activeColor, setActiveColor] = useState("neutral");
  const [activeBase,  setActiveBase]  = useState("neutral");
  const [mounted,     setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedColor = localStorage.getItem(colorKey) ?? "neutral";
    const savedBase  = localStorage.getItem(baseKey)  ?? "neutral";
    setActiveColor(savedColor);
    setActiveBase(savedBase);
    applyBaseTheme(savedBase);
    applyColorTheme(savedColor);
  }, []);

  function handleBaseSelect(name: string) {
    setActiveBase(name);
    localStorage.setItem(baseKey, name);
    applyBaseTheme(name);
  }

  function handleColorSelect(name: string) {
    setActiveColor(name);
    localStorage.setItem(colorKey, name);
    applyColorTheme(name);
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Color theme" disabled>
        <Paintbrush className="h-4 w-4" />
      </Button>
    );
  }

  const activeTheme = COLOR_THEMES.find(t => t.name === activeColor);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Color theme">
          <Paintbrush
            className="h-4 w-4 transition-colors"
            style={{ color: activeTheme?.swatch }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-3">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Base</p>
        <div className="mb-3 flex justify-between px-0.5">
          {BASE_THEMES.map(t => (
            <button
              key={t.name}
              onClick={() => handleBaseSelect(t.name)}
              title={t.label}
              className="group flex flex-col items-center gap-1 focus:outline-none"
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${
                  activeBase === t.name
                    ? "ring-2 ring-foreground ring-offset-2 ring-offset-popover scale-110"
                    : ""
                }`}
                style={{ background: t.swatch }}
              >
                {activeBase === t.name && <Checkmark />}
              </span>
              <span className="text-[9px] leading-none text-muted-foreground">{t.label}</span>
            </button>
          ))}
        </div>
        <div className="mb-3 h-px bg-border" />
        <p className="mb-2 text-xs font-medium text-muted-foreground">Theme</p>
        <div className="grid grid-cols-6 gap-1.5">
          {COLOR_THEMES.map(t => (
            <button
              key={t.name}
              onClick={() => handleColorSelect(t.name)}
              title={t.label}
              className="group flex flex-col items-center gap-1 focus:outline-none"
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${
                  activeColor === t.name
                    ? "ring-2 ring-foreground ring-offset-2 ring-offset-popover scale-110"
                    : ""
                }`}
                style={{ background: t.swatch }}
              >
                {activeColor === t.name && <Checkmark />}
              </span>
              <span className="text-[9px] leading-none text-muted-foreground">{t.label}</span>
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
