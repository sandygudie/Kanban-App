import { useMediaQuery } from "react-responsive";
interface Props {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
  showDowndrop?: boolean;
}

export default function Modal({
  children,
  open,
  handleClose,
  showDowndrop,
}: Props) {
  const isMobile = useMediaQuery({ query: "(min-width: 700px)" });

  return (
    <>
      {open && (
        <>
          <button
            onClick={handleClose}
            className="z-50 bg-black/70  fixed -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%] w-screen h-screen"
          />
          <div
            className={`z-50 rounded-lg overflow-hidden ${
              showDowndrop
                ? "w-[17rem] p-2 top-[13rem]"
                : `${!isMobile ? "w-[18rem] p-4" : "w-[28rem] p-6"} top-[50%]`
            }  fixed bg-white dark:bg-secondary 
            -translate-y-[50%] -translate-x-[50%] left-[50%] rounded-lg max-h-[24rem] h-auto md:max-h-[32rem] overflow-auto`}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
}
