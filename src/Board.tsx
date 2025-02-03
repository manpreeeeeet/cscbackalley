import { BaseLayout } from "./components/BaseLayout.tsx";
import { TypewriterEffect } from "./components/Typewriter.tsx";
import { CreatePost } from "./components/CreatePost.tsx";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getPostsPaginated, Post } from "./api.ts";
import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";
import React, { useEffect, useRef } from "react";

export const messages = {
  projects: ["i made a thing"],
  rumors: ["source? i made it up"],
  gifs: ["really bad graphic format"],
  spam: ["sanest spam poster"],
};

export function Board() {
  const { room } = useParams();
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", room],
      queryFn: async ({ pageParam }) => {
        return await getPostsPaginated(room!, pageParam);
      },
      initialPageParam: 0,
      staleTime: 1000 * 60 * 5,
      getNextPageParam: (lastPage, pages) => lastPage.cursor,
    });

  const invalidatePosts = () => {
    queryClient.invalidateQueries(["posts", room]);
  };

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const navigate = useNavigate();

  return (
    <BaseLayout>
      <div className="flex flex-col items-center">
        <div className="mx-auto">{room} /</div>
        <TypewriterEffect texts={messages[room]} />
        <CreatePost room={room!!} />
        <div className="w-full flex">
          <div
            className="text-base border border-white p-1 mt-2 cursor-pointer"
            onClick={invalidatePosts}
          >
            refresh posts
          </div>
        </div>
        <div className="text-base w-full mt-2 flex flex-col gap-6">
          {data &&
            data.pages.map((group, i) => {
              return (
                <React.Fragment key={i}>
                  {group.posts.map((post) => {
                    return (
                      <div
                        key={post.id}
                        className="border-l-2 hover:border-l-4 p-1 border-gray-400 w-full cursor-pointer pb-1"
                        onClick={() => navigate(`/${room}/${post.id}/`)}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="text-xs md:text-sm flex gap-2">
                            <div className="underline">{post.author.name}</div>
                            <div className="text-gray-400">
                              {format(
                                new Date(post.createdAt),
                                "MMM dd, yyyy HH:mm",
                              )}
                            </div>
                          </div>
                          <div className="flex">
                            {post.imageUrl && (
                              <img
                                src={post.imageUrl}
                                alt=""
                                className="w-48 max-h-64 object-contain"
                              />
                            )}
                            <div className="flex flex-col break-all">
                              {post.text.split("\n").map((line, index) => (
                                <div key={index}>{line}</div>
                              ))}
                            </div>
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
                                  <div className="underline">
                                    {reply.author.name}
                                  </div>
                                  <div className="text-gray-400">
                                    {format(
                                      new Date(reply.createdAt),
                                      "MMM dd, yyyy HH:mm",
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  {reply.imageUrl && (
                                    <img
                                      src={reply.imageUrl}
                                      alt=""
                                      className="w-48 max-h-64 object-contain"
                                    />
                                  )}
                                  <div className="flex flex-col break-all">
                                    {reply.text
                                      .split("\n")
                                      .map((line, index) => (
                                        <div key={index}>{line}</div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          <div className="text-base" ref={observerRef}>
            {isFetchingNextPage && "loading more..."}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
