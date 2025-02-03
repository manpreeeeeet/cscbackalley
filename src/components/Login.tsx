import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLoginStatus, login as loginRequest, signup } from "../api.ts";
import { LoginContext } from "../LoginContextProvider.tsx";

export function Login() {
  const queryClient = useQueryClient();
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoggedIn, login, logout } = useContext(LoginContext);

  const handleSignInClick = () => {
    setOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ["author", "status"],
    queryFn: async () => {
      return await getLoginStatus();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      login();
    } else {
      logout();
    }
  }, [isSuccess]);

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: async () => {
      setUsername("");
      setPassword("");
      setOverlayVisible(false);
      await queryClient.invalidateQueries({
        queryKey: ["author", "status"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signup,
    onSuccess: async () => {
      setUsername("");
      setPassword("");
      setOverlayVisible(false);
      await queryClient.invalidateQueries({
        queryKey: ["author", "status"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const signUpButtonClick = () => {
    signUpMutation.mutate({ name: username, password, code: inviteCode });
  };

  const loginButtonClick = () => {
    loginMutation.mutate({ name: username, password });
  };

  return (
    <div>
      {isSuccess ? (
        <div>{data?.name}</div>
      ) : (
        <button onClick={handleSignInClick}>[join]</button>
      )}
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
                  value={username}
                  onInput={(e) => setUsername(e.target.value)}
                />
                <input
                  className="w-full border border-white p-1"
                  type="password"
                  placeholder="password"
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                />
                {!isLoginMode && (
                  <input
                    className="w-full border border-white p-1"
                    type="text"
                    placeholder="invite code"
                    value={inviteCode}
                    onInput={(e) => setInviteCode(e.target.value)}
                  />
                )}
                <div className="cursor-pointer">
                  {isLoginMode && (
                    <div onClick={() => setIsLoginMode(false)}>
                      new here? sign up
                    </div>
                  )}
                  {!isLoginMode && (
                    <div onClick={() => setIsLoginMode(true)}>
                      have an account? login
                    </div>
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
                    <button
                      className="border border-white py-1 px-4"
                      onClick={signUpButtonClick}
                    >
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
