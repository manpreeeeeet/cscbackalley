const API_BASE_URL = "http://localhost:8080";

interface UserCredentials {
  name: string;
  password: string;
}

export const login = async (credentials: UserCredentials) => {
  console.log(credentials);
  const response = await fetch(`${API_BASE_URL}/author/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  return data;
};
