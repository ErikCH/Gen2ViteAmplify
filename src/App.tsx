import { generateClient } from "aws-amplify/api";
import "./App.css";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Schema } from "../amplify/data/resource";
import Post from "./components/Post";

function App() {
  const client = generateClient<Schema>();
  const [posts, setPosts] = useState<Schema["Todo"][] | null>(null);
  const [post, setPost] = useState("");

  const grabPosts = useCallback(async () => {
    const { data: posts } = await client.models.Todo.list();

    setPosts(posts);
  }, [client.models.Todo]);

  useEffect(() => {
    grabPosts();
  }, [grabPosts]);

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

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-4xl text-blue-700">Posts Example</h1>
      <form onSubmit={handleAddPost} className="flex flex-col gap-2 ">
        <input
          type="text"
          placeholder="Enter Content In"
          className="border-solid border-2 rounded border-black p-2"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button className="p-4 bg-green-700 rounded text-white" type="submit">
          Add Post
        </button>
      </form>
      {posts?.length === 0
        ? null
        : posts?.map((post) => (
            <Post key={post.id} handleDelete={handleDelete} post={post}></Post>
          ))}
    </div>
  );
}

export default App;
