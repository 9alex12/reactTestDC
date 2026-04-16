"use client";

import { useForm } from "react-hook-form";
import { PostFormProps, PostFormValues } from "./posts.types";
import { useCreatePost } from "@/hooks/useCreatePost";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/schemas/post.schema";

const PostForm = ({ defaultValues, onSubmit, onCancel }: PostFormProps) => {
  const { createPost } = useCreatePost();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      body: defaultValues?.body || "",
    },
  });

  const handleFormSubmit = async (values: PostFormValues) => {
    if (onSubmit) {
      onSubmit(values);
      return;
    }

    await createPost(values);
    reset();
  };

  return(
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className= "p-6 rounded-xl flex flex-col gap-6 min-h-[50vh]"
    >
      <h2 className="text-2xl font-semibold text-[lab(71_-3.17_-35.65)]">
        {defaultValues ? "Editar Post" : "Crear Post"}
      </h2>

      <div>
        <input
          {...register("title")}
          aria-label="title"
          placeholder="Título"
          className="w-full p-4 text-lg rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[lab(71_-3.17_-35.65)]"
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <textarea
          {...register("body")}
          aria-label="body"
          placeholder="Escribe el contenido del post..."
          className="w-full flex-1 p-4 text-base rounded-md bg-gray-700 text-white border border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-[lab(71_-3.17_-35.65)]"
        />

        {errors.body && (
          <p className="text-red-500 text-sm mt-2">{errors.body.message}</p>
        )}
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[lab(71_-3.17_-35.65)] text-black px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-500 rounded-md text-gray-300 hover:text-white transition"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
