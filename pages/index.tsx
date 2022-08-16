import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import type { NextPage } from "next";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});
const Home: NextPage = () => {
  const [value, setValue] = useState(
    `**Hello world!!!** <IFRAME SRC=\"javascript:javascript:window.alert('hello');;\"></IFRAME><script>window.alert('hello');</script>`
  );
  const handleChange = (value: string) => {
    setValue(value);
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
    </div>
  );
};

export default Home;
