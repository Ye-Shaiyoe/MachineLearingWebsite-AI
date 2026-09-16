"use client";

import { useEffect, useRef, useState } from "react";
import {
  Disc3,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Upload,
  Volume2,
} from "lucide-react";

type Track = {
  name: string;
  url: string;
};

export function LocalMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return () => {
      if (track) URL.revokeObjectURL(track.url);
    };
  }, [track]);

  function handleUpload(file?: File) {
    if (!file || !file.type.startsWith("audio/")) return;
    if (track) URL.revokeObjectURL(track.url);
    setTrack({ name: file.name, url: URL.createObjectURL(file) });
    setProgress(0);
    setIsPlaying(false);
  }

  async function togglePlayback() {
    if (!audioRef.current || !track) return;
    if (audioRef.current.paused) {
      await audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  function seek(offset: number) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      Math.max(audioRef.current.currentTime + offset, 0),
      duration,
    );
  }

  return (
    <section className="mx-3 mb-4 rounded-xl border border-[var(--ds-border)] bg-[var(--ds-surface-2)]/80 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Disc3 className={`h-4 w-4 text-[var(--ds-cyan)] ${isPlaying ? "animate-spin" : ""}`} />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">
              Audio lokal
            </p>
            <p className="max-w-[150px] truncate text-[10px] text-[var(--ds-text-dim)]">
              {track?.name ?? "Belum ada musik"}
            </p>
          </div>
        </div>
        <label className="cursor-pointer rounded-md p-1.5 text-[var(--ds-text-dim)] transition-colors hover:bg-white/[0.06] hover:text-[var(--ds-text)]" title="Upload musik dari perangkat">
          <Upload className="h-3.5 w-3.5" />
          <input
            type="file"
            accept="audio/*"
            className="sr-only"
            onChange={(event) => handleUpload(event.target.files?.[0])}
          />
        </label>
      </div>

      <audio
        ref={audioRef}
        src={track?.url}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />
      <input
        aria-label="Posisi musik"
        type="range"
        min={0}
        max={duration || 1}
        value={progress}
        onChange={(event) => {
          const next = Number(event.target.value);
          setProgress(next);
          if (audioRef.current) audioRef.current.currentTime = next;
        }}
        className="mb-2 h-1 w-full accent-[var(--ds-accent)]"
        disabled={!track}
      />
      <div className="flex items-center justify-center gap-2">
        <button type="button" onClick={() => seek(-10)} disabled={!track} className="rounded-md p-1.5 text-[var(--ds-text-muted)] hover:bg-white/[0.06] disabled:opacity-30" title="Mundur 10 detik">
          <SkipBack className="h-3.5 w-3.5" />
        </button>
        <button type="button" onClick={togglePlayback} disabled={!track} className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--ds-accent)] text-[#030508] hover:bg-[var(--ds-accent-hover)] disabled:opacity-30" title={isPlaying ? "Jeda" : "Putar"}>
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
        </button>
        <button type="button" onClick={() => seek(10)} disabled={!track} className="rounded-md p-1.5 text-[var(--ds-text-muted)] hover:bg-white/[0.06] disabled:opacity-30" title="Maju 10 detik">
          <SkipForward className="h-3.5 w-3.5" />
        </button>
        <Volume2 className="ml-1 h-3.5 w-3.5 text-[var(--ds-text-dim)]" />
      </div>
    </section>
  );
}
