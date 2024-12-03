import React from "react";
import styles from "./ModalOverlay.module.css";

type ModalOverlayProps = {
  onClick: () => void;
};

const MODAL_OVERLAY_ID = "modal-overlay";

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClick }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClick}>
      <div
        id={MODAL_OVERLAY_ID}
        className={`${styles.modalCard} pt-10 pb-15 pr-10 pl-10`}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default ModalOverlay;
