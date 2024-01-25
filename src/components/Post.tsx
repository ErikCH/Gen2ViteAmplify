import { Schema } from "../../amplify/data/resource";

export default function Post({
  post,
  handleDelete,
}: {
  post: Schema["Todo"];
  handleDelete: (id: string) => void;
}) {
  return (
    <article
      key={post.id}
      className="border-solid p-4 border-blue-500 border-4 rounded min-w-72"
    >
      <div>{post.content}</div>
      <button
        className="bg-red-600 text-xs p-1 rounded text-white mt-4"
        onClick={() => handleDelete(post.id)}
      >
        Delete Me
      </button>
    </article>
  );
}
