import Link from "next/link";

interface Props {
  posts: string[];
}

const Posts = ({ posts }: Props) => {
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
