import useConnectWalletNotificationStore from "@/stores/useConnectWalletNotificationStore";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import QuestionIcon from "@/assets/images/underwarter/question.svg";
import WalletButton from "../WalletButton";
export default function ConnectWalletNotification() {
  const { isOpen, size, closeModal } = useConnectWalletNotificationStore();
  return (
    <Modal
      className="bg-[#080808] text-white border border-[#353535]"
      isOpen={isOpen}
      hideCloseButton
      onClose={closeModal}
      placement="center"
      size={size}
    >
      <ModalContent className="py-10">
        <ModalBody className="flex flex-col gap-9">
          <img src={QuestionIcon} alt="question" className="h-[157px]" />
          <p className="text-center">
            You need to connect your wallet before completing this task
          </p>
          <WalletButton />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
