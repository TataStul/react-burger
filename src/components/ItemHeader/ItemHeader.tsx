import React from 'react';
import styles from './ItemHeader.module.css'

type Props = {
  title: string;
  children?: React.ReactNode;
  isActive?: boolean;
}

function ItemHeader(props: Props) {
  return (
    <div className={`p-2 ${styles.itemHeader}`}>
      {props.children}
      <p className={`ml-2 ${props.isActive ? '' : 'text text_type_main-default text_color_inactive'}`}>{props.title}</p>
    </div>
  )
}

export default ItemHeader;
