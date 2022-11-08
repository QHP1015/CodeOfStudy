import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import { GoldOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, useParams, useMatch } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import jwtDecode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { userSlice } from "../../redux/user/slice";
import { languageSlice } from "../../redux/language/slice";

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}

export const Header: React.FC = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const match = useMatch('');
  // const params = useParams();

  // console.log('loaction:',location);
  // console.log('match:',match);
  // console.log('params:',params);

  const language = useSelector(state => state.language.language);
  const languageList = useSelector(state => state.language.languageList);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const jwt = useSelector(state => state.user.token);
  const [username, setUsername] = useState<string>("");

  const shoppingCartItems = useSelector(state => state.shoppingCart.items);
  const shoppingCartLoading = useSelector(state => state.shoppingCart.loading);

  useEffect(() => {
    if (jwt !== null) {
      const token = jwtDecode<JwtPayload>(jwt);
      setUsername(token.username);
    }
  }, [jwt]);

  const menuClickHandler = e=> {
    if (e.key === "new") {
      dispatch(languageSlice.actions.addLanguage({ name: "新语言", code: "new_lang" }));
    } else {
      dispatch(languageSlice.actions.changeLanguage(e.key));
    }
  };

  const onLogout = () => {
    dispatch(userSlice.actions.logOut());
    navigate("/");
  };

  console.log(language);
  
  return (
    <div className={styles["app-header"]}>
      {/* top-header */}
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map(l => {
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                })}
                <MenuItem key={"new"}>{t("header.add_new_language")}</MenuItem>
              </Menu>
            }
            icon={<GoldOutlined />}
          >
            {language === "zh" ? "中文" : "English"}
          </Dropdown.Button>
          {jwt ? (
            <Button.Group className={styles["button-group"]}>
              <span>
                {t("header.welcome")}
                <Typography.Text strong>{username}</Typography.Text>
              </span>
              <Button loading={shoppingCartLoading} onClick={() => navigate("/shoppingCart")}>
                {t("header.shoppingCart")}({shoppingCartItems.length})
              </Button>
              <Button onClick={onLogout}>{t("header.signOut")}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => navigate("/register")}>{t("header.register")}</Button>
              <Button onClick={() => navigate("/signIn")}>{t("header.signin")}</Button>
            </Button.Group>
          )}
        </div>
      </div>
      <Layout.Header className={styles["main-header"]}>
        <span
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt='' className={styles["App-logo"]} />
          <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
          </Typography.Title>
        </span>
        <Input.Search
          placeholder='请输入旅游目的地、主题或关键字'
          className={styles["search-input"]}
          onSearch={keyword => {
            navigate("/search/" + keyword);
          }}
        ></Input.Search>
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles["main-menu"]}>
        <Menu.Item key='1'>{t("header.home_page")}</Menu.Item>
        <Menu.Item key='2'>{t("header.weekend")}</Menu.Item>
        <Menu.Item key='3'>{t("header.group")}</Menu.Item>
        <Menu.Item key='4'>{t("header.backpack")}</Menu.Item>
        <Menu.Item key='5'>{t("header.private")}</Menu.Item>
        <Menu.Item key='6'>{t("header.cruise")}</Menu.Item>
        <Menu.Item key='7'>{t("header.hotel")}</Menu.Item>
        <Menu.Item key='8'>{t("header.local")}</Menu.Item>
        <Menu.Item key='9'>{t("header.theme")}</Menu.Item>
        <Menu.Item key='10'>{t("header.custom")}</Menu.Item>
        <Menu.Item key='11'>{t("header.study")}</Menu.Item>
        <Menu.Item key='12'>{t("header.visa")}</Menu.Item>
        <Menu.Item key='13'>{t("header.enterprise")}</Menu.Item>
        <Menu.Item key='14'>{t("header.high_end")}</Menu.Item>
        <Menu.Item key='15'>{t("header.outdoor")}</Menu.Item>
        <Menu.Item key='16'>{t("header.insurance")}</Menu.Item>
      </Menu>
    </div>
  );
};
