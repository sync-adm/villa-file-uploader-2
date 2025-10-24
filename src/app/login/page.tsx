"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import DecorationPic from "./decoration.png";
import { login } from "@/actions/login";
import { useActionState } from "react";
import { Loader2Icon } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, {});

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form action={formAction} className="p-6 md:p-8">
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                    <p className="text-muted-foreground text-balance">
                      Faça login na sua conta
                    </p>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Senha</FieldLabel>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </Field>

                  {state?.error && (
                    <FieldError
                      className="text-center"
                      errors={state.error.split("\n").map((err) => ({
                        message: err,
                      }))}
                    />
                  )}

                  <Field>
                    <Button type="submit" disabled={pending}>
                      {pending && (
                        <Loader2Icon className="size-4 animate-spin" />
                      )}
                      Entrar
                    </Button>
                  </Field>

                  {/* <FieldDescription className="text-center">
                    Ainda não tem uma conta? <a href="/signup">Cadastre-se</a>
                  </FieldDescription> */}
                </FieldGroup>
              </form>
              <div className="bg-muted relative hidden md:block">
                <Image
                  src={DecorationPic}
                  alt="Imagem decorativa"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            Ao clicar em continuar, você concorda com nossos{" "}
            <Link href="/terms">Termos de Serviço</Link> e{" "}
            <Link href="/privacy">Política de Privacidade</Link>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
