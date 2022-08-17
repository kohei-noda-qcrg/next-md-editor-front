import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

type Props = {
  posts: string[];
};

const Posts = (props: Props) => {
  return props.posts.map((post) => {
    return (
      <div
        key={post}
        className="flex flex-col items-center justify-center h-24"
      >
        <Link href={`/post/${post}`}>
          <a>{post}</a>
        </Link>
      </div>
    );
  });
};

export default Posts;
