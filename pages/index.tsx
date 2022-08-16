import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import type { NextPage } from "next";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import fs from "fs";
import path from "path";

type Props = {
  posts: string[];
};
const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});
const Home: NextPage<Props> = (props) => {
  const [value, setValue] = useState(
    props.posts[0] ? props.posts[0] : "## Hello World"
  );
  const handleChange = (value: string) => {
    setValue(value);
  };
  const handleSave = () => {
    console.log(value);
  };
  console.log(props.posts);
  return (
    <div className="h-screen">
      <MarkdownEditor
        className="h-4/5"
        visible={true}
        value={value}
        onChange={(value, _) => handleChange(value)}
        previewProps={{ rehypePlugins: [[rehypeSanitize]] }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const res = fs.readdirSync(path.join("posts"));

  const posts = res.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const md = fs.readFileSync(path.join("posts", file), "utf8");
    console.log(md);
    return md;
  });
  return {
    props: { posts },
  };
}
