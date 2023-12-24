// import { useMediaQuery } from "react-responsive";
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
  return (
    <>
      {open && (
        <>
          <button
            onClick={handleClose}
            className="z-[100] bg-black/70 fixed -translate-y-[50%] -translate-x-[50%] top-[50%] left-[50%] w-screen h-screen"
          />
          <div
            className={`z-[100] rounded-lg overflow-hidden ${
              showDowndrop
                ? "w-[17rem] p-2 top-[13rem]"
                : `w-[17rem] sm:w-[20rem] p-4 md:w-[33rem] md:p-6 top-[50%]`
            }  fixed bg-white dark:bg-secondary 
            -translate-y-[50%] -translate-x-[50%] left-[50%] rounded-lg max-h-[27rem] h-auto md:max-h-[33rem] overflow-auto`}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
}
