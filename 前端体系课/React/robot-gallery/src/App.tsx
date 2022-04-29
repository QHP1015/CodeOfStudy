import React, { useState, useEffect } from 'react';
import logo from './assets/images/logo.svg';
import robots from './mockdata/robots.json';
import Robot, { RobotProps } from './components/Robot';
import styles from './App.module.css'
import ShoppingCart from './components/ShoppingCart';
import { count } from 'console';


interface Props {
}
const App: React.FC<Props> = (props) => {

  const [count, setCount] = useState<number>(0)
  const [robotGallery, setRobotGallery] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    document.title = `点击${count}次`
  }, [count])

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then(response => response.json())
    //   .then(data => setRobotGallery(data))

    const fetchData = async () => {
      setLoading(true);
      try {
        const responses = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await responses.json();
        setRobotGallery(data);
      } catch (e: any) {
        setError(e.message);
      }

      setLoading(false);
    }

    fetchData();
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} alt="logo" className={styles.appLogo} />
        <h1>罗伯特机器人</h1>
      </div>
      <button onClick={() => {
        setCount(count + 1)
      }}>Click</button>
      <span>count:{count}</span>
      <ShoppingCart />
      {!error || error !== '' && <div>网站出错：{error}</div>}
      {!loading ?
        <div className={styles.robotList}>
          {robotGallery.map((r: RobotProps) => <Robot id={r.id} name={r.name} email={r.email} />)}
        </div >
        : <h2>loading 加载中</h2>
      }
    </div>
  );


}

export default App;
