import frog from "./content/frog.webp";

import { BaseLayout } from "./components/BaseLayout.tsx";
import { TypewriterEffect } from "./components/Typewriter.tsx";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getLatestPost, getPost, Post, Reply } from "./api.ts";
import { Link } from "react-router";
import { useEffect, useState } from "react";

function App() {
  const {
    isPending,
    isError,
    data: latestPosts,
    error,
  } = useQuery({
    queryKey: ["posts", "projects", "latest"],
    queryFn: async () => {
      return await getLatestPost();
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [combined, setCombined] = useState<(Post | Reply)[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | Reply | null>(null);

  useEffect(() => {
    if (latestPosts) {
      const newCombined = [...latestPosts.posts, ...latestPosts.replies];
      newCombined.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      });
      setCombined(newCombined);
      setCurrentPost(newCombined[currentIndex]);
    }
  }, [latestPosts]);

  useEffect(() => {
    setCurrentPost(combined[currentIndex]);
  }, [currentIndex, combined]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + 1) % (combined.length > 0 ? combined.length : 1),
      );
    }, 4000);

    return () => clearTimeout(timeout);
  }, [currentIndex, combined]);

  return (
    <BaseLayout>
      <div className="flex flex-col items-center">
        <img src={frog} alt="" />
        <div className="mx-auto">cscbackalley.club</div>
        <TypewriterEffect
          texts={[
            "please meet me at back alley of csc",
            "csc back alley isn't real it cannot hurt you",
            "best place on campus",
          ]}
        />
        <div className="flex flex-col gap-2 w-full">
          {isPending && <div>loading....</div>}
          {!isPending &&
            !isError &&
            combined &&
            combined.length > 0 &&
            currentPost && (
              <>
                <div className="mt-10 flex items-end justify-between">
                  <div className="text-2xl">Latest Post</div>
                  <div className="text-base underline cursor-pointer">
                    <Link
                      to={
                        "room" in currentPost!
                          ? `/${currentPost.room}/${currentPost.id}/`
                          : `/${currentPost!.parent.room}/${currentPost!.parent.id}/`
                      }
                    >
                      view thread
                    </Link>
                  </div>
                </div>
                <div className="text-base border border-white w-full min-h-48 p-1">
                  <div className="text-xs md:text-sm flex gap-2">
                    <div className="underline">{currentPost!.author.name}</div>
                    <div className="text-gray-400">
                      {format(
                        new Date(currentPost!.createdAt),
                        "MMM dd, yyyy HH:mm",
                      )}
                    </div>
                    <div className="text-gray-400">No.{currentPost.id}</div>
                  </div>
                  <div className="flex pt-2">
                    {currentPost!.imageUrl && (
                      <img
                        src={currentPost!.imageUrl}
                        alt=""
                        className="w-48 max-h-36 object-contain"
                      />
                    )}
                    <div className="flex flex-col break-all">
                      {currentPost!.text.split("\n").map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 text-base">
                  {combined.map((_, index) => {
                    return (
                      <div
                        className={`underline cursor-pointer ${currentIndex === index && "text-gray-400"}`}
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                      >
                        {index + 1}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
        </div>
      </div>
    </BaseLayout>
  );
}

export default App;
