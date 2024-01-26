import "./App.css";
import { Suspense, useEffect, useState } from "react";
import { usePosts } from "@/utils/usePosts";
import Post from "@/components/Post";

function App() {
  const [post, setPost] = useState("");
  const [lazyInfo, setLazyInfo] = useState<JSX.Element>();
  const { grabPosts, posts, handleAddPost, handleDelete } = usePosts({
    post,
    setPost,
  });

  useEffect(() => {
    setLazyInfo(() => <div>Default</div>);
  }, []);

  useEffect(() => {
    grabPosts();
  }, [grabPosts]);

  const handleClick = () => {
    import("@/components/Add").then((module) => {
      setLazyInfo(module.default);
    });
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

      <button
        onClick={handleClick}
        className="bg-yellow-400 p-4 text-black rounded"
      >
        Add Complex Component
      </button>
      <Suspense>{lazyInfo ? lazyInfo : null}</Suspense>
    </div>
  );
}

export default App;
