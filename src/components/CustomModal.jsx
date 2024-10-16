import { Modal } from "react-native";
import Container from "./Container";

const CustomModal = ({ visible, onClose, children }) => {
  return (
    <Modal onRequestClose={onClose} visible={visible}>
      <Container alignV="center" bgColor="white">
        {children}
      </Container>
    </Modal>
  );
};

export default CustomModal;
