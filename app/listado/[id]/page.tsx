import Link from "next/link";
import { notFound } from "next/navigation";
import PostImage from "@/components/PostImage";
import { ENV } from "@/config/env";

async function getPost(id: number) {
  const API_URL = `${ENV.API_URL}/posts`;
  console.log("API URL:", API_URL);
  const res = await fetch(`${API_URL}/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const postId = Number(id);

  if (isNaN(postId)) {
    return <p className="text-white p-4">ID inválido</p>;
  }

  const isApiPost = postId <= 100;

  if (!isApiPost) {
    const ClientPostDetail =
      (await import("@/components/ClientPostDetail")).default;

    return <ClientPostDetail id={postId} />;
  }

  const post = await getPost(postId);

  if (!post) return notFound();

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
        <p className="text-gray-400 leading-relaxed text-base">{post.body}</p>
      </div>
    </div>
  );
}
