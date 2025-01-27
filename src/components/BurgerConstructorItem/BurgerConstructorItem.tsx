import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { DndType } from "../../utils/dnd.enum";

import styles from "./BurgerConstructorItem.module.css";

type Props = {
  index?: number;
  moveIngredient?: (dragIndex: number, hoverIndex: number) => void;
  onRemove?: () => void;
  type?: "top" | "bottom" | undefined;
  isLocked?: boolean;
  title: string;
  price: number;
  thumbnail: string;
};

function BurgerConstructorItem(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DndType.Ingredient,
    item: { index: props.index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));

  const [{ isOver }, drop] = useDrop({
    accept: DndType.Ingredient,
    hover: (item: Props, monitor) => {
      calculateNewElementPosition(item, monitor);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const calculateNewElementPosition = (item: Props, monitor: any) => {
    if (!ref.current) {
      return;
    }

    if (item.index !== undefined) {
      const dragIndex = item.index;
      const dropIndex = props.index;

      if (dropIndex === dragIndex) {
        return;
      }

      props.moveIngredient!(dragIndex, dropIndex!);
      item.index = dropIndex!;
    }
  };

  drag(drop(ref));

  return (
    <>
      {props.isLocked ? (
        <div className={`${styles.full}`}>
          <ConstructorElement
            type={props.type}
            isLocked={true}
            text={props.title}
            price={props.price}
            thumbnail={props.thumbnail}
          />
        </div>
      ) : (
        <div ref={ref} className={styles.grid}>
          <DragIcon type="primary" />
          <ConstructorElement
            type={props.type}
            text={props.title}
            price={props.price}
            thumbnail={props.thumbnail}
            handleClose={props.onRemove}
          />
        </div>
      )}
    </>
  );
}

export default BurgerConstructorItem;
