import { Card } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
import axios from "axios"
import { Message } from "../../components/layout/Message";
import { useEffect, useState } from "react";

export function Posts() {
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }
  
    axios.get("http://localhost:3000/users/", {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    })
    .then(() => {
      const storedMessage = localStorage.getItem("message") ?? "";
      setMessage(storedMessage)
    })
    .catch((err) => console.log(err))
  }, [])


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Message type="success" msg={message}/>
      <Card className="p-10 max-w-4xl mx-auto">
        <h2 className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight first:mt-0">
          Página de Posts
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-3 border-b pb-3 text-xl">
          Essa é a nossa sessão de posts dos usuários, queira adicionar um post a nossa página.
        </p>
        <Link to="/newpost">
         <Button className="mt-5 py-6 px-10 bg-purple-600 hover:bg-purple-900 text-base">Adicionar Post</Button>
        </Link>
      </Card>
    </div>
  )
}