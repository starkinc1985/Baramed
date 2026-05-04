import SectionHeader from "../Common/SectionHeader";
import { prisma } from "@/lib/prisma";
import VideoThumbnail from "./VideoThumbnail";

const YouTubeVideos = async () => {
  const videos = await prisma.video.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  if (videos.length === 0) return null;

  return (
    <section className="border-b border-stroke bg-white py-12 dark:border-strokedark dark:bg-darksectiontwo">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "Video Library",
            subtitle: "See Our Process",
            description:
              "Watch videos about our manufacturing process, quality control, and products",
          }}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const thumb =
              video.thumbnail ||
              `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

            return (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-2xl border border-stroke bg-sectionalt shadow-[0_2px_14px_rgba(10,30,100,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_10px_36px_rgba(0,107,255,0.16)] dark:border-strokedark dark:bg-darkcard"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden">
                  {/* Image */}
                  <VideoThumbnail
                    src={thumb}
                    alt={video.title}
                    youtubeId={video.youtubeId}
                  />

                  {/* Persistent bottom gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                  {/* Hover darken overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/25 ring-2 ring-white/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF0000] group-hover:ring-[#FF0000]/60">
                      <svg
                        className="h-6 w-6 translate-x-0.5 text-white drop-shadow-sm"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* YouTube badge top-right */}
                  <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 backdrop-blur-sm">
                    <svg
                      className="h-3.5 w-3.5 text-[#FF0000]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="text-xs font-medium text-white">YouTube</span>
                  </div>

                  {/* Duration-style label bottom-left */}
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-md bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                      Watch now
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="mb-1.5 font-semibold leading-snug text-black transition-colors duration-200 group-hover:text-primary dark:text-white">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="line-clamp-2 text-sm leading-relaxed text-waterloo">
                      {video.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open on YouTube
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YouTubeVideos;
