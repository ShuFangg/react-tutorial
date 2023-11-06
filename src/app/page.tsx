"use client";

import styles from "./page.module.css";
import { Route, HashRouter as Router, Routes } from "react-router-dom"; // To route to pages based on URL
import Layout from "@/pages/Layout/page";
import ToDoList from "@/pages/ToDoList/page";
import FilterableProductTable from "@/pages/FilterableProductTable/page";
import TicTacToe from "@/pages/TicTacToe/page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TicTacToe />} />
          <Route path="TicTacToe" element={<TicTacToe />} />
          <Route
            path="FilterableProductTable"
            element={<FilterableProductTable />}
          />
          <Route path="ToDoList" element={<ToDoList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
