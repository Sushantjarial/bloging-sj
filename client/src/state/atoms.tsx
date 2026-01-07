import { atom } from "recoil";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    firstName: string;
    lastName: string;
    id: string;
  };
  authorId: string;
}

export const BlogState = atom<Blog[]>({
  key: "BlogState",
  default: [],
});
