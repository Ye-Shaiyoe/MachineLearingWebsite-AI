"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ImagePlus, X, Check } from "lucide-react";

const PRESETS = [
  { id: "default-01", src: "/wallpapers/default-01.jpg", label: "Cyber City" },
  { id: "default-02", src: "/wallpapers/default-02.jpg", label: "Observatory" },
  { id: "default-03", src: "/wallpapers/default-03.jpg", label: "Zen Garden" },
];

const STORAGE_KEY = "dashboard-wallpaper";

export function useWallpaper() {
  const [wallpaper, setWallpaper] = useState<string>(PRESETS[0].src);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setWallpaper(saved);
  }, []);

  const updateWallpaper = useCallback((src: string) => {
    setWallpaper(src);
    localStorage.setItem(STORAGE_KEY, src);
  }, []);

  return { wallpaper, updateWallpaper };
}

export function WallpaperCustomizer({
  currentWallpaper,
  onSelect,
}: {
  currentWallpaper: string;
  onSelect: (src: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };

  const handleClose = () => {
    setOpen(false);
    dialogRef.current?.close();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      onSelect(result);
      handleClose();
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={handleOpen}
        className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-lg bg-black/50 px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white"
      >
        <ImagePlus className="h-3.5 w-3.5" />
        Ganti Wallpaper
      </button>

      {/* Dialog */}
      <dialog
        ref={dialogRef}
        className="fixed inset-0 z-50 m-auto h-auto w-full max-w-md rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-surface)] p-0 text-[var(--ds-text)] shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
        onClose={handleClose}
      >
        {open && (
          <div className="p-6">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-lg font-semibold tracking-tight">
                Pilih Wallpaper
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--ds-text-muted)] transition-colors hover:bg-[var(--ds-surface-2)] hover:text-[var(--ds-text)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Preset grid */}
            <div className="grid grid-cols-3 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    onSelect(preset.src);
                    handleClose();
                  }}
                  className="group relative aspect-video overflow-hidden rounded-lg border border-[var(--ds-border)] transition-all hover:border-[var(--ds-accent)]/50"
                >
                  <img
                    src={preset.src}
                    alt={preset.label}
                    className="h-full w-full object-cover"
                  />
                  {currentWallpaper === preset.src && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Check className="h-5 w-5 text-[var(--ds-accent)]" />
                    </div>
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1 text-[9px] font-medium text-white">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Upload button */}
            <div className="mt-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--ds-border)] bg-[var(--ds-surface-2)] px-4 py-3 text-xs text-[var(--ds-text-muted)] transition-all hover:border-[var(--ds-accent)]/50 hover:text-[var(--ds-text)]"
              >
                <ImagePlus className="h-4 w-4" />
                Upload gambar dari perangkat
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
