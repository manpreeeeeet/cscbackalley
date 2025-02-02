const API_BASE_URL = "/api";

interface UserCredentials {
  name: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  password: string;
  code: string;
}

interface Author {
  name: string;
}

export const getLoginStatus = async (): Promise<Author> => {
  const response = await fetch(`${API_BASE_URL}/author/status`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const login = async (credentials: UserCredentials) => {
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

export const signup = async (credentials: SignUpCredentials) => {
  const response = await fetch(`${API_BASE_URL}/author/register`, {
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

interface PostRequest {
  text: string;
  room: string;
}

interface Posts {
  posts: Post[];
}

interface Post {
  id: number;
  text: string;
  createdAt: string;
  author: {
    name: string;
  };
  replies: Post[];
}

interface GetPost {
  id: string;
  room: string;
}

export const getPost = async (post: GetPost): Promise<Post> => {
  const response = await fetch(
    `${API_BASE_URL}/posts/${post.room}/${post.id}/`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
  return data;
};

export const getPosts = async (room: string): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/posts/${room}/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const createPost = async (post: PostRequest) => {
  const response = await fetch(`${API_BASE_URL}/posts/${post.room}/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  const data = await response.json();
  return data;
};

interface ReplyRequest {
  postId: string;
  text: string;
  room: string;
}

export const createReply = async (reply: ReplyRequest) => {
  const response = await fetch(
    `${API_BASE_URL}/posts/${reply.room}/${reply.postId}/`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reply),
    },
  );

  const data = await response.json();
  return data;
};
