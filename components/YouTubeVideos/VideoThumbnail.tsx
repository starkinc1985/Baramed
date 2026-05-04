"use client";

interface Props {
  src: string;
  alt: string;
  youtubeId: string;
}

export default function VideoThumbnail({ src, alt, youtubeId }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      onError={(e) => {
        const el = e.currentTarget;
        if (!el.src.includes("hqdefault")) {
          el.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
        }
      }}
    />
  );
}
