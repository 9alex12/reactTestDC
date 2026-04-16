'use client';

import { useRouter } from 'next/navigation';
import { useCreatePost } from '@/hooks/useCreatePost';
import PostForm from '@/components/Posts';

export default function NuevoPostPage() {
  const router = useRouter();
  const { createPost } = useCreatePost();

  const handleCreate = async (values: {
    title: string;
    body: string;
  }) => {
    await createPost(values);
    router.push('/listado');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b1a] to-[#0a162b] text-white px-4 py-6 flex justify-center">
      <div className="w-full max-w-3xl bg-[#0f1c33]/80 backdrop-blur-md border border-[#1f2a44] rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
        </div>
        <PostForm
          onSubmit={handleCreate}
          onCancel={() => router.back()}
        />
      </div>
    </div>
  );
}