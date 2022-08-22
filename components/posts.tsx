import Link from "next/link";
import { PostsInterface } from "../types/posts";

const Posts = ({ posts }: PostsInterface) => {
  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post} className="flex flex-col justify-center h-24 ml-3">
            <Link href={`/post/${post}`}>
              <a>{post}</a>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Posts;
