import React, { ReactNode } from "react";
import styles from "./MainLayout.module.css";
import { Header, Footer } from "../../components";


export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {/* 页面内容 content */}
      <div className={styles["page-content"]}>{children}</div>
      <Footer />
    </>
  );
};
