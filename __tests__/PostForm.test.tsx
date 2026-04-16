import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostForm from "@/components/Posts";
import "@testing-library/jest-dom";

jest.mock("@/config/env", () => ({
  ENV: {
    API_URL: "https://tudominio.com/api",
  },
}));

describe("PostForm", () => {
  test("should show validation errors when empty", async () => {
  render(<PostForm onSubmit={jest.fn()} />);

  fireEvent.click(screen.getByText(/guardar/i));

  expect(
    await screen.findByText(/título/i)
  ).toBeInTheDocument();

  expect(
    await screen.findByText(/contenido/i)
  ).toBeInTheDocument();
});

  test("should submit form with valid data", async () => {
  const mockSubmit = jest.fn();

  render(<PostForm onSubmit={mockSubmit} />);

  fireEvent.change(screen.getByRole("textbox", { name: /title/i }), {
    target: { value: "Test title" },
  });

  fireEvent.change(screen.getByRole("textbox", { name: /body/i }), {
    target: { value: "Test body" },
  });

  fireEvent.click(screen.getByText(/guardar/i));

  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledWith({
      title: "Test title",
      body: "Test body",
    });
  });
});
});