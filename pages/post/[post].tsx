import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import fs from "fs";
import path from "path";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  post: string;
};
const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});
const url = "http://localhost:3000/api/post/testmd";
const Post: NextPage<Props> = (props) => {
  const router = useRouter();
  const [value, setValue] = useState(
    props.post ? props.post : "## Hello World"
  );
  const handleChange = (value: string) => {
    setValue(value);
  };
  const handleSave = () => {
    fetch(url, {
      method: "POST",
      body: value,
    })
      .then((res) => {
        // alert(res.statusText);
        alert("Saved");
        console.log(res);
      })
      .catch((err) => {
        alert("Could not saved.");
        console.log(err);
      });
  };
  return (
    <div className="h-screen">
      <MarkdownEditor
        className="h-4/5"
        visible={true}
        value={value}
        onChange={(value, _) => handleChange(value)}
        previewProps={{ rehypePlugins: [[rehypeSanitize]] }}
      />
      <div className="pt-2">
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-1">
          <Link href="/">Back to Home</Link>
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = fs
    .readFileSync(path.join("posts", context.params?.post + ".md"), "utf-8")
    .toString();
  const props: Props = {
    post: res,
  };

  return {
    props,
  };
};
