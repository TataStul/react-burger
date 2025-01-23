import styles from "./MacronutrientComp.module.css";

type Props = {
  name: string;
  value: number;
};

function MacronutrientComp(props: Props) {
  return (
    <div className={styles.grid}>
      <p className="text text_type_main-default text_color_inactive">
        {props.name}
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {props.value}
      </p>
    </div>
  );
}

export default MacronutrientComp;
