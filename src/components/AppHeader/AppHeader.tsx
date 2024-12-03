import ItemHeader from "../ItemHeader/ItemHeader";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

function AppHeader() {
  return (
    <header className={`pt-4 pb-4 ${styles.navigation}`}>
      <nav className={styles.grid}>
        <div className={styles.itemGroup}>
          <ItemHeader title="Конструктор" isActive={true}>
            <BurgerIcon type="primary" />
          </ItemHeader>
          <ItemHeader title="Лента заказов" isActive={false}>
            <ListIcon type="secondary" />
          </ItemHeader>
        </div>
        <Logo />
        <ItemHeader title="Личный кабинет" isActive={false}>
          <ProfileIcon type="secondary" />
        </ItemHeader>
      </nav>
    </header>
  );
}

export default AppHeader;
