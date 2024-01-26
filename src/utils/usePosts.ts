import { generateClient } from "aws-amplify/api";
import { FormEvent, useState, useCallback } from "react";
import { Schema } from "@/../amplify/data/resource";

export function usePosts({
  post,
  setPost,
}: {
  post: string;
  setPost: React.Dispatch<React.SetStateAction<string>>;
}) {
  const client = generateClient<Schema>();

  // use States
  const [posts, setPosts] = useState<Schema["Todo"][] | null>(null);

  // grab all posts
  const grabPosts = useCallback(async () => {
    const { data: posts } = await client.models.Todo.list();

    setPosts(posts);
  }, [client.models.Todo]);

  // add a post
  const handleAddPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!post) return;
    const { errors } = await client.models.Todo.create({
      content: post,
    });
    if (errors) {
      alert("error");
      console.log("error", errors);
    }
    grabPosts();
    setPost("");
  };

  // delete a post
  const handleDelete = async (id: string) => {
    const { errors } = await client.models.Todo.delete({
      id,
    });
    if (errors) {
      alert("errors");
      console.log("data", errors);
    }
    grabPosts();
  };

  return {
    handleAddPost,
    handleDelete,
    posts,
    grabPosts,
  };
}
