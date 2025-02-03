import frog from "./content/frog.webp";

import { BaseLayout } from "./components/BaseLayout.tsx";
import { TypewriterEffect } from "./components/Typewriter.tsx";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getLatestPost, getPost } from "./api.ts";
import { Link } from "react-router";

function App() {
  const {
    isPending,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ["posts", "projects", "latest"],
    queryFn: async () => {
      return await getLatestPost();
    },
  });
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
          {!isPending && post && (
            <>
              <div className="mt-10 flex items-end justify-between">
                <div className="text-2xl">Latest Post</div>
                <div className="text-base underline cursor-pointer">
                  <Link to={`/${post.room}/${post.id}/`}>view thread</Link>
                </div>
              </div>
              <div className="text-base border border-white w-full min-h-30 p-1">
                <div className="text-xs md:text-sm flex gap-2">
                  <div className="underline">{post.author.name}</div>
                  <div className="text-gray-400">
                    {format(new Date(post.createdAt), "MMM dd, yyyy HH:mm")}
                  </div>
                </div>
                <div className="flex">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="h-32 max-w-[30%] object-contain"
                    />
                  )}
                  <div className="flex flex-col break-all">
                    {post.text.split("\n").map((line) => (
                      <div>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}

export default App;
