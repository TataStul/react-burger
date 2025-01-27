import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ItemHeader from "../ItemHeader/ItemHeader";

import { Routes as RouteName } from "../../utils/routes";

import styles from "./AppHeader.module.css";

function AppHeader() {
  const location = useLocation();

  const [activeTabMain, setActiveTabMain] = useState(false);
  const [activeTabProfile, setActiveTabProfile] = useState(false);

  useEffect(() => {
    if (location.pathname === RouteName.Main) {
      setActiveTabMain(true);
    }
    if (location.pathname === RouteName.Profile) {
      setActiveTabProfile(true);
    }
  }, [location]);

  return (
    <header className={`pt-4 pb-4 ${styles.navigation}`}>
      <nav className={styles.grid}>
        <div className={styles.itemGroup}>
          <NavLink to={RouteName.Main} className={`${styles.link}`}>
            <ItemHeader title="Конструктор" isActive={activeTabMain}>
              <BurgerIcon type="primary" />
            </ItemHeader>
          </NavLink>
          <ItemHeader title="Лента заказов" isActive={false}>
            <ListIcon type="secondary" />
          </ItemHeader>
        </div>
        <Logo />
        <NavLink to={RouteName.Profile} className={`${styles.link}`}>
          <ItemHeader title="Личный кабинет" isActive={activeTabProfile}>
            <ProfileIcon type="secondary" />
          </ItemHeader>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
