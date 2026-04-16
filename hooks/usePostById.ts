'use client';

import { useMergedPosts } from './useMergedPosts';

export const usePostById = (id: number) => {
  const { posts, ...queryState } = useMergedPosts();

  const post = posts.find((p) => p.id === id);

  return {
    post,
    ...queryState,
  };
};