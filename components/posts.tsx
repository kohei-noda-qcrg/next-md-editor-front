import Link from "next/link";
import { IPosts } from "../types/posts";

const Posts = ({ posts }: IPosts) => {
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
