import Link from "next/link";
import type { GetServerSideProps } from "next";
import fs from "fs";
import path from "path";


type Props = {
  posts: string[];
};

const Posts = (props: Props) => {
  return <>
      {props.posts.map((post) => {
      return (
        <div
          key={post}
          className="flex flex-col justify-center h-24 ml-3"
        >
          <Link href={`/post/${post}`}>
            <a>{post}</a>
          </Link>
        </div>
      );
    })}
  </>
};

export default Posts;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = fs.readdirSync(path.join("posts"), "utf-8");
  const posts = res.map((post) => {
    const slug = post.replace(/\.md$/, "");
    console.log(slug);
    return slug;
  });
  console.log("posts", posts);
  return {
    props: { posts },
  };
};
