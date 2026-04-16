import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePosts } from "@/hooks/usePosts";


jest.mock("@/config/env", () => ({
  ENV: {
    API_URL: "https://tudominio.com/api",
  },
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([{ id: 1, title: "Test post", body: "Test body" }]),
  })
) as jest.Mock;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  Wrapper.displayName = "QueryClientTestWrapper";

  return Wrapper;
};

test("should fetch posts successfully", async () => {
  const { result } = renderHook(() => usePosts(), {
    wrapper: createWrapper(),
  });

  await waitFor(() => {
    expect(result.current.data).toBeDefined();
  });
});