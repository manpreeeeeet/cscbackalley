import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReply } from "../api.ts";
import { LoginContext } from "../LoginContextProvider.tsx";
import ImageUpload from "./ImageUpload.tsx";

export function CreateReply({
  room,
  postId,
}: {
  room: string;
  postId: string;
}) {
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { isLoggedIn } = useContext(LoginContext);

  const mutation = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      setReplyText("");
      setImageUrl(null);
      queryClient.invalidateQueries({
        queryKey: ["posts", room, postId],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [replyText, setReplyText] = useState("");

  const onPostClick = () => {
    mutation.mutate({ text: replyText, room, postId, url: imageUrl });
  };
  return (
    <div className="w-full text-base">
      <div className="flex-col flex">
        {!isLoggedIn && (
          <div className="border border-white py-1 px-4">login to reply</div>
        )}
        {isLoggedIn && (
          <>
            <div>
              <ImageUpload setImageUrl={setImageUrl} />
            </div>
            <div className="flex items-end border border-white">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt=""
                  className="max-w-[40%] h-32 object-contain"
                />
              )}
              <textarea
                rows={4}
                className={`${!imageUrl ? "w-full" : "flex-1"} resize-none outline-none p-1`}
                value={replyText}
                onInput={(e) => setReplyText(e.target.value)}
              />
            </div>
            <button
              className="border border-white py-1 px-4"
              onClick={onPostClick}
            >
              reply
            </button>
          </>
        )}
      </div>
    </div>
  );
}
