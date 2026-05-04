import SectionHeader from "../Common/SectionHeader";
import { prisma } from "@/lib/prisma";
import VideoGrid from "./VideoGrid";

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
        <VideoGrid videos={videos} />
      </div>
    </section>
  );
};

export default YouTubeVideos;
