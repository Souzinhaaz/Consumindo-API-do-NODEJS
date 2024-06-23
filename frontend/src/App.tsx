import { Routes, Route } from "react-router-dom"
import { SignUp } from "./pages/SignUp"

export function App() {
  return (
   <Routes>
    <Route path="/login" element={<SignUp />} />
   </Routes>
  )
}
