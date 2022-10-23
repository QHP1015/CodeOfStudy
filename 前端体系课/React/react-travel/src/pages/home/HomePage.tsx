import React, { useEffect } from "react";
import { Header, Footer, SideMenu, Carousel, ProductCollection } from "../../components";
import { Row, Col, Typography, Spin } from "antd";
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import styles from "./HomePage.module.css";
import { useTranslation, withTranslation, WithTranslation } from "react-i18next";
import axios from "axios";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsAction";
import { MainLayout } from "../../layouts/mainLayout/MainLayout";
import { useDispatch } from "react-redux";
import { giveMeData, recommendProductsSlice } from "../../redux/recommendProducts/slice";
import { useSelector } from "../../redux/hooks";


export const HomePage: React.FC = props => {
  const productList = useSelector(state => state.recommendProducts.productList);
  const loading = useSelector(state => state.recommendProducts.loading);
  const error = useSelector(state => state.recommendProducts.error);
  const { t } = useTranslation();

  const dispatch = useDispatch;

  useEffect(() => {
    dispatch(giveMeData());
  }, []);

  if (loading) {
    return (
      <Spin
        size='large'
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>网站出错：{error}</div>;
  }

  return (
    <MainLayout>
      <Row style={{ marginTop: 20 }}>
        <Col span={6}>
          <SideMenu />
        </Col>
        <Col span={18}>
          <Carousel />
        </Col>
      </Row>
      <ProductCollection
        title={
          <Typography.Title level={3} type='warning'>
            {t("home_page.hot_recommended")}
          </Typography.Title>
        }
        sideImage={sideImage}
        products={productList[0].touristRoutes}
      />
      <ProductCollection
        title={
          <Typography.Title level={3} type='danger'>
            {t("home_page.new_arrival")}
          </Typography.Title>
        }
        sideImage={sideImage2}
        products={productList[1].touristRoutes}
      />
      <ProductCollection
        title={
          <Typography.Title level={3} type='success'>
            {t("home_page.domestic_travel")}
          </Typography.Title>
        }
        sideImage={sideImage3}
        products={productList[2].touristRoutes}
      />
    </MainLayout>
  );
};
