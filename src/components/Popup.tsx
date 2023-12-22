import { useEffect, useRef } from "react";

interface Props {
  items: {
    title: string;
    handler: () => void;
  }[];
  style: any;
  handleOpenMenu: () => void;
}

function Popup({ items, style, handleOpenMenu }: Props) {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (domRef.current && !domRef.current.contains(e.target)) {
        handleOpenMenu();
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [handleOpenMenu]);

  return (
    <div
      ref={domRef}
      style={style}
      className="z-30 absolute rounded-md py-1 shadow-3xl dark:shadow-gray/20 shadow-gray/30 
      dark:bg-[#20212c] bg-offwhite text-white w-fit right-0 top-6"
    >
      <ul className="w-max">
        {items.map((list, i) => {
          return (
            <li
              key={i}
              onClick={list.handler}
              className={`dark:text-white text-gray hover:text-primary hover:dark:text-primary font-bold text-[0.8rem] py-2.5 px-5 
               cursor-pointer  ${
                 i < items.length - 1 && `border-b-[1px] border-gray/20 `
               }`}
            >
              {list.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Popup;
