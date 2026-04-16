"use client";

import { useParams, useRouter } from "next/navigation";
import PostForm from "@/components/Posts";
import { usePostsStore } from "@/store/posts.store";
import { usePostById } from "@/hooks/usePostById";
import PostImage from "@/components/PostImage";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const postId = Number(id);

  const { post, isLoading } = usePostById(postId);
  const { updatePost, addPost } = usePostsStore();

  if (isLoading)
    return <p className="text-white p-4">Loading...</p>;

  if (!post)
    return <p className="text-white p-4">Post no encontrado</p>;

  const handleUpdate = (values: { title: string; body: string }) => {
    const updatedPost = {
      ...post,
      ...values,
    };

    const isLocal = postId > 100;

    if (isLocal) {
      updatePost(updatedPost);
    } else {
      addPost(updatedPost);
    }

    router.push(`/listado/${postId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b1a] to-[#0a162b] text-white px-4 py-6 flex justify-center">
      <div className="w-full max-w-3xl bg-[#0f1c33]/80 backdrop-blur-md border border-[#1f2a44] rounded-2xl p-6 shadow-md">
        <div className="mb-5 overflow-hidden rounded-xl">
          <PostImage id={post.id} alt={post.title} />
        </div>
        <PostForm
          defaultValues={{
            title: post.title,
            body: post.body,
          }}
          onSubmit={handleUpdate}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}