import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Post } from "@/types/post.types";

interface PostsState {
  localPosts: Post[];
  deletedPostIds: (number | string)[];

  addPost: (post: Post) => void;
  deletePost: (id: number) => void;
  updatePost: (post: Post) => void;
}

export const usePostsStore = create<PostsState>()(
  persist(
    (set) => ({
      localPosts: [],
      deletedPostIds: [],

      addPost: (post) =>
        set((state) => ({
          localPosts: [post, ...state.localPosts],
        })),

      deletePost: (id) =>
        set((state) => ({
          localPosts: state.localPosts.filter((p) => p.id !== id),
          deletedPostIds: [...state.deletedPostIds, id],
        })),

      updatePost: (updatedPost) =>
        set((state) => ({
          localPosts: state.localPosts.map((p) =>
            p.id === updatedPost.id ? updatedPost : p
          ),
        })),
    }),
    {
      name: "posts-storage",
    }
  )
);
