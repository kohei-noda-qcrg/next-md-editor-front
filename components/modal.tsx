import { useRouter } from "next/router";
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import ReactModal from "react-modal";

const Modal = () => {
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
  const [fileName, setFileName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
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
  const handleFileName = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };
  const openPostPage = () => {
    if (fileName) {
      router.push(`/post/${fileName}`);
    }
  };
  const handleSubmitNewFile = (e: FormEvent<HTMLFormElement> | undefined) => {
    if (e) {
      e.preventDefault();
      openPostPage();
    }
  };
  const handleClickNewFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openPostPage();
  };
  return (
    <>
      <div className="p-2">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleOpen}
        >
          Create a new Markdown file
        </button>
      </div>
      <div className="pt-2 flex space-x-2 items-center justify-center">
        <ReactModal
          isOpen={isOpen}
          onRequestClose={handleClose}
          onAfterOpen={handleFocusInput}
          style={customStyles}
        >
          <form onSubmit={handleSubmitNewFile}>
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
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => handleClickNewFile(e)}
            >
              Create
            </button>
          </div>
        </ReactModal>
      </div>
    </>
  );
};

export default Modal;
