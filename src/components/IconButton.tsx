import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleClick: () => void;
}
export default function IconButton({ children, handleClick }: Props) {
  return <button className="hover:text-primary" onClick={handleClick}>{children}</button>;
}
