import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useRef, useState } from "react";
import ReactModal from "react-modal";

const Modal: NextPage = () => {
  const customStyles = {
    content: {
      top: "10%",
      left: "50%",
      right: "50%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleFocusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement> | undefined) =>{
    if(e){
      e.preventDefault()
      router.push(`/post/${fileName}`)
    }
  }
  return (
    <>
      <div className="p-2">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleOpen}
        >
          Create a new markdown file
        </button>
      </div>
      <div className="pt-2 flex space-x-2 items-center justify-center">
        <ReactModal
          isOpen={isOpen}
          onRequestClose={handleClose}
          onAfterOpen={handleFocusInput}
          style={customStyles}
        >
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="Enter filename"
              value={fileName}
              onChange={handleFileName}
            />
          </form>
          <div className="pt-2 space-x-2 my-2">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClose}
            >
              Close
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link href={`/post/${fileName}`}>
                <a>Create a new Markdown file</a>
              </Link>
            </button>
          </div>
        </ReactModal>
      </div>
    </>
  );
};
export default Modal;
