import { Post } from '@/types/post.types';
import { ENV } from "@/config/env";

const API_URL = `${ENV.API_URL}/posts`;

export const getPosts = async (
  page: number,
  limit: number
): Promise<Post[]> => {
  const res = await fetch(
    `${API_URL}?_page=${page}&_limit=${limit}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Error fetching posts');
  }

  return res.json();
};