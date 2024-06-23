import { Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Header/Navbar";
import { Home } from "./pages/home/Home";
import { Posts } from "./pages/Blog/Posts";
import { Login } from "./pages/user/Login"
import { Register } from "./pages/user/Register"

export function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes> 
    </>
  )
}
