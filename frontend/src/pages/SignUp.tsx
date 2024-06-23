import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ChangeEvent, FormEvent } from "react";

import { useState } from "react";
import axios from "axios";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {name, email, password, passwordConfirmation};

    axios.post("http://localhost:3000/auth/users/register", JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      console.log(response.data)

    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Card className="w-[600px] m-auto">
        <CardHeader>
          <CardTitle className="text-3xl mb-2">Formulário de Registro</CardTitle>
          <CardDescription>
            Faça login no nosso sistema para ter acesso a todas as nossas
            vantagens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome: </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Digite o seu nome completo"
                  onChange={(e:ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
                  onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
                  onChange={(e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="passwordConfirmation">Confirme a sua senha: </Label>
                <Input
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  placeholder="***************"
                  onChange={(e:ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Button type="submit">Registrar</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
