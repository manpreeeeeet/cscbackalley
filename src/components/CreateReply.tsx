import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReply } from "../api.ts";
import { LoginContext } from "../LoginContextProvider.tsx";

export function CreateReply({
  room,
  postId,
}: {
  room: string;
  postId: string;
}) {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useContext(LoginContext);

  const mutation = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      setReplyText("");
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
    mutation.mutate({ text: replyText, room, postId });
  };
  return (
    <div className="w-full border border-white text-base">
      <div className="flex-col flex">
        {!isLoggedIn && (
          <div className="border border-white py-1 px-4">login to reply</div>
        )}
        {isLoggedIn && (
          <>
            <textarea
              rows={4}
              className="w-full resize-none outline-none p-1"
              value={replyText}
              onInput={(e) => setReplyText(e.target.value)}
            />
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
