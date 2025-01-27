import React from "react";

import styles from "./ItemHeader.module.css";

type Props = {
  title: string;
  children?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

function ItemHeader(props: Props) {
  return (
    <div className={`p-2 ${styles.itemHeader}`} onClick={props.onClick}>
      {props.children}
      <div
        className={`flex items-center ${styles.link}`}
        role="button"
        onClick={props.onClick}
        tabIndex={0} // делает элемент доступным для клавиатуры
      >
        <p
          className={`ml-2 ${
            props.isActive
              ? "text text_type_main-small"
              : "text text_type_main-default text_color_inactive"
          }`}
        >
          {props.title}
        </p>
      </div>
    </div>
  );
}

export default ItemHeader;
