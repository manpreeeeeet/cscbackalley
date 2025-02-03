import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api.ts";
import { useContext, useState } from "react";
import { LoginContext } from "../LoginContextProvider.tsx";

export function CreatePost({ room }: { room: string }) {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useContext(LoginContext);

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setPostText("");
      queryClient.invalidateQueries({ queryKey: ["posts", room] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [postText, setPostText] = useState("");

  const onPostClick = () => {
    mutation.mutate({ text: postText, room });
  };
  return (
    <div className="w-full border border-white text-base">
      <div className="flex-col flex">
        {!isLoggedIn && (
          <div className="border border-white py-1 px-4">login to post</div>
        )}
        {isLoggedIn && (
          <>
            <textarea
              rows={4}
              className="w-full resize-none outline-none p-1"
              value={postText}
              onInput={(e) => setPostText(e.target.value)}
            />
            <button
              className="border border-white py-1 px-4"
              onClick={onPostClick}
            >
              post
            </button>
          </>
        )}
      </div>
    </div>
  );
}
