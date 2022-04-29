import React, { useContext } from "react";
import styles from "./Robot.module.css"
import { appContext } from '../index'
export interface RobotProps {
    id: number,
    name: string,
    email: string,
}
const Robot: React.FC<RobotProps> = ({ id, name, email }) => {
    const value = useContext(appContext);
    return (
        <div className={styles.cardContainer}>
            <img src={`https://robohash.org/${id}`} alt="robot" />
            <h2>{name}</h2>
            <p>{email}</p>
            <p>作者：{value.username}</p>
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

export default Robot;