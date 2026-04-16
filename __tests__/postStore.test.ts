import { usePostsStore } from "@/store/posts.store";

describe("Posts Store", () => {
  beforeEach(() => {
    usePostsStore.setState({
      localPosts: [],
      deletedPostIds: [],
    });
  });

  test("should add a new post", () => {
    const { addPost } = usePostsStore.getState();

    addPost({
      id: 999,
      userId: 1,
      title: "Test",
      body: "Test body",
    });

    const { localPosts } = usePostsStore.getState();

    expect(localPosts).toHaveLength(1);
    expect(localPosts[0].title).toBe("Test");
  });

  test("should update a post", () => {
    usePostsStore.setState({
      localPosts: [
        { id: 1, userId: 1, title: "Old", body: "Old body" },
      ],
      deletedPostIds: [],
    });

    const { updatePost } = usePostsStore.getState();

    updatePost({
      id: 1,
      userId: 1,
      title: "Updated",
      body: "Updated body",
    });

    const { localPosts } = usePostsStore.getState();

    expect(localPosts[0].title).toBe("Updated");
  });

  test("should delete a post", () => {
    const { deletePost } = usePostsStore.getState();

    deletePost(1);

    const { deletedPostIds } = usePostsStore.getState();

    expect(deletedPostIds).toContain(1);
  });
});