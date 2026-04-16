import {
  useInfiniteQuery,
  type QueryFunctionContext,
} from '@tanstack/react-query';

import { getPosts } from '@/services/posts.service';
import { Post } from '@/types/post.types';

type PostsKey = ['posts'];

export const usePosts = () => {
  return useInfiniteQuery<Post[], Error, Post[], PostsKey, number>({
    queryKey: ['posts'],

    initialPageParam: 1,

    queryFn: ({
      pageParam,
    }: QueryFunctionContext<PostsKey, number>) => {
      const page = pageParam ?? 1;
      return getPosts(page, 10);
    },

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
  });
};