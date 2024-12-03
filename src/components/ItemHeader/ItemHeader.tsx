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
    <div className={`p-2 ${styles.itemHeader}`}>
      {props.children}
      <a href="#" className={`flex items-center ${styles.link}`}>
        <p
          className={`ml-2 ${
            props.isActive
              ? ""
              : "text text_type_main-default text_color_inactive"
          }`}
        >
          {props.title}
        </p>
      </a>
    </div>
  );
}

export default ItemHeader;
