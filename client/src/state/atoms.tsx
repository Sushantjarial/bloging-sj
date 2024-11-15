import { atom } from "recoil";


export const UserName = atom({
    key: "UserName",
    default: ""
});
interface Blog{
    id:string,
    title:string,
    content:string,
    author:{
        firstName:string,
        lastName:string
    }
}

export const BlogState =atom<Blog[]>({
    key: "BlogState",
    default:[]
})