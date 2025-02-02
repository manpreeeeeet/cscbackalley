import { BaseLayout } from "./components/BaseLayout.tsx";
import { TypewriterEffect } from "./components/Typewriter.tsx";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "./api.ts";
import { useParams } from "react-router";
import { CreateReply } from "./components/CreateReply.tsx";
import { format } from "date-fns";

export function ProjectsDetail() {
  const { pid } = useParams();

  const {
    isPending,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ["posts", "projects", pid],
    queryFn: async () => {
      return await getPost({ room: "projects", id: pid!! });
    },
  });

  return (
    <BaseLayout>
      <div className="flex flex-col items-center">
        <div className="mx-auto">projects /</div>
        <TypewriterEffect texts={["i made a thing"]} />
        <div className="text-base w-full mt-2">
          <div className="border-b border-white w-full">
            <div className="flex flex-col gap-2">
              {isPending && <div>loading....</div>}
              {!isPending && post && (
                <>
                  <div className="text-xs md:text-sm flex gap-2">
                    <div className="underline">{post.author.name}</div>
                    <div className="text-gray-400">
                      {format(new Date(post.createdAt), "MMM dd, yyyy HH:mm")}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {post.text.split("\n").map((line) => (
                      <div>{line}</div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    {post.replies.map((reply) => {
                      return (
                        <div className="flex flex-col gap-2 border border-white w-fit p-1">
                          <div className="text-xs md:text-sm flex gap-2">
                            <div className="underline">{reply.author.name}</div>
                            <div className="text-gray-400">
                              {format(
                                new Date(reply.createdAt),
                                "MMM dd, yyyy HH:mm",
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            {reply.text.split("\n").map((line) => (
                              <div>{line}</div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <CreateReply room={"projects"} postId={pid!!} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
