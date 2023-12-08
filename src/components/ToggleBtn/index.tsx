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
      className="rounded-full cursor-pointer bg-primary p-1 w-12"
    >
      <div
        className={`rounded-full bg-white p-2 w-[20px] h-[20px] transition ease-in-out duration-[0.4s]
      ${theme === "dark" ? "translate-x-5" : "-translate-x-0"}`}
      ></div>
    </button>
  );
}
