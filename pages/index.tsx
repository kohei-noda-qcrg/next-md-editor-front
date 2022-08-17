import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import fs from "fs";
import path from "path";
import Post from "./post/[post]";
import Link from "next/link";

type Props = {
  posts: string[];
};

const Home: NextPage<Props> = (props) => {
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

export default Home;

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
