import { MdLightMode } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";

interface Props {
  theme: string;
  updateThemehandler: (theme: string) => void;
}
export default function Index({ theme, updateThemehandler }: Props) {
  return (
    <button
      onClick={() => {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
          updateThemehandler("light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
          updateThemehandler("dark");
        }
      }}
    >
      {theme !== "dark" ? (
        <MdLightMode size={25} className="text-primary" />
      ) : (
        <BsMoonStarsFill size={20} className="text-primary" />
      )}
    </button>
  );
}
