import { BaseLayout } from "./components/BaseLayout.tsx";
import { TypewriterEffect } from "./components/Typewriter.tsx";
import { CreatePost } from "./components/CreatePost.tsx";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api.ts";
import { useNavigate } from "react-router";
import { format } from "date-fns";

export function Projects() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["posts", "projects"],
    queryFn: async () => {
      return await getPosts("projects");
    },
  });

  const navigate = useNavigate();

  return (
    <BaseLayout>
      <div className="flex flex-col items-center">
        <div className="mx-auto">projects /</div>
        <TypewriterEffect texts={["i made a thing"]} />
        <CreatePost room={"projects"} />
        <div className="text-base w-full mt-2 flex flex-col gap-2">
          {data &&
            data.map((post) => {
              return (
                <div
                  className="border-b border-white w-full cursor-pointer pb-1"
                  onClick={() => navigate(`/projects/${post.id}/`)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="text-xs md:text-sm flex gap-2">
                      <div className="underline">{post.author.name}</div>
                      <div className="text-gray-400">
                        {format(new Date(post.createdAt), "MMM dd, yyyy HH:mm")}
                      </div>
                    </div>
                    <div className="flex flex-col break-all">
                      {post.text.split("\n").map((line) => (
                        <div>{line}</div>
                      ))}
                    </div>
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
                          <div className="flex flex-col break-all">
                            {reply.text.split("\n").map((line) => (
                              <div>{line}</div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </BaseLayout>
  );
}
