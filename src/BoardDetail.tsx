import { BaseLayout } from "./components/BaseLayout.tsx";
import { TypewriterEffect } from "./components/Typewriter.tsx";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "./api.ts";
import { useParams } from "react-router";
import { CreateReply } from "./components/CreateReply.tsx";
import { format } from "date-fns";
import { messages } from "./Board.tsx";

export function BoardDetail() {
  const { room } = useParams();
  const { pid } = useParams();

  const {
    isPending,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ["posts", room, pid],
    queryFn: async () => {
      return await getPost({ room, id: pid!! });
    },
  });

  return (
    <BaseLayout>
      <div className="flex flex-col items-center">
        <div className="mx-auto">{room} /</div>
        <TypewriterEffect texts={messages[room]} />
        <div className="text-base w-full mt-2">
          <div className="border-b border-white w-full">
            <div className="flex flex-col gap-2">
              {isPending && (
                <div className="text-xs md:text-sm flex gap-2">loading....</div>
              )}
              {!isPending && post && (
                <>
                  <div className="text-xs md:text-sm flex gap-2">
                    <div className="underline">{post.author.name}</div>
                    <div className="text-gray-400">
                      {format(new Date(post.createdAt), "MMM dd, yyyy HH:mm")}
                    </div>
                    <div className="text-gray-400">No.{post.id}</div>
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
                      {post.text.split("\n").map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {post.replies.map((reply) => {
                      return (
                        <div
                          key={reply.id}
                          className="flex flex-col gap-2 border border-white w-fit p-1"
                        >
                          <div className="text-xs md:text-sm flex gap-2">
                            <div className="underline">{reply.author.name}</div>
                            <div className="text-gray-400">
                              {format(
                                new Date(reply.createdAt),
                                "MMM dd, yyyy HH:mm",
                              )}
                            </div>
                            <div className="text-gray-400">No.{reply.id}</div>
                          </div>
                          <div className="flex gap-2 p-1">
                            {reply.imageUrl && (
                              <img
                                src={reply.imageUrl}
                                alt=""
                                className="w-48 max-h-64 object-contain"
                              />
                            )}
                            <div className="flex flex-col break-all">
                              {reply.text.split("\n").map((line, index) => (
                                <div key={index}>{line}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <CreateReply room={room} postId={pid!!} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
