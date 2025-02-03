import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api.ts";
import { useContext, useState } from "react";
import { LoginContext } from "../LoginContextProvider.tsx";
import ImageUpload from "./ImageUpload.tsx";

export function CreatePost({ room }: { room: string }) {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useContext(LoginContext);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setPostText("");
      setImageUrl(null);
      queryClient.invalidateQueries({ queryKey: ["posts", room] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [postText, setPostText] = useState("");

  const onPostClick = () => {
    mutation.mutate({ text: postText, room, url: imageUrl });
  };
  return (
    <div className="w-full text-base">
      <div className="flex-col flex">
        {!isLoggedIn && (
          <div className="border border-white py-1 px-4">login to post</div>
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
                rows={8}
                className={`${!imageUrl ? "w-full" : "flex-1"} resize-none outline-none p-1`}
                value={postText}
                onInput={(e) => setPostText(e.target.value)}
              />
            </div>
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
