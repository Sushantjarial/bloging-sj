import axios from "axios";
import  { useRef, useState } from "react";
import { BACKEND_URL } from "../../../config";
import JoditEditor from 'jodit-react';
import toast from "react-hot-toast";

const WriteBlogCard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token") || ""
  const editor = useRef(null);
  const [isPublishing,setIsPublishing]=useState(false)
  const config = {
    height: 500,
    theme: 'dark',
    colors: {
      greyscale: ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
      palette: ['#1B4D3E', '#008F11', '#00FF41', '#2F4F4F', '#008080', '#2E8B57', '#3CB371', '#90EE90', '#98FB98', '#00FA9A']
    },
    buttons: [
      'source', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'superscript', 'subscript', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'video', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat', '|',
      'fullsize'
    ],
    buttonsMD: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', '|',
      'image', 'table', 'link', '|',
      'align', '|',
      'undo', 'redo', '|',
      'fullsize'
    ],
    buttonsSM: [
      'bold', 'italic', '|',          
      'ul', 'ol', '|',
      'image', 'link', '|',
      'undo', 'redo'
    ],
    style: {
      background: '#000',
    },
    uploader: {
      insertImageAsBase64URI: true
    },
    removeButtons: ['about'],
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    toolbarAdaptive: true,
    css: `
      .jodit-toolbar__box {
        background-color: #000 !important;
      }
      .jodit-toolbar-button {
        color: #fff !important;
      }
      .jodit-toolbar-button__icon {
        fill: #fff !important;
      }
      .jodit-toolbar-button:hover {
        background-color: #1f2937 !important;
      }
      .jodit-container {
        border-color: #22c55e !important;
      }
      .jodit-workplace {
        background-color: #111 !important;
        color: #fff !important;
      }
      .jodit-status-bar {
        background-color: #000 !important;
        border-color: #22c55e !important;
        color: #fff !important;
      }
      .jodit-ui-group_separated_true:not(:last-child):after {
        border-color: #22c55e !important;
      }
      .jodit-wysiwyg {
        color: #fff !important;
      }
      .jodit-toolbar-button__text {
        color: #fff !important;
      }
      .jodit-toolbar-content {
        color: #fff !important;
      }
      /* New styles for status bar elements */
      .jodit-status-bar > * {
        color: #fff !important;
      }
      .jodit-status-bar__item {
        color: #fff !important;
      }
      .jodit-status-bar__item-right {
        color: #fff !important;
      }
      .jodit-status-bar a {
        color: #22c55e !important;
      }
    `
  };

  const handleSubmit = async (e:any) => {
    if(!title || !content){
      toast.error("All fields are required")
      return;
    }
    e.preventDefault();
    if (isPublishing) {
      toast.error("Please wait before publishing again.");
      return;
    }
    setIsPublishing(true);
    setTimeout(() => setIsPublishing(false), 5000);
    try{
     await axios.post(
      `${BACKEND_URL}/api/v1/blog/create`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    toast.success("published");
  }
  catch(e:any){
    toast.error("cannot publish right now try again after some time")
  }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-black shadow-sm shadow-green-500 border border-green-500 rounded-lg p-8 w-full max-w-6xl sm:my-4">
        <h2 className="text-2xl font-semibold text-green-500 mb-4">New Blog Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-green-400 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className="w-full px-4 py-2 border bg-black text-green-400 border-green-500 rounded-lg focus:ring-2  placeholder-gray-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-green-400 mb-1"
            >
              Content
            </label>
         
          <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={newContent => setContent(newContent)}
          />
          </div>
          <button 
            disabled={isPublishing}
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPublishing ? 'PUBLISHING...' : 'PUBLISH'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteBlogCard;
