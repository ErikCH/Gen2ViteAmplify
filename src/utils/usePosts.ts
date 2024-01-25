import { generateClient } from "aws-amplify/api";
import { FormEvent, useState, useCallback } from "react";
import { Schema } from "../../amplify/data/resource";

export function usePosts() {
  const client = generateClient<Schema>();
  const [posts, setPosts] = useState<Schema["Todo"][] | null>(null);
  const [post, setPost] = useState("");
  const grabPosts = useCallback(async () => {
    const { data: posts } = await client.models.Todo.list();

    setPosts(posts);
  }, [client.models.Todo]);

  const handleAddPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!post) return;
    const { data } = await client.models.Todo.create({
      content: post,
    });
    console.log("data", data);
    grabPosts();
    setPost("");
  };

  const handleDelete = async (id: string) => {
    const { data } = await client.models.Todo.delete({
      id,
    });
    console.log("data", data);
    grabPosts();
  };

  return {
    handleAddPost,
    handleDelete,
    posts,
    grabPosts,
  };
}
