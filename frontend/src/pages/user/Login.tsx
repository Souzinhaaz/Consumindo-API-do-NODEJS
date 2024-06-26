import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useState } from "react";
import axios from "axios";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [button, setButton] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const response = await axios.post("http://localhost:3000/auth/login", 
        JSON.stringify(user), {
          headers: {
            "Content-Type": "application/json",
          },
      })
      const data = await response.data;

      btnLoad();
      localStorage.setItem("token", data.token)
      localStorage.setItem("message", data.msg)
      navigate("/posts")
    } catch (err) {
      console.error(err);
    }
  };

  const btnLoad = () => {
    setButton(true);
    setTimeout(() => {
      setButton(false);
    }, 2000)
  }

  return (
    <div className="flex items-center justify-center mt-10 flex-col px-4">
      <div className="w-full">
        <Breadcrumb className="pb-2 max-w-2xl m-auto">
          <BreadcrumbList className="flex items-center">
            <BreadcrumbItem>
              <Link className="text-xl" to="/">
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link className="text-xl" to="/login">
                Login
              </Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="max-w-2xl m-auto">
          <CardHeader>
            <CardTitle className="text-3xl mb-2">Formulário de Login</CardTitle>
            <CardDescription>
              Faça login para acessar nosso sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email: </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Digite o seu email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Senha: </Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="***************"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <p className="mb-2">
                    Não possui uma conta ainda?{" "}
                    <Link
                      to="/register"
                      className="text-blue-900 underline underline-offset-4"
                    >
                      Crie uma conta.
                    </Link>
                  </p>
                  {button ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Carregando
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-900 text-base">Entrar</Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
