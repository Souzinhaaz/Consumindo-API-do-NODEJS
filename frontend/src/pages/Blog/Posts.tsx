import { Card } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { Message } from "../../components/layout/Message";

export function Posts() {

  const location = useLocation();

  let message = "";

  if (location.state) {
    message = location.state.msg;
  }

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