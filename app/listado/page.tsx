"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useMergedPosts } from "@/hooks/useMergedPosts";
import { useDebounce } from "@/hooks/useDebounce";
import { usePostsStore } from "@/store/posts.store";

export default function ListadoPage() {
  const [search, setSearch] = useState("");

  const { posts, fetchNextPage, hasNextPage, isLoading } = useMergedPosts();
  const { deletePost } = usePostsStore();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [posts, debouncedSearch]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <p className="text-white p-4">Cargando...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b1a] to-[#0a162b] text-white px-4 py-6">
      <Link href={"/"} className="pointer mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold tracking-wide text-[lab(71_-3.17_-35.65)]">
            POSTS
          </h1>
        </div>
      </Link>
      <input
        type="text"
        placeholder="Search the kinetic feed..."
        className="w-full mb-6 px-5 py-3 rounded-full bg-[#0f1c33] text-sm text-gray-300 placeholder-gray-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-[lab(71_-3.17_-35.65)]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col gap-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-[#0f1c33]/80 backdrop-blur-md border border-[#1f2a44] rounded-2xl p-5 shadow-md hover:shadow-lg transition"
          >
            <Link href={`/listado/${post.id}`}>
              <div className="cursor-pointer">
                <h2 className="text-lg font-semibold text-gray-200 mb-2">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                  {post.body}
                </p>
              </div>
            </Link>
            <div className="flex justify-end gap-3 mt-5">
              <Link
                href={`/listado/${post.id}/editar`}
                className="px-3 py-1.5 text-xs rounded-full bg-[lab(71_-3.17_-35.65)]/10 text-[lab(71_-3.17_-35.65)] border border-[lab(71_-3.17_-35.65)]/20 hover:bg-[lab(71_-3.17_-35.65)]/20 transition"
              >
                ✏️ Editar
              </Link>

              <button
                onClick={() => deletePost(post.id)}
                className="px-3 py-1.5 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div ref={loadMoreRef} className="h-2" />

      {!hasNextPage && (
        <p className="text-center mt-6 text-gray-500 text-sm">
          No hay más resultados
        </p>
      )}

      <Link
        href="/nuevo"
        className="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center rounded-full bg-[lab(71_-3.17_-35.65)] text-black text-2xl shadow-lg hover:scale-105 transition"
      >
        +
      </Link>
    </div>
  );
}
