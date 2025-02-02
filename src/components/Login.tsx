import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api.ts";
import { useNavigate } from "react-router";

export function Login() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      setUsername("");
      setPassword("");
      setOverlayVisible(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const loginButtonClick = () => {
    mutation.mutate({ name: username, password });
  };

  return (
    <div>
      <button onClick={handleSignInClick}>[join]</button>
      {isOverlayVisible && (
        <div
          className="fixed bg-[#0000004d] top-0 left-0 inset-0 z-40 flex items-center justify-center bg-opacity-50"
          onClick={handleCloseOverlay}
        >
          <div
            className="relative flex flex-col backdrop-blur-sm shadow-lg sm:max-w-md md:w-md border border-white h-[700px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between p-1 border-b-2 border-white">
              <div>identify yourself</div>
              <button
                onClick={handleCloseOverlay}
                className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
              >
                X
              </button>
            </div>
            <div className="p-20 flex flex-col flex-1">
              <div className="my-auto flex flex-col gap-2 items-center">
                <input
                  className="w-full border border-white p-1"
                  type="text"
                  placeholder="username"
                  onInput={(e) => setUsername(e.target.value)}
                />
                <input
                  className="w-full border border-white p-1"
                  type="text"
                  placeholder="password"
                  onInput={(e) => setPassword(e.target.value)}
                />
                <div className="cursor-pointer">
                  {isLoginMode && (
                    <div onClick={() => setIsLoginMode(false)}>sign up</div>
                  )}
                  {!isLoginMode && (
                    <div onClick={() => setIsLoginMode(true)}>login</div>
                  )}
                </div>
                <div className="mt-20">
                  {isLoginMode && (
                    <button
                      className="border border-white py-1 px-4"
                      onClick={loginButtonClick}
                    >
                      login
                    </button>
                  )}
                  {!isLoginMode && (
                    <button className="border border-white py-1 px-4">
                      sign up
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
