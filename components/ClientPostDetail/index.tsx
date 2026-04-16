"use client";

import Link from "next/link";
import { usePostsStore } from "@/store/posts.store";
import PostImage from "@/components/PostImage";

export default function ClientPostDetail({ id }: { id: number }) {
  const { localPosts } = usePostsStore();

  const post = localPosts.find((p) => p.id === id);

  if (!post) {
    return <p className="text-white p-4">Post no encontrado</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b1a] to-[#0a162b] text-white px-4 py-6 flex justify-center">
      <div className="w-full max-w-3xl bg-[#0f1c33]/80 backdrop-blur-md border border-[#1f2a44] rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/listado"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            ← Volver
          </Link>
          <Link
            href={`/listado/${post.id}/editar`}
            className="px-3 py-1.5 text-xs rounded-full bg-[lab(71_-3.17_-35.65)]/10 text-[lab(71_-3.17_-35.65)] border border-[lab(71_-3.17_-35.65)]/20 hover:bg-[lab(71_-3.17_-35.65)]/20 transition"
          >
            ✏️ Editar
          </Link>
        </div>
        <div className="mb-5 overflow-hidden rounded-xl">
          <PostImage id={post.id} alt={post.title} />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-100">
          {post.title}
        </h1>
        <p className="text-gray-400 leading-relaxed text-base">
          {post.body}
        </p>
      </div>
    </div>
  );
}