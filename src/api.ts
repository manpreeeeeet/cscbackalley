export const API_BASE_URL = "/api";

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
  url: string | null;
}

interface Posts {
  posts: Post[];
}

export interface Post {
  id: number;
  room: string;
  text: string;
  imageUrl: string | null;
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

export interface Reply {
  id: number;
  text: string;
  imageUrl: string | null;
  createdAt: string;
  author: {
    name: string;
  };
  parent: {
    id: number;
    room: string;
  };
}
interface LatestPosts {
  posts: Post[];
  replies: Reply[];
}

export const getLatestPost = async (): Promise<LatestPosts> => {
  const response = await fetch(`${API_BASE_URL}/posts/latest/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

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
interface PostsPaginated {
  posts: Post[];
  cursor: number | null;
}

export const getPostsPaginated = async (
  room: string,
  page: number,
): Promise<PostsPaginated> => {
  const response = await fetch(
    `${API_BASE_URL}/posts/${room}/?cursor=${page}`,
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
  url: string | null;
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
