import { ButtonHTMLAttributes } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...rest }: IButtonProps) => {
  return (
    <ShadcnButton className={className} {...rest}>
      {children}
    </ShadcnButton>
  );
};

export default Button;
