export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
};

if (!ENV.API_URL) {
  throw new Error("API_URL no está definida");
}