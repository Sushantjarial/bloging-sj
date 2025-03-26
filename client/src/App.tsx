import { BrowserRouter,Route,Routes } from "react-router-dom"
import Signup from "./pages/signup"
import Signin from "./pages/signin"
import { Toaster } from "react-hot-toast"
import Blogs from "./pages/blogs"
import OneBlog from "./pages/oneBlog"
import { RecoilRoot } from "recoil"
import Write from "./pages/write"
import MyBlogs from "./pages/myBlogs"
import UpdateProfile from "./pages/updateProfile"
import AuthorBlogs from "./pages/authorBlogs"
function App() {

  return (
    

<BrowserRouter>
<RecoilRoot>
    <Toaster position="top-right"/>

   <Routes>
    
    <Route path="/signup" element={<Signup></Signup>} ></Route>
    <Route path="/signin" element={<Signin></Signin>} ></Route>
    <Route path="/" element={<Blogs></Blogs>} ></Route>
    <Route path="/blog" element={<OneBlog></OneBlog>} ></Route>
    <Route path="/write" element={<Write></Write>} ></Route>
    <Route path="/myblogs" element={<MyBlogs></MyBlogs>}></Route>
    <Route path="/updateprofile" element={<UpdateProfile></UpdateProfile>}></Route>
    <Route path="/author/:id" element={<AuthorBlogs></AuthorBlogs>}></Route>
    </Routes> 
    </RecoilRoot>

    </BrowserRouter>
  )
}

export default App
