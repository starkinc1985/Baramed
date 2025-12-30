import SectionHeader from "../Common/SectionHeader";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  youtubeId: string;
}

const videos: Video[] = [
  {
    id: "1",
    title: "Manufacturing Process Overview",
    thumbnail: "/images/videos/manufacturing-thumb.jpg",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
  },
  {
    id: "2",
    title: "Quality Control Procedures",
    thumbnail: "/images/videos/quality-thumb.jpg",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
  },
  {
    id: "3",
    title: "Product Showcase",
    thumbnail: "/images/videos/products-thumb.jpg",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
  },
];

const YouTubeVideos = () => {
  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "Video Library",
            subtitle: "See Our Process",
            description: "Watch videos about our manufacturing process, quality control, and products",
          }}
        />

        <div className="mt-15 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative overflow-hidden rounded-lg border border-stroke bg-white shadow-1 dark:border-strokedark dark:bg-blacksection"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 transition-all group-hover:bg-black/70"
                >
                  <svg
                    className="h-16 w-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </a>
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-waterloo">
                    Video Thumbnail
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-semibold text-black dark:text-white">
                  {video.title}
                </h3>
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  Watch on YouTube
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouTubeVideos;

