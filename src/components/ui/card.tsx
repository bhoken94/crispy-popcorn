import { CardBody, CardDescription, CardFooter, CardRoot, CardTitle } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CardProps {
  childrenFooter?: ReactNode;
  title: string;
  description?: string;
  variant: "outline" | "elevated" | "subtle";
  children: ReactNode;
}

const Card = (props: CardProps) => {
  const { childrenFooter, title, description, variant, children } = props;

  return (
    <CardRoot variant={variant} key={variant}>
      <CardBody p="3" gap="2">
        <CardDescription>{description}</CardDescription>
        {children}
        <CardTitle mb="2">{title}</CardTitle>
      </CardBody>
      {childrenFooter && <CardFooter justifyContent="flex-end">{childrenFooter}</CardFooter>}
    </CardRoot>
  );
};

export default Card;
