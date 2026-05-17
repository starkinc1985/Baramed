import SectionHeader from "../Common/SectionHeader";
import { connectDB } from "@/lib/db";
import { Video } from "@/models/Video";
import VideoGrid from "./VideoGrid";

const YouTubeVideos = async () => {
  await connectDB();
  const rawVideos = await Video.find({}).sort({ sortOrder: 1, createdAt: -1 }).lean();

  if (rawVideos.length === 0) return null;

  const videos = (rawVideos as any[]).map((v) => ({
    id: v._id.toString(),
    youtubeId: v.youtubeId,
    title: v.title,
    description: v.description ?? null,
    thumbnail: v.thumbnail ?? null,
  }));

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
