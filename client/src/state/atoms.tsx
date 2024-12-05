import { atom } from "recoil";


export const UserName = atom({
    key: "UserName",
    default: ""
});
interface Blog{
    id:string,
    title:string,
    content:string,
    createdAt:string,
    author:{
        firstName:string,
        lastName:string,
        id:string
    }
}

export const BlogState =atom<Blog[]>({
    key: "BlogState",
    default: []
})