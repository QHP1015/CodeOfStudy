import React, { useContext } from "react";
import styles from "./Robot.module.css"
import { appContext, appSetStateContext } from '../AppState'
import { useAddToCart } from './AddToCart';

export interface RobotProps {
    id: number,
    name: string,
    email: string,
}
const RobotDiscount: React.FC<RobotProps> = ({ id, name, email }) => {
    const value = useContext(appContext);
    const addToCart = useAddToCart();

    return (
        <div className={styles.cardContainer}>
            <img src={`https://robohash.org/${id}`} alt="robot" />
            <h2>打折商品</h2>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>作者：{value.username}</p>
            <button onClick={() => addToCart(id, name)}>加入购物车</button>
        </div>

        // <appContext.Consumer>
        //     {(value) => {
        //         return (
        //             <div className={styles.cardContainer}>
        //                 <img src={`https://robohash.org/${id}`} alt="robot" />
        //                 <h2>{name}</h2>
        //                 <p>{email}</p>
        //                 <p>作者：{value.username}</p>
        //             </div>
        //         )
        //     }}
        // </appContext.Consumer>
    )
}

export default RobotDiscount;