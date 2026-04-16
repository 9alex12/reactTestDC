'use client';

import { usePosts } from './usePosts';
import { usePostsStore } from '@/store/posts.store';
import { Post } from '@/types/post.types';
import { useMemo } from 'react';

export const useMergedPosts = () => {
  const { data, ...queryState } = usePosts();
  const { localPosts } = usePostsStore();

const apiPosts = (data as { pages: Post[][] } | undefined)?.pages?.flat() ?? [];

  const mergedPosts = useMemo(() => {
    const localIds = new Set(localPosts.map(p => p.id));

    const filteredApiPosts = apiPosts.filter(p => !localIds.has(p.id));

    return [...localPosts, ...filteredApiPosts];
  }, [apiPosts, localPosts]);

  return {
    posts: mergedPosts,
    ...queryState,
  };
};