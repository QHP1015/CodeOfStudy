import React from "react";
import styles from "./ShoppingCart.module.css";
import { FiShoppingCart } from "react-icons/fi"

interface Props {

}
interface State {
    isOpen: Boolean;
}

class ShoppingCart extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    render(): React.ReactNode {
        return (
            <div className={styles.cartContainer}>
                <button className={styles.button}
                    onClick={this.handleClick}
                >
                    <FiShoppingCart />
                    <span>购物车2（件）</span>
                </button>
                <div className={styles.cartDropDown}
                    style={{
                        display: this.state.isOpen ? 'block' : 'none'
                    }}>
                    <ul>
                        <li>robot1</li>
                        <li>robot2</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ShoppingCart;