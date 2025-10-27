import { useState } from "react";
import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/auth";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signIn } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <img
            src={logoImg}
            alt="minha-carteira"
            className="mx-auto h-16 w-16"
          />
          <h2 className="mt-4 text-3xl font-bold text-foreground">
            Minha Carteira
          </h2>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            signIn(email, password);
          }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground">Entrar</h3>
          </div>
          <div className="space-y-4">
            <Input
              type="email"
              required
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              required
              placeholder="palavra-passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Acessar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
