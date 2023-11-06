"use client";

import { Outlet, NavLink } from "react-router-dom";
import styles from "./Layout.module.css";
import { useState } from "react";

const Layout = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <div className={styles.logo}>SF</div>
        <div
          className={styles.hamburger}
          onClick={() => setShowNavBar(!showNavBar)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          className={
            styles.navMenu + (showNavBar ? ` ${styles.navMenuOpen}` : "")
          }
        >
          <NavLink
            to="/TicTacToe"
            className={({ isActive }) =>
              isActive ? styles.activeButton : styles.navButton
            }
          >
            Tic Tac Toe
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.activeButton : styles.navButton
            }
            to="/FilterableProductTable"
          >
            Filterable Product Table
          </NavLink>
          <NavLink
            to="/ToDoList"
            className={({ isActive }) =>
              isActive ? styles.activeButton : styles.navButton
            }
          >
            To Do List
          </NavLink>
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
        {/* renders the current route selected */}
      </div>
    </div>
  );
};

export default Layout;
