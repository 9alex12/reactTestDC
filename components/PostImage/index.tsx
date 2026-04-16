"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  id: number | string;
  alt: string;
  priority?: boolean;
}

export default function PostImage({ id, alt, priority }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const imageId = Number(id) % 1000;

  return (
    <div className="relative overflow-hidden rounded-lg">
      {loading && !error && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <span className="text-gray-400 text-sm">
            Cargando imagen...
          </span>
        </div>
      )}

      {error ? (
        <div className="w-full h-60 flex items-center justify-center bg-gray-700 text-gray-400">
          Imagen no disponible
        </div>
      ) : (
        <Image
          src={`https://picsum.photos/id/${imageId}/600/300`}
          alt={alt}
          width={600}
          height={300}
          priority={priority}
          className={`w-full h-60 object-cover transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      )}
    </div>
  );
}