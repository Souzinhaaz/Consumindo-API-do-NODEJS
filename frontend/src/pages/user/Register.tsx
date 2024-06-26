import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Loader2 } from "lucide-react";

import { useState } from "react";
import axios from "axios";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [button, setButton] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    const user = { name, email, password, passwordConfirmation };

    axios
      .post("http://localhost:3000/auth/register", JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        btnLoad();
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.msg) {
          setErrors([error.response.data.msg])
          setTimeout(() => {
            setErrors([]);
          }, 3000)
          
        } else {
          setErrors(["Ocorreu um erro desconhecido. Tente novamente mais tarde."])
        }
      });
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
              <Link className="text-xl" to="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link className="text-xl" to="/register">Register</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="max-w-2xl m-auto">
          <CardHeader>
            <CardTitle className="text-3xl mb-2">
              Formulário de Registro
            </CardTitle>
            <CardDescription>
              Faça registro no nosso sistema para ter acesso a todas as nossas
              vantagens.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errors.length > 0 && (
              <div className="mb-4">
                {errors.map((error, index) => (
                  <p key={index} className="text-red-600">{error}</p>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Nome: </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Digite o seu nome completo"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                    required
                  />
                </div>

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
                  <Label htmlFor="passwordConfirmation">
                    Confirme a sua senha:{" "}
                  </Label>
                  <Input
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    placeholder="***************"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPasswordConfirmation(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <p className="mb-2">
                    Já possui uma conta?{" "}
                    <Link
                      to="/login"
                      className="text-blue-900 underline underline-offset-4"
                    >
                      Faça Login
                    </Link>
                  </p>
                  {button ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Carregando
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-900 text-base">Registrar</Button>
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
