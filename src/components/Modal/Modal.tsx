import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";

type Props = {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

enum Key {
  Esc = "Escape",
}

type EventKey = {
  key: string;
};

enum BrowserActions {
  Keydown = "keydown",
}

const MODAL_OVERLAY_ID = "modal-overlay";

function Modal(props: Props) {
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const closeOnEsc = (event: EventKey) => {
      if (event.key === Key.Esc) {
        props.onClick();
      }
    };
    window.addEventListener(BrowserActions.Keydown, closeOnEsc);

    return () => {
      window.removeEventListener(BrowserActions.Keydown, closeOnEsc);
    };
  }, []);

  useEffect(() => {
    const modalOverlay = document.getElementById(MODAL_OVERLAY_ID);
    setPortal(modalOverlay);

    return () => {
      setPortal(null);
    };
  }, [props.isOpen]);

  return (
    <>
      {props.isOpen && (
        <>
          <ModalOverlay onClick={props.onClick} />
          {portal &&
            createPortal(
              <>
                <div className={styles.header}>
                  <p className="text text_type_main-large">{props.title}</p>
                  <CloseIcon
                    type="primary"
                    onClick={() => props.onClick()}
                    className={styles.closeButton}
                  />
                </div>

                <div>{props.children}</div>
              </>,
              portal
            )}
        </>
      )}
    </>
  );
}

export default Modal;
