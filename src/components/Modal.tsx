import {
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

interface Props {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
  showDowndrop?: boolean;
}

export default function ModalPopup({
  children,
  open,
  handleClose,
  showDowndrop,
}: Props) {
  return (
    <Modal isCentered isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent className="!w-auto !rounded-full !bg-white !dark:bg-secondary">
        <div
          className={`rounded-lg  ${
            showDowndrop
              ? "w-[17rem] p-2 top-[13rem]"
              : `w-[17rem] sm:w-[20rem] p-4 md:w-[33rem] md:p-6 top-[50%]`
          }  bg-white dark:bg-secondary 
            rounded-lg max-h-[27rem] h-auto md:max-h-[35rem] overflow-auto md:overflow-hidden`}
        >
          {children}
        </div>
      </ModalContent>
    </Modal>
  );
}
