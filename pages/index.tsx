import type { GetServerSideProps, NextPage } from "next";
import Modal from "../components/modal";
import Posts from "../components/posts";
import fs from "fs";
import path from "path";
import { PostsInterface } from "../types/posts";


const Home: NextPage<PostsInterface> = ({ posts }) => {
  return (
    <>
      <Posts posts={posts} />
      <Modal />
    </>
  );
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
