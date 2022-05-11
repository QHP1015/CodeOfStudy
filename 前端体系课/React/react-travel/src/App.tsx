import React from 'react';
import styles from "./App.module.css"
import { Header, Footer ,SideMenu} from './components'
import { Row, Col } from 'antd';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      {/* 页面内容 */}
      <div className={styles['page-content']}>
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <div><SideMenu/></div>
          </Col>
          <Col span={18}>
            <div>走马灯</div>
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  );
}

export default App;
