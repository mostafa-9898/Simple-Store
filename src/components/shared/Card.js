import React, { useContext } from 'react';

// svg icon
import trash from '../../assets/icons/trash.svg'

// Function
import { shorten } from '../../helpers/functions';

// Context
import { CardContext } from '../../context/CartContextProvider';

// Style
import styles from "./Cart.module.css";

const Card = (props) => {

    const { dispatch } = useContext(CardContext)
    const { image, title, price, quantity } = props.data

    return (
        <div className={styles.container}>
            <img className={styles.productImage} src={image} alt='product' />
            <div className={styles.data}>
                <h3>{shorten(title)}</h3>
                <p>{price} $</p>
            </div>
            <div><span className={styles.quantity}>{quantity}</span></div>
            <div className={styles.buttonContainer}>

                {
                    quantity > 1 ?
                        <button onClick={() => dispatch({ type: 'DECREASE', payload: props.data })} >-</button>
                        : <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: props.data })} ><img src={trash} alt='trash' style={{ width: '15px' }} /></button>
                }

                <button onClick={() => dispatch({ type: 'INCREASE', payload: props.data })} >+</button>
            </div>
        </div>
    );
};

export default Card;