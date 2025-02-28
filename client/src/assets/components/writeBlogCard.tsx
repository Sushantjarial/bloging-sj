import axios from "axios";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../../../config";
import JoditEditor from 'jodit-react';
import toast from "react-hot-toast";

const WriteBlogCard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token") || "";
  const editor = useRef(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const config = {
    height: 500,
    theme: 'dark',
    colors: {
      greyscale: ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
      palette: ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#052e16', '#86efac', '#4ade80', '#22c55e', '#16a34a']
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
        color: #22c55e !important;
      }
      .jodit-toolbar-button__icon {
        fill: #22c55e !important;
      }
      .jodit-toolbar-button:hover {
        background-color: #052e16 !important;
      }
      .jodit-container {
        border-color: #22c55e !important;
      }
      .jodit-workplace {
        background-color: #000 !important;
        color: #22c55e !important;
      }
      .jodit-status-bar {
        background-color: #000 !important;
        border-color: #22c55e !important;
        color: #22c55e !important;
      }
      .jodit-ui-group_separated_true:not(:last-child):after {
        border-color: #22c55e !important;
      }
      .jodit-wysiwyg {
        color: #22c55e !important;
      }
      .jodit-toolbar-button__text {
        color: #22c55e !important;
      }
      .jodit-toolbar-content {
        color: #22c55e !important;
      }
      .jodit-status-bar > * {
        color: #22c55e !important;
      }
      .jodit-status-bar__item {
        color: #22c55e !important;
      }
      .jodit-status-bar__item-right {
        color: #22c55e !important;
      }
      .jodit-status-bar a {
        color: #22c55e !important;
      }
      .jodit-popup {
        background-color: #000 !important;
        border-color: #22c55e !important;
      }
      .jodit-popup__content {
        background-color: #000 !important;
      }
      .jodit-toolbar-popup {
        background-color: #000 !important;
      }
      .jodit-toolbar-popup__content {
        background-color: #000 !important;
      }
      .jodit-dialog__header {
        background-color: #000 !important;
        border-color: #22c55e !important;
      }
      .jodit-dialog__content {
        background-color: #000 !important;
      }
      .jodit-dialog__footer {
        background-color: #000 !important;
        border-color: #22c55e !important;
      }
    `
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("All fields are required");
      return;
    }
    if (isPublishing) {
      toast.error("Please wait before publishing again.");
      return;
    }
    setIsPublishing(true);
    setTimeout(() => setIsPublishing(false), 5000);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/blog/create`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("Published");
    } catch (e: any) {
      toast.error("Cannot publish right now, try again after some time");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-black shadow-sm shadow-green-500 border border-green-500 rounded-lg p-8 w-full max-w-6xl my-4">
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
