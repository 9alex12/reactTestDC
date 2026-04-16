'use client';

import { usePostsStore } from '@/store/posts.store';
import { ENV } from "@/config/env";

export const useCreatePost = () => {
  const { addPost } = usePostsStore();

  const createPost = async (values: { title: string; body: string }) => {
    const newPost = {
      id: Date.now(),
      userId: 1,
      ...values,
    };

    addPost(newPost);

      const API_URL = `${ENV.API_URL}/posts`;
    try {
      await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return {
    createPost,
  };
};