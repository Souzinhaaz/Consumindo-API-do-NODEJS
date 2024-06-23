import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"

export function Home() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Card className="p-10 max-w-4xl mx-auto">
        <h2 className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight first:mt-0">
          Seja bem vindo a página de Blog do NodeJS
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-3 border-b pb-3 text-xl">
          Nessa página iremos explorar ferramentas de desenvolvimetno do NodeJS, apresentando funcionalidades importantes como CRUD completo e sistema de administração.
        </p>
        <Link to="/register">
         <Button className="mt-5 py-6 px-10 bg-purple-600 hover:bg-purple-900 text-base">Cadastrar</Button>
        </Link>
      </Card>
    </div>
  )
}