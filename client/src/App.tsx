import { BrowserRouter,Route,Routes } from "react-router-dom"
import Signup from "./pages/signup"
import Signin from "./pages/signin"
import { Toaster } from "react-hot-toast"
import Blogs from "./pages/blogs"
import OneBlog from "./pages/oneBlog"
import { RecoilRoot } from "recoil"
function App() {

  return (
    <RecoilRoot>

<BrowserRouter>
    <Toaster position="top-right"/>

   <Routes>
    
    <Route path="/signup" element={<Signup></Signup>} ></Route>
    <Route path="/signin" element={<Signin></Signin>} ></Route>
    <Route path="/blogs" element={<Blogs></Blogs>} ></Route>
    <Route path="/blog" element={<OneBlog></OneBlog>} ></Route>
     
    </Routes> 
    </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
